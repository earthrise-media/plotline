var dateslist = ['2017-Feb', '2018-Oct', '2019-Nov', '2021-Mar', '2021-Oct']
mapboxgl.accessToken = 'pk.eyJ1IjoiaGlnaGVzdHJvYWQiLCJhIjoiY2w4YWRueTN5MDRhZjNvbWhmb2hlNXFsZyJ9.o7eX3yCdCqUt0VZxpofVoQ';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/highestroad/claau24wa000315ugcue04hob', // style URL
    center: [68.5, 29.98],
  // starting position [lng, lat]
    zoom: 5, // starting zoom4.95/30.22/68.95
    projection: 'mercator',
    hash: true,
    // max zoom
    minZoom: 4.5,
});

// map.setFilter('fewsnet', ['==', 'report', reportvar])

map.on('load', () => {
    var num = 0;
    var reportvar = dateslist[num] + "-CS"
    map.addSource('pk-data', {
        type: 'geojson',
        data: '../../ipc-experiments/synced-data/pk_grid_1.geojson'
    });
    // create a mapbox layer for each entry in the dateslist
    for (var i = 0; i < dateslist.length; i++) {
        var reportvar = "overall_phase-"+dateslist[i]
        map.addLayer({
            id: reportvar,
            // References the GeoJSON source defined above
            // and does not require a `source-layer`
            source: 'pk-data',
            type: 'fill',
            layout: {},
            // filter: [],

            paint: {
                "fill-color-transition": {
                    "duration": 300,
                    "delay": 0
                },
                "fill-color": [
                    "match",
                    ["get", reportvar],
                    [1.0],
                    "#c6f9c6",
                    [2.0],
                    "#f9e21c",
                    [3.0],
                    "#e26d00",
                    [4.0],
                    "#c10000",
                    [5.0],
                    "#551010",
                    "hsla(0, 0%, 100%, 0)"
                ],
                "fill-opacity": 0.0,
                "fill-opacity-transition": {
                    "duration": 1000,
                    "delay": 0
                },
                "fill-outline-color": "hsla(0, 0%, 0%, 0)"
            }
        }, "mapbox-mapbox-terrain-dem-v1");
        // map.addLayer({
        //     'id': 'test',
        //     'type': 'fill',
        //     'source': 'pk-data', // reference the data source
        //     'layout': {},
        //     'paint': {
        //     'fill-color': '#0080ff', // blue color fill
        //     'fill-opacity': 0.5
        //     }
        //     });
        console.log(reportvar)
    };
    // map.setPaintProperty("2016-10-CS", 'fill-opacity', 0.8)
    // console.log(dateslist.length)


        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }
        var i = 0;
        var waitTime = 1300;
        var interval = setInterval(function () {
            var datename = document.getElementById('datename');
            datename.innerHTML = dateslist[i];
            var oldreport = "overall_phase-"+dateslist[i-1]
            var newreport = "overall_phase-"+dateslist[i]
            console.log(newreport)
            if (i != 0) {
                map.setPaintProperty(oldreport, 'fill-opacity', 0.0)
            };
            map.setPaintProperty(newreport, 'fill-opacity', 0.8)
            if (i == 4) {
                delay(waitTime).then(() => map.setPaintProperty(newreport, 'fill-opacity', 0.0));
            };
            i++;
            if (i === dateslist.length) {
                i = 0;
            }
        }, waitTime);




});