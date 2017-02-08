//var range = require('./final-color-range.json')
window.onload = function() {
  function updateDescription(){
     $("#attribute-title").text(display[ attribute_name].title);
     $("#attribute-description").text(display[ attribute_name].description);
  }
  function adddropDown(){
    for(var property in display){
      $("ul#first-dropdown").append('<li><a id='+ property+' href="#">'+ display[property].title +' </a></li>');
    }
  };
  adddropDown();

  var attribute_name = "#schools-100-people";

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
}
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 4,
        color: '#666',
        dashArray: ''
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}
function resetHighlight(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '3'});
    info.update();

}
  function getColor(value) {
  return typeof value == "string" ? 'white':
         value <= range[attribute_name][0] ? '#fff5b1' :
         value <= range[attribute_name][1] ? '#fee6ce' :
         value <= range[attribute_name][2] ? '#fdd0a2' :
         value <= range[attribute_name][3] ? '#fdae6b' :
         value <= range[attribute_name][4] ? '#fd8d3c' :
         value <= range[attribute_name][5] ? '#f16913' :
         value <= range[attribute_name][6] ? '#d94801' :
         value <= range[attribute_name][7] ? '#a63603' :
         value <= range[attribute_name][8] ? '#7f2704':
                    '#7f2704';
}
function style2(feature) {
    return {
        fillColor: getColor(feature.properties[attribute_name].value),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
var map = L.map('map',{
    scrollWheelZoom: false,
    zoomControl: false,
    doubleClickZoom: false,
    trackResize: true,
    boxZoom: false,
    dragging: false,
    scrollWheelZoom: false,
    zoom: 5
}).setView([22,85.5]);

var n = L.geoJson(indian_states, {
       onEachFeature: onEachFeature
    }).addTo(map);
n.setStyle(style2);

var info = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  var stateData;
    if(props && props[attribute_name].value){
      stateData = props[attribute_name].value.toFixed(2)
    }
    else {
      stateData = "No data to show"
    }
    this._div.innerHTML = '<h4>Attribute selected  <em>'+ display[ attribute_name].title+' </em></h4>' +  (props ?
        '<b>' + props.NAME_1 + '</b><br />' + stateData
        : 'Hover over a state to see the detail');
  }

info.addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info legend');

  this.update();
    return this._div;
};
legend.update = function (map){
    this._div.innerHTML="";
    var  grades = range[attribute_name];//[0, 10, 20, 50, 100, 200, 500, 1000],
  var  labels = [];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        this._div.innerHTML +=
            '<i style="background:' + getColor(grades[i] ) + '"></i> ' +
            grades[i].toFixed(2) + (grades[i + 1] ? '&ndash;' + grades[i + 1].toFixed(2) + '<br>' : '+');
    }
}
legend.addTo(map)
    mapLink =
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';


    $('ul.dropdown-menu').on('click', function (e) {
      attribute_name =  e.target.id;//schools-100-people'
      updateDescription();
      n.setStyle(style2);
      legend.update();
      info.update();
    })

    updateDescription();

}
