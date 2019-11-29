function buildMap(sample)
{
  // clean the previous markings
  //map.off();
  //map.remove();
  var container = L.DomUtil.get('map');
      if(container != null){
        container._leaflet_id = null;
      }

  var map = L.map("map", {
    center: [sample[0].geometry.location.lat, sample[0].geometry.location.lng],
    zoom: 13
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets"
}).addTo(map);

// .bindPopup("<h1>" + "New York" + "</h1> <hr> <h3>Restaurant " + "The Lowell Hotel" + "</h3>")
//L.marker([40.7657325, -73.9692262])
 // .bindPopup("<h1>" + "New York" + "</h1> <hr> <h3>Restaurant " + "The Lowell Hotel" + "</h3>")
  //.addTo(map);
  
  console.log("Printed the map")
  console.log(Object.keys(sample).length);
  //console.log(sample.geometry) 
  //sampleNames.forEach((sample) => {
    //console.log(sample);
    console.log(sample) 

  
    for (var i = 0; i < sample.length; i++) {
      var city = sample[i];
      console.log(city.geometry.location) 
      console.log("Printed Geometry")
      L.marker([city.geometry.location.lat, city.geometry.location.lng])
        .bindPopup("<h1> " + city.location + " </h1> <hr> <h3> "+ " " + city.target_type + ": " + " <br>"+ city.name + " <br> " + " Rating: "+ city.rating + " </h3>")
        .addTo(map);
    }

}

function init() {
  console.log("in init");
  
   
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  var cat_selector = d3.select("#selCategory");
  var ds_selector = d3.select("#selDataSource");

  // Use the list of sample location to populate the select options
  d3.json("/locations").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });


  });

    // ..  Use the list of sample category to populate the select options
    d3.json("/category").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        console.log("sample"+sample);
        cat_selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
    });


    
}
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  //buildCharts(newSample);
  //buildMetadata(newSample);
  //console.log(newSample);



var e = document.getElementById("selCategory");

var category = e.options[e.selectedIndex].text;
console.log(category);

console.log("/citydata/"+newSample+","+ category);
  d3.json("/citydata/"+newSample+","+category).then((sampleNames) => {
    sampleNames.forEach((sample) => {
      //console.log(sample);
    });

    buildMap(sampleNames);
  });
}

function optionChanged1(newSample) {
  // Fetch new data each time a new sample is selected
  //buildCharts(newSample);
  //buildMetadata(newSample);
  //console.log(newSample);



var e = document.getElementById("selDataset");

var location = e.options[e.selectedIndex].text;
console.log(location);

//console.log("/citydata/"+location+","+ newSample);
  d3.json("/citydata/"+location+","+newSample).then((sampleNames) => {

    sampleNames.forEach((sample) => {
      //console.log(sample);
      //console.log(sample.geometry.location.lat)
      //console.log(sample.geometry.location.lng) 
    });
    // Use the first sample from the list to build the initial plots
    //const firstSample = sampleNames[0];
    //buildCharts(firstSample);
    //buildMetadata(firstSample);
    //console.log("Calling Map refresh ");
    buildMap(sampleNames);
  });
  


}
 
// Creating map object
var map = L.map("map", {
  center: [0, 0],
  zoom: 1
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets"
}).addTo(map);



// Initialize the dashboard
init();
