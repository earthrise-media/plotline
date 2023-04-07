mapboxgl.accessToken = "pk.eyJ1IjoiaGlnaGVzdHJvYWQiLCJhIjoiY2lzNjlpa3c3MGQ3cDJ6cDFzMXZpZTNmMCJ9.M1X4AOcuj4n3VT01ze0x5Q";
const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/highestroad/clfa9puan000s01p71u84l3ca", // style URL
  center: [-96.6, 37.75], // starting position [lng, lat]
  zoom: 4.2, // starting zoom
});



// const croplist = ["crop1", "crop2", "crop3", "crop4", "crop5", "crop6"]
// Interaction idea: So  the dot map shows where each crop is. 
// when you click on a dot it zooms in and adds one tile of z15 satellite data to the map and hides that dot
// a popup outside says how many calories of that crop are grown in that area and gives something 
// like a histogram of where that spot ranks in the popup

function counties() {
  fetch("./cdl-codes.json")
    .then((response) => response.json())
    .then((cdlCodes) => {
      let cropCode = "crop_1";
      let cropRed = 255;
      let cropGreen = 212;
      let cropBlue = 0;
      let cropList = [];
      for (c in cdlCodes) {
        cropList.push(cdlCodes[c]["Class_Names"]);
      }
      console.log(cropList)
      // remove all children of div with id "crop-buttons"
      const myNode = document.getElementById("crop-buttons");
      myNode.innerHTML = '';

      for (let i = 0; i < cropList.length; i++) {
        let crop = cropList[i];
        let cropname = crop.charAt(0).toUpperCase() + crop.slice(1);
        let cropid = crop;
        let cropdiv = document.createElement("div");
        cropdiv.className = "form-check";
        let cropradio = document.createElement("input");
        cropradio.className = "form-check-input";
        cropradio.type = "radio";
        cropradio.name = "flexRadioDefault";
        cropradio.id = cropid;
        let croplabel = document.createElement("label");
        croplabel.className = "form-check-label";
        croplabel.htmlFor = cropid;
        croplabel.innerHTML = cropname;
        cropdiv.appendChild(cropradio);
        cropdiv.appendChild(croplabel);
        document.getElementById("crop-buttons").appendChild(cropdiv);
      }
      document.getElementById("Corn").checked = true;
      map.setLayoutProperty("centroid-z15crops", "visibility", "none");
      map.setLayoutProperty("county-crops", "visibility", "visible");
      document.getElementById("menu-body").addEventListener("click", function (e) {
        console.log(e.target.id);
        cdlCodes.forEach((item) => {
          if (item.Class_Names === e.target.id) {
            cropCode = item.crop_code;
            cropRed = item.ESRI_Red;
            cropGreen = item.ESRI_Green;
            cropBlue = item.ESRI_Blue;
            console.log(cropCode, cropRed, cropGreen, cropBlue);
            let cropLightColor = `rgba(${cropRed}, ${cropGreen}, ${cropBlue} , 0.15)`;
            let cropDarkColor = `rgba(${cropRed}, ${cropGreen}, ${cropBlue} , 1)`;
            map.setPaintProperty("county-crops", "fill-color", ["interpolate", ["linear"], ["get", cropCode], 0, cropLightColor, 0.8, cropDarkColor]);
          }
        });
      });
    })
    .catch((error) => console.error(error));
}

function grid() {
  fetch("./cdl-codes-grid.json")
  .then((response) => response.json())
  .then((cdlCodes) => {
    let cropCode = "crop_1";
    let cropRed = 255;
    let cropGreen = 212;
    let cropBlue = 0;
    let cropList = [];
    for (c in cdlCodes) {
      cropList.push(cdlCodes[c]["Class_Names"]);
    }
    console.log(cropList)
    // remove all children of div with id "crop-buttons"
    const myNode = document.getElementById("crop-buttons");
    myNode.innerHTML = '';

    for (let i = 0; i < cropList.length; i++) {
      let crop = cropList[i];
      let cropname = crop.charAt(0).toUpperCase() + crop.slice(1);
      let cropid = crop;
      let cropdiv = document.createElement("div");
      cropdiv.className = "form-check";
      let cropradio = document.createElement("input");
      cropradio.className = "form-check-input";
      cropradio.type = "radio";
      cropradio.name = "flexRadioDefault";
      cropradio.id = cropid;
      let croplabel = document.createElement("label");
      croplabel.className = "form-check-label";
      croplabel.htmlFor = cropid;
      croplabel.innerHTML = cropname;
      cropdiv.appendChild(cropradio);
      cropdiv.appendChild(croplabel);
      document.getElementById("crop-buttons").appendChild(cropdiv);
    }
    document.getElementById("Corn").checked = true;
    map.setLayoutProperty("centroid-z15crops", "visibility", "visible");
    map.setLayoutProperty("county-crops", "visibility", "none");
    document.getElementById("menu-body").addEventListener("click", function (e) {
      console.log(e.target.id);
      cdlCodes.forEach((item) => {
        if (item.Class_Names === e.target.id) {
          cropCode = item.crop_code;
          cropRed = item.ESRI_Red;
          cropGreen = item.ESRI_Green;
          cropBlue = item.ESRI_Blue;
          console.log(cropCode, cropRed, cropGreen, cropBlue);
          let cropColor = `rgba(${cropRed}, ${cropGreen}, ${cropBlue} , 1)`;
          // make centroid-z15crops visible
          map.setFilter("centroid-z15crops", [">", ["get", cropCode], 10]);
          map.setPaintProperty("centroid-z15crops", "circle-color", cropColor);
        }
      });
    });
  })
  .catch((error) => console.error(error));
}

counties();

// when checkbox with id county-level is checked console.log("hello")
document.getElementById("resolution-check").addEventListener("click", function (e) {
  // if id is county-level console.log("hello")
  // if id "county level" value checked console.log("hello")
  if (e.target.id === "county-level") {
    console.log("counties");
    counties();
  }
  if (e.target.id === "field-level") {
    console.log("field");
    grid();
  }

})