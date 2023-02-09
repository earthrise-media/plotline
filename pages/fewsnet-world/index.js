dateslist = [
  "2009-07",
  "2009-10",
  "2010-01",
  "2010-04",
  "2010-07",
  "2010-10",
  "2011-01",
  "2011-04",
  "2011-07",
  "2011-10",
  "2012-01",
  "2012-04",
  "2012-07",
  "2012-10",
  "2013-01",
  "2013-04",
  "2013-07",
  "2013-10",
  "2014-01",
  "2014-04",
  "2014-07",
  "2014-10",
  "2015-01",
  "2015-04",
  "2015-07",
  "2015-10",
  "2016-02",
  "2016-06",
  "2016-10",
  "2017-02",
  "2017-06",
  "2017-10",
  "2018-02",
  "2018-06",
  "2018-10",
  "2018-12",
  "2019-02",
  "2019-06",
  "2019-10",
  "2020-02",
  "2020-06",
  "2020-10",
  "2021-02",
  "2021-06",
  "2021-10",
];

mapboxgl.accessToken = "pk.eyJ1IjoiaGlnaGVzdHJvYWQiLCJhIjoiY2w4YWRueTN5MDRhZjNvbWhmb2hlNXFsZyJ9.o7eX3yCdCqUt0VZxpofVoQ";
const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/highestroad/cla06v2ro000215q9hz8o9mns", // style URL
  center: [24.35271144900878, -0.2881516070711143], // starting position [lng, lat]
  zoom: 3, // starting zoom
  projection: "mercator",
  hash: true,
});

// map.setFilter('fewsnet', ['==', 'report', reportvar])

