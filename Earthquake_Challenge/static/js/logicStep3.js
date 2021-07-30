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


//to add style
function styleInfo(feature)
{
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag), //to fill different colors for different magnitudes
        color: "#000000",
        radius: getRadius(feature.properties.mag), //gets the earthquake's magnitude
        stroke: true,
        weight: 0.5
      };
}


// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }


function getColor(magnitude)
{
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
}

// Grabbing our GeoJSON data.
d3.json(pastSevanDaysEarthquakes).then(function(data) {
    console.log(data);

   // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {

    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
               // console.log(data);
                return L.circleMarker(latlng)
                .bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
            },
          // We set the style for each circleMarker using our styleInfo function.
        style: styleInfo
        }).addTo(map);
    });


