// Add console.log to check to see if our code is working.
console.log("working");


//let map = L.map('mapid').setView([30, 30], 2);  //mapid is the place on html where this map will be placed


// We create the tile layer that will be the background of our map.(street style)
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map. (satellile street style)
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Street": streets,
    "Satellite Streets": satelliteStreets
  };

//Toronto coordinates
let map = L.map("mapid", {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satelliteStreets]
  });


// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);



// Accessing the Toronto Neighborhoods routes GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/shaileeM/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";

// Create a style for the lines.
let myStyle = {
    color: "blue",
    weight: 3
}

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data,{
      style : myStyle,
      onEachFeature:function(feature,layer){
          //return L.marker(latlng)
          layer.bindPopup("<h2>" + feature.properties.AREA_NAME + "</h2>" + "<h2>" + feature.properties.AREA_S_CD + "</h2>")
      }
  })
  .addTo(map);
});


