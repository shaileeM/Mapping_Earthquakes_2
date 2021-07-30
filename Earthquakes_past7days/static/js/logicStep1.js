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

//Coordinates are center of US
let map = L.map("mapid", {
    center: [39.5, -98.5],  
    zoom: 3,
    layers: [streets]  //default layer
  });


// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);



// Accessing the Toronto Neighborhoods routes GeoJSON URL.
let pastSevanDaysEarthquakes ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create a style for the lines.
let myStyle = {
    color: "blue",
    weight: 3
}

// Grabbing our GeoJSON data.
d3.json(pastSevanDaysEarthquakes).then(function(data) {
    L.geoJson(data).addTo(map);
});


