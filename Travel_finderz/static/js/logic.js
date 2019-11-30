// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add a tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// An array containing each city's name, location, and population
// var cities = [{
//   location: [40.7128, -74.0059],
//   name: "New York",
//   video: "http://127.0.0.1:5000/newyork"
// },
// {
//   location: [13.756331, 100.501762],
//   name: "Bangkok",
// },
// {
//   location: [51.507351, -0.127758],
//   name: "London",
// },
// {
//   location: [25.204849, 55.270782],
//   name: "Dubai",
// },
// {
//   location: [1.3521, 103.8198],
//   name: "Singapore ",
// },
// {
//   location: [48.8566, 2.3522],
//   name: "Paris ",
// }
// ];

// // Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
// for (var i = 0; i < cities.length; i++) {
//   var city = cities[i];
//   L.marker(city.location)
//     .bindPopup("<h1>" + city.name + "</h1> <hr>")
//     .addTo(myMap);
// }


// function add_marker() {
  var points = 
      ["New York", 40.7128, -74.0059, "http://127.0.0.1:5000/newyork"]
 
  // ];
  
  var marker = [];
  var i;
  for (i = 0; i < points.length; i++) {
      marker[i] = new L.Marker([points[i][1], points[i][2]], {
          win_url: points[i][3]
      });
      marker[i].addTo(myMap);
      marker[i].on('click', onClick);
  };
}

function onClick(e) {
  //console.log(this.options.win_url);
  window.open(this.options.win_url);
}