// Mapbox access token and style
mapboxgl.accessToken = 'pk.eyJ1IjoicGxvdGxpbmUiLCJhIjoiY21lOTdkY2VyMGwyeDJ2b2NxeHRreTAwNCJ9.QYj-zZsxBP4mU4WRjRMQhQ';
const MAPBOX_STYLE = 'mapbox://styles/plotline/cme82pmqp001n01sn1bu7glnb';

// Global variables
let map;
let flowData = null;
let currentMetric = "Energy (kcal)";
let heatmapData = {
    maritime: [],
    rail: [],
    roads: []
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    loadFlowData();
    setupEventListeners();
});

// Initialize Mapbox map
function initializeMap() {
    map = new mapboxgl.Map({
        container: 'map',
        style: MAPBOX_STYLE,
        center: [-95.7129, 37.0902], // Center of US
        zoom: 4,
        pitch: 0,
        bearing: 0
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    map.addControl(new mapboxgl.ScaleControl({
        maxWidth: 100,
        unit: 'imperial'
    }), 'bottom-left');
}

// Load flow data from GeoJSON file
function loadFlowData() {
    fetch('./top_flows_tiny.geojson')
        .then(response => response.json())
        .then(geojsonData => {
            flowData = geojsonData;
            initializeHeatmaps();
        })
        .catch(error => {
            console.error('Error loading GeoJSON flow data:', error);
        });
}

// Initialize heatmap visualizations
function initializeHeatmaps() {
    if (flowData) {
        generateFlowHeatmapData();
        createHeatmapGrid('maritimeHeatmap', 'maritime');
        createHeatmapGrid('railHeatmap', 'rail');
        createHeatmapGrid('roadsHeatmap', 'roads');
    }
}

// Generate heatmap data from GeoJSON features
function generateFlowHeatmapData() {
    heatmapData = {
        maritime: [],
        rail: [],
        roads: []
    };

    if (!flowData || !flowData.features) {
        return;
    }

    // Group features by transport type
    const featuresByType = {
        maritime: [],
        rail: [],
        road: []
    };

    flowData.features.forEach(feature => {
        const type = feature.properties.type;
        if (featuresByType[type]) {
            featuresByType[type].push(feature);
        }
    });

    // Sort each type by energy (descending) and take top 1000
    ["maritime", "rail", "road"].forEach((infraType) => {
        const heatmapKey = infraType === "road" ? "roads" : infraType;
        
        if (featuresByType[infraType]) {
            const sortedFeatures = featuresByType[infraType]
                .sort((a, b) => (b.properties["Energy (kcal)"] || 0) - (a.properties["Energy (kcal)"] || 0))
                .slice(0, 1000);

            sortedFeatures.forEach((feature, index) => {
                const value = feature.properties[currentMetric] || 0;
                heatmapData[heatmapKey].push({
                    value: value,
                    feature: feature,
                    rank: index + 1
                });
            });
        }
    });
}

// Create heatmap grid for a specific infrastructure type
function createHeatmapGrid(containerId, infraType) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    const dataLength = heatmapData[infraType].length;
    
    for (let i = 0; i < dataLength; i++) {
        const square = document.createElement('div');
        square.className = 'heatmap-square';
        
        const dataItem = heatmapData[infraType][i];
        const value = typeof dataItem === 'object' ? dataItem.value : dataItem;
        
        // Calculate color intensity based on current metric value
        const intensity = getMetricIntensity(infraType, value);
        square.style.backgroundColor = getTransportColor(infraType, intensity);
        square.style.opacity = value > 0 ? Math.max(0.7, intensity) : 0.3;
        
        container.appendChild(square);
    }
}

// Calculate intensity based on current metric value within infrastructure type
function getMetricIntensity(infraType, value) {
    if (!heatmapData[infraType] || heatmapData[infraType].length === 0) return 0;
    
    const values = heatmapData[infraType]
        .map(item => typeof item === 'object' ? item.value : item)
        .filter(v => v > 0);
    
    if (values.length === 0) return 0;
    
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    
    if (maxValue === minValue) return 0.5;
    return (value - minValue) / (maxValue - minValue);
}

// Get transport-specific color based on infrastructure type and intensity
function getTransportColor(infraType, intensity) {
    intensity = Math.max(0, Math.min(1, intensity));
    const lightness = 20 + (80 * (1 - intensity));
    
    let hue, saturation;
    
    switch(infraType) {
        case 'maritime':
            hue = 210;
            saturation = 85;
            break;
        case 'rail':
            hue = 45;
            saturation = 90;
            break;
        case 'roads':
            hue = 270;
            saturation = 75;
            break;
        default:
            hue = 0;
            saturation = 0;
    }
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Update heatmap data values for new metric (without changing positions)
function updateHeatmapMetricValues() {
    ["maritime", "rail", "roads"].forEach((heatmapKey) => {
        if (heatmapData[heatmapKey]) {
            heatmapData[heatmapKey].forEach((dataItem) => {
                if (dataItem.feature && dataItem.feature.properties) {
                    dataItem.value = dataItem.feature.properties[currentMetric] || 0;
                }
            });
        }
    });
}

// Update heatmap colors only (maintain grid structure)
function updateHeatmapColors(containerId, infraType) {
    const container = document.getElementById(containerId);
    const squares = container.querySelectorAll('.heatmap-square');
    
    squares.forEach((square, index) => {
        if (heatmapData[infraType] && heatmapData[infraType][index]) {
            const dataItem = heatmapData[infraType][index];
            const value = typeof dataItem === 'object' ? dataItem.value : dataItem;
            
            const intensity = getMetricIntensity(infraType, value);
            square.style.backgroundColor = getTransportColor(infraType, intensity);
            square.style.opacity = value > 0 ? Math.max(0.7, intensity) : 0.3;
        }
    });
}

// Setup event listeners for metric selector
function setupEventListeners() {
    const metricSelect = document.getElementById('metricSelect');
    if (metricSelect) {
        metricSelect.addEventListener('change', function(e) {
            currentMetric = e.target.value;
            
            if (flowData) {
                updateHeatmapMetricValues();
                updateHeatmapColors('maritimeHeatmap', 'maritime');
                updateHeatmapColors('railHeatmap', 'rail');
                updateHeatmapColors('roadsHeatmap', 'roads');
            }
        });
    }
}