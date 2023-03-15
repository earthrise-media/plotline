var dateslist = ["2017-Feb", "2018-Oct", "2019-Nov", "2021-Mar", "2021-Oct"];
mapboxgl.accessToken = "pk.eyJ1IjoiaGlnaGVzdHJvYWQiLCJhIjoiY2w4YWRueTN5MDRhZjNvbWhmb2hlNXFsZyJ9.o7eX3yCdCqUt0VZxpofVoQ";
const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/highestroad/clagdhi60000v14royyoi5w1m", // style URL
  center: [68.682, 26.332],
  // starting position [lng, lat]
  zoom: 7, // starting zoom4.95/30.22/68.95
  pitch: 64,
  bearing: -43.8,// pitch in degrees
  projection: "mercator",
//   hash: true,
  // max zoom
  minZoom: 4.5,
});

function rotateCamera(timestamp) {
//   clamp the rotation between 0 -360 degrees
//   Divide timestamp by 100 to slow rotation to ~10 degrees / sec
  map.rotateTo((timestamp / 100) % 360, { duration: 0 });
  // Request the next frame of the animation.
  requestAnimationFrame(rotateCamera);
}

let floodCol = ["ff_230", "ff_234", "ff_239", "ff_242", "ff_246", "ff_249", "ff_251", "ff_253", "ff_254", "ff_258", "ff_261", "ff_263", "ff_265", "ff_266"];
let layerNum = 0;

map.on("load", () => {
  rotateCamera(0);
  map.addSource("flood", {
    type: "vector",
    url: "mapbox://highestroad.blex374p",
  });
  let firstFill = ["get", floodCol[0]];
  let fillString = ["+", ["get", floodCol[layerNum]]];
  let fillExpression = [fillString];

  map.addLayer({
    id: "flood3d",
    type: "fill-extrusion",
    source: "flood",
    "source-layer": "firstflood-grid-cleaned-c04q87",
    paint: {
      "fill-extrusion-color": ["interpolate", ["linear"], ["get", "flood_sum"], 10323, "#d8e4ee", 64140, "#11304b"],
      "fill-extrusion-height": ["interpolate", ["linear"], firstFill, 1, 10, 78346, 78346],
    },
  });

  setInterval(function () {
    layerNum++;
    fillString.push(["get", floodCol[layerNum]]);
    fillExpression = fillString;
    map.setPaintProperty("flood3d", "fill-extrusion-height", fillExpression);
    console.log(fillExpression);
    if (layerNum == 14) {
      layerNum = 0;
      fillString = ["+"];
    }
  }, 500);
});
[
  "+",
  [
      "get",
      "ff_230"
  ],
  [
      "get",
      "ff_234"
  ],
  [
      "get",
      "ff_239"
  ],
  [
      "get",
      "ff_242"
  ]
]