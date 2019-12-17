// Creating map object
var myMap = L.map("map", {
  center: [65, -151.30],
  zoom: 3
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={access_token}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

function color(mag){
  if (mag > 6){
    return "red";
  }
  if (mag > 5){
    return "chocolate";
  }
  if (mag > 4){
    return "coral";
  }
  if (mag > 3){
    return "darksalmon";
  }
  else{
    return "yellow";
  }
}

d3.json(url,function(response){
  for (var i = 0; i < response.features.length; i++){
    L.circle([response.features[i].geometry.coordinates[1],response.features[i].geometry.coordinates[0]], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color(response.features[i].properties.mag),
      // Adjust radius
      radius: (response.features[i].properties.mag * 30000)
    }).bindPopup("<h2>" + response.features[i].properties.title + "</h2> <hr> <h3> Magnitude " + response.features[i].properties.mag + "</h3>").addTo(myMap);
  }
});

