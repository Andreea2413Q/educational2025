import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import L from 'leaflet';
import worldData from './countries.geo.json';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const InteractiveMap = ({ 
  selectedCountry, 
  onCountrySelect, 
  onCountryDetailsSelect,
  selectedCapital 
}) => {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const geoJsonRef = useRef(null);

  useEffect(() => {
    setCountries(worldData);
    setLoading(false);
  }, []);

  const getCountryStyle = (feature) => ({
    color: 'black',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6,
    fillColor: feature.properties.NAME === selectedCountry || feature.properties.ADMIN === selectedCountry ? '#3388ff' : 'white',
  });

  const highlightStyle = {
    fillColor: '#ff7800',
    weight: 2,
    opacity: 1,
    color: '#ff7800',
    fillOpacity: 0.8
  };

  const onEachCountry = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle(highlightStyle);
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle(getCountryStyle(feature));
      },
      click: (e) => {
        const countryName = feature.properties.NAME || feature.properties.ADMIN || 'Țară necunoscută';
        onCountrySelect(countryName);
        onCountryDetailsSelect(countryName);
        
        setPopupInfo({
          name: countryName,
          latlng: e.latlng
        });
      }
    });
  };

  const updateCountryStyles = () => {
    if (geoJsonRef.current) {
      geoJsonRef.current.eachLayer(layer => {
        layer.setStyle(getCountryStyle(layer.feature));
      });
    }
  };

  useEffect(() => {
    updateCountryStyles();
  }, [selectedCountry]);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-40">
        <div className="text-lg">Se încarcă harta lumii...</div>
      </div>
    );
  }

  return (
    <MapContainer 
      style={{ height: '100%', width: '100%' }} 
      zoom={2} 
      center={[20, 0]}  
      minZoom={2}  
      worldCopyJump={false}
      maxBounds={[[90, -180], [-90, 180]]}  
      maxBoundsViscosity={1.0}
    >
      <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        attribution="&copy; OpenStreetMap contributors" 
      />
      
      {countries && (
        <GeoJSON 
          data={countries} 
          onEachFeature={onEachCountry}
          style={getCountryStyle}
          ref={geoJsonRef} 
        />
      )}
      
      {popupInfo && (
        <Popup
          position={popupInfo.latlng}
          onClose={() => setPopupInfo(null)}
        >
          <div className="text-center">
            <h3 className="font-bold text-lg mb-2">🌍 {popupInfo.name}</h3>
            {selectedCapital && selectedCapital !== 'Necunoscută' && (
              <p className="text-sm">
                <span className="font-semibold">Capitala:</span> {selectedCapital}
              </p>
            )}
            <p className="text-xs text-gray-600 mt-2">Întreabă AI-ul despre culorile din această cultură! →</p>
          </div>
        </Popup>
      )}
    </MapContainer>
  );
};

export default InteractiveMap;