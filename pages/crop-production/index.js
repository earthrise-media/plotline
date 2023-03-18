mapboxgl.accessToken = "pk.eyJ1IjoiaGlnaGVzdHJvYWQiLCJhIjoiY2lzNjlpa3c3MGQ3cDJ6cDFzMXZpZTNmMCJ9.M1X4AOcuj4n3VT01ze0x5Q";
const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/highestroad/clfa9puan000s01p71u84l3ca", // style URL
  center: [-96.6, 37.75], // starting position [lng, lat]
  zoom: 4.2, // starting zoom
});

// const croplist = ["crop1", "crop2", "crop3", "crop4", "crop5", "crop6"]

// add the html <div class="form-check"><input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"><label class="form-check-label" for="flexRadioDefault1">Default radio</label></div> to the id "menu-body"

// when any of the radio buttons are clicked in the id "menu-body", console.log the id of the radio button that was clicked


fetch("./cdl-codes.json")
  .then((response) => response.json())
  .then((cdlCodes) => {

    let cropCode = "crop_1"
    let cropRed = 255
    let cropGreen = 212
    let cropBlue = 0
    let cropList = [];
    for (c in cdlCodes) {
      cropList.push(cdlCodes[c]["Class_Names"]);
    }
    console.log(cropList);
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
      document.getElementById("menu-body").appendChild(cropdiv);
    }
    document.getElementById("menu-body").addEventListener("click", function (e) {
        console.log(e.target.id);
        cdlCodes.forEach((item) => {
            if (item.Class_Names === e.target.id) {
              cropCode = item.crop_code;
              cropRed = item.ESRI_Red;
              cropGreen = item.ESRI_Green;
              cropBlue = item.ESRI_Blue;
              console.log(cropCode, cropRed, cropGreen, cropBlue)
              let cropLightColor = `rgba(${cropRed}, ${cropGreen}, ${cropBlue} , 0.15)`
              let cropDarkColor = `rgba(${cropRed}, ${cropGreen}, ${cropBlue} , 1)`
              map.setPaintProperty("countycropsv1 copy", "fill-color", [
                "interpolate",
                ["exponential", 1],
                ["get", cropCode],
                0,
                cropLightColor,
                500000,
                cropDarkColor
              ]);
            }
          });
          
      });
  })
  .catch((error) => console.error(error));
// make cropCode = the crop_code from the cdl-codes.json file
// make cropRed = the red value from the cdl-codes.json file
