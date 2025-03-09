# Earthquake Visualization with Leaflet.js

## Overview
This project visualizes real-time earthquake data using **Leaflet.js** and **USGS GeoJSON feeds**. The interactive map plots earthquakes based on their **latitude** and **longitude**, adjusting the marker **size by magnitude** and **color by depth**.

## Features
- **Live Earthquake Data** - Fetches real-time data from the **USGS Earthquake API**.
- **Interactive Map** - Uses **Leaflet.js** to render the earthquake locations.
- **Dynamic Markers** - Earthquake magnitude affects **size**, depth affects **color**.
- **Info Popups** - Click markers for details like **location, magnitude, and depth**.
- **Legend & Layer Control** - Toggle different map styles and interpret depth values.

## Repository Contents
- **index.html** - The main webpage structure.
- **style.css** - Custom styles for the map and legend.
- **logic.js** - JavaScript for fetching data and rendering the map.

## Installation & Usage
1. **Clone this repository**
2. **Open `index.html` in a browser**

## Data Source
This project pulls data from the **USGS Earthquake API**: [USGS Earthquake Data](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)

## Future Enhancements
- Add tectonic plate dataset from [this](https://github.com/fraxen/tectonicplates) data.
- Add other base maps.
