var map = L.map('map', {
  center: [42, -72],
  minZoom: 2,
  zoom: 2
})
L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c']
}).addTo( map )
var layers = {
  Attractions: new L.LayerGroup(),
  Restaurants: new L.LayerGroup(),
  Bars: new L.LayerGroup(),
}; 
var overlays = {
  "attractions": layers.Attractions, 
  "restaurants": layers.Restaurants,
  "bars": layers.Bars
};
L.control.layers(null,overlays).addTo(map);
var info = L.control({
  position: "bottomright"
});
// info.onAdd = function() {
//   var div = L.DomUtil.create('div','legend'),;
//   return div; 
// }; 
// info.addTo(map); 
var myURL = jQuery( 'script[src$="leaf-demo.js"]' ).attr( 'src' ).replace( 'leaf-demo.js', '' )
var myIcon1 = L.icon({
  iconUrl: myURL + 'images/pin29.png',
  iconRetinaUrl: myURL + 'images/pin30.png',
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
})
var myIcon2 = L.icon({
  iconUrl: myURL + 'images/pin22.png',
  iconRetinaUrl: myURL + 'images/pin26.png',
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
})
var myIcon3 = L.icon({
  iconUrl: myURL + 'images/pin17.png',
  iconRetinaUrl: myURL + 'images/pin19.png',
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
})
for ( var i=0; i < bar_markers.length; ++i )
{
 var bar_mark = L.marker( [bar_markers[i].lat, bar_markers[i].long], {icon: myIcon1} )
  .bindPopup( '<a href=www.yelp.com"' + bar_markers[i].url + '" target="_blank">' + bar_markers[i].name + '</a>' )
  .addTo( map );
 
}
for ( var i=0; i < rest_markers.length; ++i )
{
 L.marker( [rest_markers[i].lat, rest_markers[i].long], {icon: myIcon2} )
  .bindPopup( '<a href="' + rest_markers[i].url + '" target="_blank">' + rest_markers[i].name + '</a>' )
  .addTo( map );
}
for ( var i=0; i < attraction_markers.length; ++i )
{
 L.marker( [attraction_markers[i].lat, attraction_markers[i].long], {icon: myIcon3} )
  .bindPopup( '<a href="' + attraction_markers[i].url + '" target="_blank">' + attraction_markers[i].attraction + '</a>' )
  .addTo( map );
}