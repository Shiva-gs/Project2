function buildMap(sample,catType)
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

        // change video based on location
        var vide = document.getElementById("video");
        // if location changes change the video 
        if (catType == "Location") {

        if (city.location == 'New York') {
          vide.src="https://player.vimeo.com/video/310197402?autoplay=1&loop=1&portrait=0";
        }
         else if (city.location == 'Paris') {
            vide.src = "https://player.vimeo.com/video/309904894?autoplay=1&loop=1&title=0&byline=0&portrait=0";
          }
           else if (city.location == 'London') {
            vide.src="https://player.vimeo.com/video/327224386?autoplay=1&loop=1&badge=0";
           }
           else if (city.location == 'Singapore') {
            vide.src="https://player.vimeo.com/video/343919740?autoplay=1&loop=1&title=0&byline=0&portrait=0";
           }
           else if (city.location == 'Bangkok') {
            vide.src="https://player.vimeo.com/video/71887368?autoplay=1&loop=1&portrait=0";
           }
           else if (city.location == 'Dubai') {
            vide.src="https://player.vimeo.com/video/317975904?autoplay=1&loop=1&title=0&byline=0&portrait=0";
           }
          } // end of category check 

    } // end of for loop

}

function init() { 
  
  //clear existing container
  var container = L.DomUtil.get('map');
  if(container != null){
    container._leaflet_id = null;
  }

  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  var cat_selector = d3.select("#selCategory");
  var ds_selector = d3.select("#selDataSource");

  console.log("Setting DropDown Data");

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
 
    // datasource
    {
      ds_selector
        .append("option")
        .text("Google")
        .property("value", "Google");
    }
    {
      ds_selector
        .append("option")
        .text("OtherResources")
        .property("value", "OtherResources");
    }

    
}
// location change
function optionChanged(newSample) {

    //clear existing container
    var container = L.DomUtil.get('map');
    if(container != null){
      container._leaflet_id = null;
    }

var e = document.getElementById("selCategory");

var category = e.options[e.selectedIndex].text;
console.log(category);
console.log(location);



console.log("/citydata/"+newSample+","+ category);
  d3.json("/citydata/"+newSample+","+category).then((sampleNames) => {
    sampleNames.forEach((sample) => {
      //console.log(sample);
    });

    buildMap(sampleNames,"Location");
  });
}


// for target type change
function optionChanged1(newSample) {

    //clear existing container
    var container = L.DomUtil.get('map');
    if(container != null){
      container._leaflet_id = null;
    }

var e = document.getElementById("selDataset");

var location = e.options[e.selectedIndex].text; 
  d3.json("/citydata/"+location+","+newSample).then((sampleNames) => {

    sampleNames.forEach((sample) => { 
    });

    buildMap(sampleNames,"Target");
  });
  


}
 


function DataSource(value) { 
 
var e = document.getElementById("selDataSource");
var srcData = e.options[e.selectedIndex].text; 



console.log(srcData);
if(srcData == 'OtherResources')
{
  alert("Data OtherResources TripAdvisor, Yelp Etc ");
  console.log("in Other Resources");
 
  OtherSource(); 
}
else{
  var container = L.DomUtil.get('map');
  if(container != null){
    container._leaflet_id = null;
  }
  var e = document.getElementById("selCategory");

  var category = e.options[e.selectedIndex].text;
  console.log(category);
  console.log(location);
  
  var newSample = document.getElementById("selDataset").value;
  console.log(newSample);
  console.log("/citydata/"+newSample+","+ category);
    d3.json("/citydata/"+newSample+","+category).then((sampleNames) => {
      
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
      buildMap(sampleNames,"Location");});
      
  //init();
  console.log("in else logi");
}

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

function OtherSource()
{
  // clear map
  var container = L.DomUtil.get('map');
if(container != null){
  container._leaflet_id = null;
}

var othsrc = new othersources(); 
//othsrc.init();

}

// Initialize the dashboard
init();
