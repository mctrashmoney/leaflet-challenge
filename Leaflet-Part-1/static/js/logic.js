// Create different base layers
var streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  
  var satellite = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://opentopomap.org/">OpenTopoMap</a> contributors'
  });
  
  // ESRI Outdoors (Topographic) layer
  var topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; <a href="https://www.arcgis.com/home/item.html?id=30e5fe3149c34df1ba922e6f5bbf808f">Esri</a>, ' +
      'USGS, NOAA',
    maxZoom: 20
  });
  
  // Initialize the map with default base layer (Streets)
  var map = L.map('map', {
    center: [37.7749, -122.4194], // Center on the US
    zoom: 5,
    layers: [streets] // Default layer
  });
  
  // GeoJSON URL for earthquake data
  const geojsonUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  // Create a layer group for earthquake markers
  var earthquakeLayer = L.layerGroup();
  
  // Fetch the GeoJSON data and add it to the earthquake layer
  fetch(geojsonUrl)
    .then(response => response.json())
    .then(data => {
      // Add GeoJSON data to the earthquake layer
      L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
            radius: feature.properties.mag * 4, // Set marker size based on magnitude
            fillColor: getDepthColor(feature.geometry.coordinates[2]), // Color based on depth
            color: "#000",
            weight: 0.5,
            opacity: 1,
            fillOpacity: 0.8
          });
        },
        onEachFeature: function(feature, layer) {
          layer.bindPopup(
            `<h3>${feature.properties.place}</h3>
             <hr>
             <p>Magnitude: ${feature.properties.mag}</p>
             <p>Depth: ${feature.geometry.coordinates[2]} km</p>
             <p>${new Date(feature.properties.time)}</p>`
          );
        }
      }).addTo(earthquakeLayer);
    })
    .catch(error => console.error('Error fetching GeoJSON:', error));
  
  // Add the earthquake layer to the map
  earthquakeLayer.addTo(map);
  
  // Define base maps
  var baseMaps = {
    "Streets": streets,
    "Satellite": satellite,
    "Topography": topo
  };
  
  // Define overlay maps
  var overlayMaps = {
    "Earthquakes": earthquakeLayer
  };
  
  // Add layer control to the map
  L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
  
  // Function to determine marker color based on earthquake depth
  function getDepthColor(depth) {
    return depth > 300 ? '#7B241C' :
           depth > 150 ? '#C0392B' :  
           depth > 90 ? '#E74C3C' :
           depth > 70 ? '#FF4500' :
           depth > 50 ? '#FF8C00' :
           depth > 30 ? '#FFD700' :
           depth > 10 ? '#ADFF2F' :
           '#00FF00';
  }  
  
  // Function to add a legend to the map
  function addLegend() {
    var legend = L.control({ position: "bottomright" });
  
    legend.onAdd = function () {
      var div = L.DomUtil.create("div", "info legend");
      var depths = [0, 10, 30, 50, 70, 90];
      var colors = ['#00FF00', '#ADFF2F', '#FFD700', '#FF8C00', '#FF4500', '#FF0000'];
  
      // Loop through intervals and generate a label with a colored square for each interval
      for (var i = 0; i < depths.length; i++) {
        div.innerHTML +=
          `<div>
            <i style="background: ${colors[i]}; width: 10px; height: 10px; display: inline-block; margin-right: 8px;"></i>
            ${depths[i]}${depths[i + 1] ? `&ndash;${depths[i + 1]}` : '+'}
           </div>`;
      }
  
      return div;
    };
  
    legend.addTo(map);
  }
  
  // Add the legend to the map
  addLegend();
  