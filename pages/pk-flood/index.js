var dateslist = ['2017-Feb', '2018-Oct', '2019-Nov', '2021-Mar', '2021-Oct']
mapboxgl.accessToken = 'pk.eyJ1IjoiaGlnaGVzdHJvYWQiLCJhIjoiY2w4YWRueTN5MDRhZjNvbWhmb2hlNXFsZyJ9.o7eX3yCdCqUt0VZxpofVoQ';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/highestroad/clagdhi60000v14royyoi5w1m', // style URL
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
    // update transition time of mapbox layers
    map.setPaintProperty('flood-blue', 'fill-opacity-transition', {duration: 1500});

    map.setPaintProperty('flood-red', 'fill-opacity-transition', {duration: 1500});
    map.setPaintProperty('flood-blue', 'fill-color-transition', {duration: 1500});
    map.setPaintProperty('floodheat', 'heatmap-opacity-transition', {duration: 1500});

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    var i = 0;
    var waitTime = 1700;
    var interval = setInterval(function () {
        console.log(i);
        // if i is even
        if (i % 2 == 0) {
            console.log("even")
            // map.setPaintProperty("flood-blue", 'fill-opacity', 0.0)
            // map.setPaintProperty("flood-red", 'fill-opacity', 0.5)
            // change fill color of flood-blue
            // map.setPaintProperty('flood-blue', 'fill-color', '#66BEC7');
            map.setPaintProperty("flood-blue", 'fill-opacity', 0.8)
            map.setPaintProperty("floodheat", 'heatmap-opacity', 0.0)
                        
        } else{
            console.log("odd")
            // map.setPaintProperty('flood-blue', 'fill-color', '#66BEC7');
            map.setPaintProperty("flood-blue", 'fill-opacity', 0.0)
            map.setPaintProperty("floodheat", 'heatmap-opacity', 0.5)
        };
        i++;
        if (i === 20) {
            i = 0;
        }
    }, waitTime);
});