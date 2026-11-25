import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useGeolocation } from '../../hooks/useGeolocation';
import { calculateDistanceKm } from '../../utils/formatters';
import { MapPin, Navigation, ExternalLink, Loader2 } from 'lucide-react';

// Custom clean SVG markers to prevent leaflet asset 404 bugs in Vite bundlers
const hotelMarkerIcon = L.divIcon({
  className: 'custom-hotel-pin',
  html: `
    <div style="background-color: #2563eb; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2.5px solid white;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/>
        <path d="M10 22v-4h4v4"/>
        <path d="M8 7h.01"/><path d="M16 7h.01"/><path d="M12 7h.01"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 11h.01"/>
      </svg>
    </div>
  `,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
  popupAnchor: [0, -20],
});

const userMarkerIcon = L.divIcon({
  className: 'custom-user-pin',
  html: `
    <div style="background-color: #10b981; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2.5px solid white;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11"/>
      </svg>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -18],
});

// Helper component to smoothly re-center the map when coords change
const MapRecenter = ({ center }) => {
  const map = useMap();
  React.useEffect(() => {
    if (center && center[0] && center[1]) {
      map.flyTo(center, map.getZoom() || 13, { duration: 1.2 });
    }
  }, [center, map]);
  return null;
};

export const HotelMap = ({ hotel }) => {
  const lat = Number(hotel.latitude) || 48.8584;
  const lng = Number(hotel.longitude) || 2.2945;
  const hotelPosition = [lat, lng];

  const { getCurrentLocation, location: userLocation, loading: userGpsLoading, error: userGpsError } = useGeolocation();
  const [distanceKm, setDistanceKm] = useState(null);

  const handleLocateUser = () => {
    getCurrentLocation();
  };

  React.useEffect(() => {
    if (userLocation) {
      const d = calculateDistanceKm(userLocation.latitude, userLocation.longitude, lat, lng);
      setDistanceKm(d);
    }
  }, [userLocation, lat, lng]);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MapPin size={18} className="text-blue-600" />
            Location & Map Coordinates
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Coordinates: <span className="font-semibold text-slate-700">{lat.toFixed(5)}° N, {lng.toFixed(5)}° E</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* User Geolocation API Trigger */}
          <button
            type="button"
            onClick={handleLocateUser}
            disabled={userGpsLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition disabled:opacity-50"
          >
            {userGpsLoading ? (
              <Loader2 size={14} className="animate-spin text-emerald-600" />
            ) : (
              <Navigation size={14} className="text-emerald-600" />
            )}
            Calculate Distance to My Location
          </button>

          {/* External Google Maps Link */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition"
          >
            <span>Google Maps</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Geolocation feedback */}
      {distanceKm !== null && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2.5 flex items-center justify-between text-xs text-emerald-900">
          <span className="flex items-center gap-1.5 font-medium">
            <Navigation size={14} className="text-emerald-600" />
            You are approximately <strong className="font-bold">{distanceKm.toLocaleString()} km</strong> away from this hotel.
          </span>
          <span className="text-[11px] text-emerald-700 font-medium">HTML5 Geolocation API</span>
        </div>
      )}

      {userGpsError && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-800">
          {userGpsError}
        </div>
      )}

      {/* Leaflet Map Canvas */}
      <div className="w-full h-80 sm:h-96 relative">
        <MapContainer
          center={hotelPosition}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapRecenter center={hotelPosition} />

          {/* Hotel Location Marker */}
          <Marker position={hotelPosition} icon={hotelMarkerIcon}>
            <Popup>
              <div className="text-xs p-1 max-w-[200px]">
                <strong className="block font-bold text-slate-900 mb-1">{hotel.title}</strong>
                <p className="text-slate-600 text-[11px] mb-1">{hotel.locationName || 'Hotel location'}</p>
                <span className="font-bold text-blue-600">${hotel.price}/night</span>
              </div>
            </Popup>
          </Marker>

          {/* User's GPS Location Marker (if granted) */}
          {userLocation && (
            <Marker
              position={[userLocation.latitude, userLocation.longitude]}
              icon={userMarkerIcon}
            >
              <Popup>
                <div className="text-xs p-1">
                  <strong className="block text-emerald-800 font-bold">Your Current Location</strong>
                  <span className="text-[11px] text-slate-600">Calculated via Browser Geolocation API</span>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

