"use client";

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapPickerProps {
    onLocationSelect: (location: { state: string; city: string; locality: string }) => void;
}

const LocationMarker = ({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) => {
    const [position, setPosition] = useState<L.LatLng | null>(null);
    
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });

    return position === null ? null : (
        <Marker position={position} />
    );
};

export default function MapPicker({ onLocationSelect }: MapPickerProps) {
    // Default to a central location in India
    const center: [number, number] = [20.5937, 78.9629];

    const handleLocationSelect = async (lat: number, lng: number) => {
        try {
            // Reverse geocoding using Nominatim
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
            const data = await response.json();
            
            if (data && data.address) {
                const address = data.address;
                const state = address.state || '';
                // Try different properties for city
                const city = address.city || address.town || address.county || address.state_district || '';
                // Try different properties for locality
                const locality = address.suburb || address.neighbourhood || address.residential || address.village || '';
                
                onLocationSelect({ state, city, locality });
            }
        } catch (error) {
            console.error("Failed to reverse geocode:", error);
        }
    };

    return (
        <div style={{ height: '300px', width: '100%', borderRadius: '12px', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
            <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%', zIndex: 1 }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <LocationMarker onLocationSelect={handleLocationSelect} />
            </MapContainer>
        </div>
    );
}
