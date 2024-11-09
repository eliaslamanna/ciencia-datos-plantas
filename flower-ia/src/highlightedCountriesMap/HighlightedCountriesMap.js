import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

const HighlightedCountriesMap = ({ countries }) => {
  const [geoData, setGeoData] = useState([]);

  useEffect(() => {
    fetch(geoUrl)
      .then(response => response.json())
      .then(data => setGeoData(data.features))
      .catch(error => console.error("Error loading GeoJSON data", error));
  }, []);

  return (
    <div>
      <h4 style={styles.header}>Mapa de los países de origen:</h4>
      <ComposableMap projection="geoMercator" width={800} height={600}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name;
              const isHighlighted = countries.includes(countryName);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHighlighted ? 'red' : '#D3D3D3'}
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  onClick={() => console.log("Clicked on:", countryName)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

const styles = {
  header: {
    fontSize: '24px',
    color: '#00796b',
    textAlign: 'center',
    marginBottom: '20px',
    textDecoration: 'underline',
    fontWeight: '600',
    fontFamily: "'Poppins', sans-serif",
  },
};

export default HighlightedCountriesMap;