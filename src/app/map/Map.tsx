'use client'
import { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: -34.397, lng: 150.644 });
  const [isLoading, setIsLoading] = useState(true);
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          console.log('location changed: ' + position);
          
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      alert("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {isLoaded ? (
        <GoogleMap
          zoom={14}
          center={currentLocation}
          mapContainerStyle={{ width: '100%', height: '100%' }}
        >
          <Marker position={currentLocation} title="You are here!" />
        </GoogleMap>
      ) : (
        <h2>Loading map...</h2>
      )}
    </div>
  );
};

export default Map;
