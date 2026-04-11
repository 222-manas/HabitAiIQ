"use client";

import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Helper component to update map view when center changes
function MapUpdater({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom(), { animate: true });
    }, [center, map]);
    return null;
}

// Fix for Leaflet default icons (though we use CircleMarkers, it's good practice)
if (typeof window !== 'undefined') {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
}

interface NeighborhoodData {
    locality: string;
    lat: number;
    lng: number;
    currentPrice: number;
    growthRate: number;
    forecasts: {
        fiveYear: number;
        tenYear: number;
    };
    investmentScore: number;
}

interface GrowthMapProps {
    data: NeighborhoodData[];
    centerMap: [number, number];
    getGrowthColor: (rate: number) => string;
    setSelectedLocality: (loc: NeighborhoodData) => void;
    formatCurrency: (amount: number) => string;
    selectedLocality: NeighborhoodData | null;
}

export default function GrowthMap({ data, centerMap, getGrowthColor, setSelectedLocality, formatCurrency, selectedLocality }: GrowthMapProps) {
    return (
        <MapContainer 
            center={centerMap} 
            zoom={11} 
            style={{ height: '100%', width: '100%', background: '#0a1219' }}
            zoomControl={false}
        >
            <MapUpdater center={centerMap} />
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {data.map((loc) => {
                const isHighGrowth = loc.growthRate >= 14;
                const isReliable = loc.investmentScore >= 85;
                
                return (
                    <CircleMarker
                        key={loc.locality}
                        center={[loc.lat, loc.lng]}
                        radius={selectedLocality?.locality === loc.locality ? 25 : 18}
                        pathOptions={{
                            fillColor: getGrowthColor(loc.growthRate),
                            fillOpacity: selectedLocality?.locality === loc.locality ? 0.8 : 0.5,
                            color: '#ffffff',
                            weight: selectedLocality?.locality === loc.locality ? 3 : 1,
                        }}
                        eventHandlers={{
                            click: () => setSelectedLocality(loc),
                            mouseover: (e) => {
                                e.target.setStyle({ fillOpacity: 0.9, weight: 3 });
                            },
                            mouseout: (e) => {
                                if (selectedLocality?.locality !== loc.locality) {
                                    e.target.setStyle({ fillOpacity: 0.5, weight: 1 });
                                }
                            }
                        }}
                    >
                        <Popup className="custom-popup" maxWidth={300}>
                            <div className="p-1">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                                        Neighborhood Profile
                                    </span>
                                    {isHighGrowth && (
                                        <span className="px-2 py-0.5 rounded-full bg-[#b6ff3b]/20 text-[#b6ff3b] text-[8px] font-black uppercase border border-[#b6ff3b]/30">
                                            High Velocity
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-xl font-black text-white mb-1 leading-tight">{loc.locality}</h3>
                                <p className="text-xs text-white/50 mb-4 font-medium">Located in {centerMap[0] > 20 ? 'Mumbai' : 'Delhi NCR'}</p>
                                
                                <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 mb-4">
                                    <div>
                                        <p className="text-[9px] text-white/30 uppercase font-bold mb-1">Growth Forecast</p>
                                        <p className="text-xl font-black text-[#b6ff3b]">+{loc.growthRate}%</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-white/30 uppercase font-bold mb-1">Inv. Score</p>
                                        <p className="text-xl font-black text-white">{loc.investmentScore}<span className="text-[10px] opacity-30">/100</span></p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-xl">
                                        <span className="text-[10px] text-white/40 font-bold uppercase">5YR Price Map</span>
                                        <span className="text-xs font-bold text-white">{formatCurrency(loc.forecasts.fiveYear)}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-[#b6ff3b]/10 px-3 py-2 rounded-xl border border-[#b6ff3b]/20">
                                        <span className="text-[10px] text-[#b6ff3b] font-bold uppercase">10YR Target</span>
                                        <span className="text-xs font-black text-[#b6ff3b]">{formatCurrency(loc.forecasts.tenYear)}</span>
                                    </div>
                                </div>
                                
                                {isReliable && (
                                    <div className="mt-4 flex items-center gap-2 text-[9px] font-bold text-white/40 italic">
                                        <div className="w-1 h-1 rounded-full bg-[#b6ff3b]"></div>
                                        Verified as a Stable Long-term Asset
                                    </div>
                                )}
                            </div>
                        </Popup>
                    </CircleMarker>
                );
            })}
        </MapContainer>
    );
}
