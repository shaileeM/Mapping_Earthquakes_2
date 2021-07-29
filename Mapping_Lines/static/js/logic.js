// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with coordinates of SFO
let map = L.map('mapid').setView([37.6213, -122.3790], 5);   //mapid is the place on html where this map will be placed

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});




//Create line from LAX to SFO and Salt lake city and Seattle Tacoma International Airport
// Coordinates for each point to be used in the line.
let line = [
    [33.9416, -118.4085],
    [37.6213, -122.3790],
    [40.7899, -111.9791],
    [47.4502, -122.3088]
  ];

L.polyline(line,{color:"yellow",opacity:"0.5",type:"dash"})
.addTo(map);



// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);