map.on("load", () => {
  var num = 0;
  var reportvar = dateslist[num] + "-CS";
  // map.addSource('world-fewsnet', {
  //     type: 'geojson',
  //     data: 'https://earthgenome-foodsecurity.s3.us-west-1.amazonaws.com/ea_grid_1_ffill.geojson'
  // });
  var a = 0;
  var b = 1;
  let report1 = "CS-" + dateslist[a];
  let report2 = "CS-" + dateslist[b];

  map.addLayer(
    {
      id: "report-1",
      type: "fill",
      source: {
        type: "vector",
        url: "mapbox://highestroad.cu7masoe",
        tolerance: 0.0,
      },
      "source-layer": "all_fewsnet_grid_ffill",
      layout: {},
      paint: {
        "fill-color": [
          "case",
          ["match", ["get", "CS-" + dateslist[0]], [1], true, false],
          "#C6F9C6",
          ["match", ["get", "CS-" + dateslist[0]], [2], true, false],
          "#F9E21C",
          ["match", ["get", "CS-" + dateslist[0]], [3], true, false],
          "#E26D00",
          ["match", ["get", "CS-" + dateslist[0]], [4], true, false],
          "#C10000",
          ["match", ["get", "CS-" + dateslist[0]], [5], true, false],
          "#551010",
          "hsla(0, 0%, 62%, 0)",
        ],
        "fill-opacity": 0.8,
        "fill-outline-color": "hsla(0, 0%, 0%, 0)",
      },
      transition: {
        duration: 1000,
        delay: 0,
      },
    },
    "mapbox-mapbox-terrain-dem-v1"
  );
  map.addLayer(
    {
      id: "report-2",
      type: "fill",
      source: {
        type: "vector",
        url: "mapbox://highestroad.cu7masoe",
        tolerance: 0.0,
      },
      "source-layer": "all_fewsnet_grid_ffill",
      layout: {},
      paint: {
        "fill-color": [
          "case",
          ["match", ["get", "CS-" + dateslist[1]], [1], true, false],
          "#C6F9C6",
          ["match", ["get", "CS-" + dateslist[1]], [2], true, false],
          "#F9E21C",
          ["match", ["get", dateslist[1]], [3], true, false],
          "#E26D00",
          ["match", ["get", dateslist[1]], [4], true, false],
          "#C10000",
          ["match", ["get", dateslist[1]], [5], true, false],
          "#551010",
          "hsla(0, 0%, 62%, 0)",
        ],
        "fill-opacity": 0,
        "fill-outline-color": "hsla(0, 0%, 0%, 0)",
      },
      transition: {
        duration: 1000,
        delay: 0,
      },
    },
    "mapbox-mapbox-terrain-dem-v1"
  );

  // create a mapbox layer for each entry in the dateslist
  // for (var i = 0; i < dateslist.length; i++) {
  //     var reportvar = dateslist[i] + "-CS"
  //     map.addLayer({
  //         id: reportvar,
  //         // References the GeoJSON source defined above
  //         // and does not require a `source-layer`
  //         source: 'ea-data',
  //         type: 'fill',
  //         layout: {},
  //         // filter: [],

  //         paint: {
  //             "fill-color-transition": {
  //                 "duration": 300,
  //                 "delay": 0
  //             },
  //             "fill-color": [
  //                 "match",
  //                 ["get", reportvar],
  //                 [1],
  //                 "#c6f9c6",
  //                 [2],
  //                 "#f9e21c",
  //                 [3],
  //                 "#e26d00",
  //                 [4],
  //                 "#c10000",
  //                 [5],
  //                 "#551010",
  //                 "hsla(0, 0%, 100%, 0)"
  //             ],
  //             "fill-opacity": 0.0,
  //             "fill-opacity-transition": {
  //                 "duration": 1000,
  //                 "delay": 0
  //             },
  //             "fill-outline-color": "hsla(0, 0%, 0%, 0)"
  //         }
  //     }, "mapbox-mapbox-terrain-dem-v1");
  //     console.log(reportvar)
  // };
  // map.setPaintProperty("2016-10-CS", 'fill-opacity', 0.8)
  // console.log(dateslist.length)

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  var i = 0;
  var waitTime = 1000;
  var interval = setInterval(function () {
    var datename = document.getElementById("datename");
    datename.innerHTML = dateslist[i];
    // var oldreport = dateslist[i - 1] + "-CS"
    // var newreport = dateslist[i] + "-CS"
    console.log("CS-" + dateslist[a]);
    console.log("CS-" + dateslist[b]);
    if (i % 2 == 0) {
      map.setPaintProperty("report-2", "fill-opacity", 0.8);
      map.setPaintProperty("report-1", "fill-opacity", 0);
      map.setPaintProperty("report-1", "fill-color", [
        "case",
        ["match", ["get", "CS-" + dateslist[a]], [1], true, false],
        "#C6F9C6",
        ["match", ["get", "CS-" + dateslist[a]], [2], true, false],
        "#F9E21C",
        ["match", ["get", "CS-" + dateslist[a]], [3], true, false],
        "#E26D00",
        ["match", ["get", "CS-" + dateslist[a]], [4], true, false],
        "#C10000",
        ["match", ["get", "CS-" + dateslist[a]], [5], true, false],
        "#551010",
        "hsla(0, 0%, 62%, 0)",
      ]);
      a = a + 2;
      datename.innerHTML = dateslist[i];
    } else {
      map.setPaintProperty("report-1", "fill-opacity", 0.8);
      map.setPaintProperty("report-2", "fill-opacity", 0);
      map.setPaintProperty("report-2", "fill-color", [
        "case",
        ["match", ["get", "CS-" + dateslist[b]], [1], true, false],
        "#C6F9C6",
        ["match", ["get", "CS-" + dateslist[b]], [2], true, false],
        "#F9E21C",
        ["match", ["get", "CS-" + dateslist[b]], [3], true, false],
        "#E26D00",
        ["match", ["get", "CS-" + dateslist[b]], [4], true, false],
        "#C10000",
        ["match", ["get", "CS-" + dateslist[b]], [5], true, false],
        "#551010",
        "hsla(0, 0%, 62%, 0)",
      ]);
      b = b + 2;
      datename.innerHTML = dateslist[i];
    }
    console.log("next layer");
    i++;
    if (i === dateslist.length) {
      i = 0;
      a = 0;
      b = 1;
    }
  }, waitTime);
});
