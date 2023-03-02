let floodDays = ["ff_230", "ff_234", "ff_239", "ff_242", "ff_246", "ff_249", "ff_251", "ff_253", "ff_254", "ff_258", "ff_261", "ff_263", "ff_265", "ff_266"];

// define function that is passed day
export function animateFlood(day) {
    for (let i = 0; i <= day; i++) {
        console.log(floodDays[i])
    }
    
    
    // map.setPaintProperty("flood3d", "fill-extrusion-height", ["+", ["get", day]]);
}
