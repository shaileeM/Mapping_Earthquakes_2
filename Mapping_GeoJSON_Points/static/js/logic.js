// Add console.log to check to see if our code is working.
console.log("working");


//let map = L.map('mapid').setView([30, 30], 2);  //mapid is the place on html where this map will be placed



// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
  };


// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

//accessing the data from cities.js file
//Add single point on our map using GeoJson data
// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// Grabbing our GeoJSON data.
//Using pointToLayer callback function
/*
L.geoJson(sanFranAirport, {
    // We turn each feature into a marker on the map.
    pointToLayer: function(feature, latlng) {
      console.log(feature);
      console.log(latlng);
      return L.marker(latlng)
      .bindPopup("<h2>" + feature.properties.city + "</h2>")
    }

  }).addTo(map);

*/

//Using onEachFeature callback function
/*
L.geoJson(sanFranAirport, {
    onEachFeature:function(feature,layer){
        console.log(feature);
        console.log(layer);
        layer.bindPopup("<h2>" + feature.properties.faa + "</h2>");
    }
}).addTo(map);
*/



// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/shaileeM/Mapping_Earthquakes/Mapping_Single_Points/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data,{
      pointToLayer:function(feature,latlng){
          //console.log(feature.properties.faa);
          return L.marker(latlng)
          .bindPopup("<h2>"+ feature.properties.faa + "</h2>" + "<h2>" + feature.properties.name + "</h2>");
      }
  })
  .addTo(map);
});




// Then we add our 'graymap' tile layer to the map.
//streets.addTo(map);