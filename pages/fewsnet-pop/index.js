reportDates = [
  "CS-2009-07",
  "CS-2009-10",
  "CS-2010-01",
  "CS-2010-04",
  "CS-2010-07",
  "CS-2010-10",
  "CS-2011-01",
  "CS-2011-04",
  "CS-2011-07",
  "CS-2011-10",
  "CS-2012-01",
  "CS-2012-04",
  "CS-2012-07",
  "CS-2012-10",
  "CS-2013-01",
  "CS-2013-04",
  "CS-2013-07",
  "CS-2013-10",
  "CS-2014-01",
  "CS-2014-04",
  "CS-2014-07",
  "CS-2014-10",
  "CS-2015-01",
  "CS-2015-04",
  "CS-2015-07",
  "CS-2015-10",
  "CS-2016-02",
  "CS-2016-06",
  "CS-2016-10",
  "CS-2017-02",
  "CS-2017-06",
  "CS-2017-10",
  "CS-2018-02",
  "CS-2018-06",
  "CS-2018-10",
  "CS-2018-12",
  "CS-2019-02",
  "CS-2019-06",
  "CS-2019-10",
  "CS-2020-02",
  "CS-2020-06",
  "CS-2020-10",
  "CS-2021-02",
  "CS-2021-06",
  "CS-2021-10",
];
mapboxgl.accessToken = "pk.eyJ1IjoiaGlnaGVzdHJvYWQiLCJhIjoiY2w4YWRueTN5MDRhZjNvbWhmb2hlNXFsZyJ9.o7eX3yCdCqUt0VZxpofVoQ";
const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/highestroad/clbjz05by000a15posi075rb4", // style URL
  center: [29.553, 9.389], // starting position [lng, lat]
  zoom: 7, // starting zoom
  // hash: true,
});

var popStyle = ["interpolate", ["exponential", 1.99], ["zoom"], 4, ["interpolate", ["linear"], ["get", "population"], 1, 0.1, 20000, 1], 11, ["interpolate", ["linear"], ["get", "population"], 1, 12.5, 20000, 125]];

var standardStyle = ["interpolate", ["exponential", 1.99], ["zoom"], 4, 1, 11, 125];

// map.setFilter('fewsnet', ['==', 'report', reportvar])

map.on("load", () => {
  $('input[type="checkbox"]').change(function () {
    var checkboxName = $(this).attr("name");
    if (this.checked) {
      if (checkboxName == "population Layer") {
        map.setFilter(checkboxName, ["has", "population"]);
        map.setPaintProperty(checkboxName, "circle-radius", popStyle);
        console.log("population-layer");
      }
      if (checkboxName == "satellite-layer") {
        map.setLayoutProperty(checkboxName, "visibility", "visible");
        console.log("satellite-layer");
      }
      // checkbox was checked
      console.log("Checkbox with name '" + checkboxName + "' was checked");
    } else {
      if (checkboxName == "population Layer") {
        map.setFilter(checkboxName, null);
        map.setPaintProperty(checkboxName, "circle-radius", standardStyle);
        console.log("population-layer");
      }
      if (checkboxName == "satellite-layer") {
        map.setLayoutProperty(checkboxName, "visibility", "none");
        console.log("satellite-layer");
      }
      // checkbox was unchecked
      console.log("Checkbox with name '" + checkboxName + "' was unchecked");
    }
  });

  $(function () {
    $("#range-slider input[type='range']").on("input", function () {
      console.log(this.value);
      $("#range-value").html("Report Date: " + reportDates[this.value].slice(8, 10) + "/" + reportDates[this.value].slice(3, 7));
      // console.log the 3-5 characters of reportDates[this.value]
      console.log(reportDates[this.value]); // update paint settings of population layer
      $("#date-id").html(reportDates[this.value].slice(8, 10) + "/" + reportDates[this.value].slice(3, 7));
      map.setPaintProperty("population Layer", "circle-color", ["match", ["get", reportDates[this.value]], [1], "#a4cdad", [2], "hsl(52, 98%, 70%)", [3], "hsl(28, 98%, 56%)", [4], "hsl(0, 100%, 43%)", "hsla(0, 0%, 62%, 0)"]);
    });
  });
  // console.log length of reportDates
  console.log("last report " + reportDates[44]);
  // set max range of slider equal to length of reportDates
  $("#range-slider input[type='range']").attr("max", reportDates.length - 1);
  $("#range-slider input[type='range']").attr("value", reportDates.length - 1);
  $("#range-value").html("Report Date: " + reportDates[reportDates.length - 1].slice(8, 10) + "/" + reportDates[reportDates.length - 1].slice(3, 7));
  $("#date-id").html(reportDates[reportDates.length - 1].slice(8, 10) + "/" + reportDates[reportDates.length - 1].slice(3, 7));

  map.on("click", "population Layer", (e) => {
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML("Population: " + e.features[0].properties.population + "<br>IPC Rating: " + e.features[0].properties[reportDates[$("#range-slider input[type='range']").val()]])
      .addTo(map);

    var chartData = reportDates.map((date) => {
      var val = e.features[0].properties[date];
      if (val > 5 || val == undefined) {
        val = null;
      }
      return val;
    });
    chart.load({ columns: [["data"].concat(chartData)] });
  });

  // Change the cursor to a pointer when
  // the mouse is over the states layer.
  map.on("mouseenter", "population Layer", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change the cursor back to a pointer
  // when it leaves the states layer.
  map.on("mouseleave", "population Layer", () => {
    map.getCanvas().style.cursor = "";
  });
});

const chart = c3.generate({
  bindto: "#chart",
  data: {
    columns: [["data"].concat(reportDates)],
    names: { data: "IPC Phase" },
    type: "line",
  },
  axis: {
    x: {
      type: "category",
      categories: reportDates.map((x) => x.replace("CS-", "").replace("-", "/")),
      tick: { count: 5, rotate: 0, culling: false },
      height: 50,
      color: "red"
    },
    y: { max: 5, min: 0, tick: { count: 6, values: [0, 1, 2, 3, 4, 5] } },
  },
  size: {
    height: 160,
  },
  line: {
    connect_null: false,
  },
  point: {
    show: false,
  },
  legend: {
    show: false,
  },
  // change color of axis to red
});
