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
      console.log(sample);
    });
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

console.log("/citydata/"+location+","+ newSample);
  d3.json("/citydata/"+location+","+newSample).then((sampleNames) => {
    sampleNames.forEach((sample) => {
      console.log(sample);
    });

    // Use the first sample from the list to build the initial plots
    //const firstSample = sampleNames[0];
    //buildCharts(firstSample);
    //buildMetadata(firstSample);
  });
  
}


// Initialize the dashboard
init();
