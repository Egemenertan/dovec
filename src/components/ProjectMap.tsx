'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface ProjectMapProps {
  lat: number;
  lng: number;
}

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem'
};

const ProjectMap: React.FC<ProjectMapProps> = ({ lat, lng }) => {
  const center = {
    lat: lat,
    lng: lng
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry',
              stylers: [{ color: '#242f3e' }]
            },
            {
              featureType: 'all',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#242f3e' }]
            },
            {
              featureType: 'all',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#746855' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#17263c' }]
            }
          ]
        }}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default ProjectMap; 