"use client";

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { Loader2, TrendingUp, MapPin, Building2, Info, ArrowUpRight, ShieldCheck, Activity } from 'lucide-react';
import gsap from 'gsap';

// Dynamically import the entire GrowthMap component to avoid SSR errors
const GrowthMap = dynamic(() => import('./GrowthMap'), { 
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-[#0a1219]">
            <Loader2 className="w-10 h-10 animate-spin text-[#b6ff3b]" />
        </div>
    )
});

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

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

// Sparkline Component for Neighborhood Cards
const Sparkline = ({ color }: { color: string }) => {
    // Mock paths for different feels
    const paths = [
        "M0 25 L10 22 L20 24 L30 18 L40 20 L50 12 L60 15 L70 8 L80 10 L100 2",
        "M0 25 L15 20 L30 22 L45 15 L60 18 L75 10 L90 12 L100 5",
        "M0 25 L20 23 L40 20 L60 15 L80 12 L100 4"
    ];
    const path = paths[Math.floor(Math.random() * paths.length)];
    
    return (
        <svg className="w-16 h-8 opacity-40 group-hover:opacity-100 transition-opacity duration-500" viewBox="0 0 100 30">
            <path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

// Wealth Projection Curve Chart for Alpha Card
const WealthCurve = ({ startValue, endValue, color }: { startValue: number, endValue: number, color: string }) => {
    return (
        <div className="relative h-32 w-full mt-6 mb-2">
            <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.2 }} />
                        <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
                    </linearGradient>
                </defs>
                <path
                    d="M0 110 Q100 100, 200 60 T400 10"
                    fill="url(#curveGradient)"
                />
                <path
                    d="M0 110 Q100 100, 200 60 T400 10"
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                {/* Year Markers */}
                {[0, 2, 4, 6, 8, 10].map((year, i) => (
                    <circle key={i} cx={year * 40} cy={110 - (i * i * 2.5)} r="3" fill={color} opacity="0.5" />
                ))}
            </svg>
            <div className="flex justify-between text-[8px] font-black text-white/30 uppercase tracking-widest mt-1">
                <span>Today</span>
                <span>Year 5</span>
                <span>Year 10</span>
            </div>
        </div>
    );
};

export default function GrowthPredictor() {
    const [city, setCity] = useState('Delhi NCR');
    const [data, setData] = useState<NeighborhoodData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedLocality, setSelectedLocality] = useState<NeighborhoodData | null>(null);
    
    const listRef = useRef<HTMLDivElement>(null);
    const alphaCardRef = useRef<HTMLDivElement>(null);

    const fetchGrowthData = async (cityName: string) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://127.0.0.1:8000/growth-heatmap?city=${cityName}`);
            if (!response.ok) throw new Error('Failed to fetch growth data');
            const result = await response.json();
            setData(result.data);
            setSelectedLocality(result.data[0]);
        } catch (err: any) {
            setError('Could not connect to Prediction Model. Ensure the Python server is running on port 8000.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGrowthData(city);
    }, [city]);

    useEffect(() => {
        if (!loading && data.length > 0) {
            gsap.fromTo(".neighborhood-card", 
                { opacity: 0, x: -20 }, 
                { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }
            );
        }
    }, [loading, data]);

    useEffect(() => {
        if (selectedLocality) {
            gsap.fromTo(alphaCardRef.current,
                { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
        }
    }, [selectedLocality]);

    const getGrowthColor = (rate: number) => {
        if (rate >= 14) return '#b6ff3b'; // Peak Growth (Accent)
        if (rate >= 11) return '#fbbf24';  // High
        if (rate >= 8) return '#f59e0b';   // Moderate
        return '#ef4444';                  // Steady
    };

    const centerMap: [number, number] = data.length > 0 ? [data[0].lat, data[0].lng] : [28.6139, 77.2090];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Controls & List */}
            <div className="lg:col-span-4 space-y-6 flex flex-col h-[800px]">
                <div className="bg-[#0f1720]/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-7 shadow-2xl flex-1 flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xl font-black text-white flex items-center gap-3">
                            <Activity className="w-5 h-5 text-[#b6ff3b]" />
                            Delhi NCR Market
                        </h3>
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-white/40 uppercase tracking-widest">
                            Growth Focus
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-4">
                            <div className="relative">
                                <Loader2 className="w-10 h-10 animate-spin text-[#b6ff3b]" />
                                <div className="absolute inset-0 blur-lg bg-[#b6ff3b]/20"></div>
                            </div>
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Synchronizing Data...</p>
                        </div>
                    ) : error ? (
                        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
                            {error}
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3" ref={listRef}>
                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">Focus Localities</p>
                            {data.sort((a, b) => b.growthRate - a.growthRate).map((loc) => (
                                <button
                                    key={loc.locality}
                                    onClick={() => setSelectedLocality(loc)}
                                    className={`neighborhood-card w-full p-5 rounded-2xl border transition-all duration-500 text-left flex items-center gap-4 group relative overflow-hidden ${
                                        selectedLocality?.locality === loc.locality
                                        ? 'bg-[#b6ff3b]/10 border-[#b6ff3b]/30 shadow-[inset_0_0_20px_rgba(182,255,59,0.05)]'
                                        : 'bg-white/2 border-white/5 hover:border-white/20 hover:bg-white/5'
                                    }`}
                                >
                                    {selectedLocality?.locality === loc.locality && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#b6ff3b]"></div>
                                    )}
                                    <div className="flex-1">
                                        <h4 className="text-sm font-black text-white group-hover:text-[#b6ff3b] transition-colors">{loc.locality}</h4>
                                        <p className="text-[10px] font-bold text-white/30 mt-0.5">{formatCurrency(loc.currentPrice)} / sqft</p>
                                    </div>
                                    <Sparkline color={getGrowthColor(loc.growthRate)} />
                                    <div className="text-right min-w-[60px]">
                                        <p className="text-sm font-black tracking-tighter" style={{ color: getGrowthColor(loc.growthRate) }}>
                                            +{loc.growthRate}%
                                        </p>
                                        <p className="text-[8px] font-black text-white/20 uppercase">CAGR</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {selectedLocality && (
                    <div 
                        ref={alphaCardRef}
                        className="bg-gradient-to-br from-[#b6ff3b] to-[#86cc16] rounded-3xl p-7 text-[#0f1720] shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 opacity-70" />
                                    <h4 className="font-black text-xs uppercase tracking-widest">Investment Alpha</h4>
                                </div>
                                <span className="bg-black/10 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase">Active Analysis</span>
                            </div>
                            <p className="text-lg font-black leading-tight mb-2 tracking-tight">
                                {selectedLocality.locality} is poised for explosive growth.
                            </p>
                            <p className="text-xs font-bold opacity-70 leading-relaxed">
                                Our regressor projects a appreciation of <span className="underline decoration-2">{(selectedLocality.forecasts.tenYear / selectedLocality.currentPrice * 100).toFixed(0)}%</span> over the next decade.
                            </p>
                            
                            <WealthCurve startValue={selectedLocality.currentPrice} endValue={selectedLocality.forecasts.tenYear} color="#0f1720" />
                            
                            <div className="mt-6 flex items-center justify-between bg-black/5 p-4 rounded-2xl border border-black/5">
                                <div className="text-center flex-1 border-r border-black/10">
                                    <p className="text-[8px] font-black uppercase opacity-50 mb-1">Growth Index</p>
                                    <p className="text-lg font-black tracking-tighter">{selectedLocality.investmentScore}</p>
                                </div>
                                <div className="text-center flex-1">
                                    <p className="text-[8px] font-black uppercase opacity-50 mb-1">Risk Rating</p>
                                    <p className="text-lg font-black tracking-tighter">{100 - selectedLocality.investmentScore}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Map & Visualization */}
            <div className="lg:col-span-8 flex flex-col gap-8 h-[800px]">
                <div className="flex-1 rounded-[40px] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative group">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#b6ff3b]/5 to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    {!loading && data.length > 0 && (
                        <GrowthMap 
                            data={data}
                            centerMap={centerMap}
                            getGrowthColor={getGrowthColor}
                            setSelectedLocality={setSelectedLocality}
                            formatCurrency={formatCurrency}
                            selectedLocality={selectedLocality}
                        />
                    )}
                    
                    {/* Map Legend Overlay */}
                    <div className="absolute top-8 right-8 z-[1000] bg-[#0f1720]/80 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl flex flex-col gap-4 min-w-[200px]">
                        <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Market Heat</p>
                        <div className="space-y-3">
                            {[
                                { label: 'Peak: 14%+', color: '#b6ff3b' },
                                { label: 'Strong: 11-14%', color: '#fbbf24' },
                                { label: 'Steady: < 11%', color: '#ef4444' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 group/item">
                                    <span className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]" style={{ background: item.color }}></span>
                                    <span className="text-[10px] text-white/60 font-black uppercase tracking-wider group-hover/item:text-white transition-colors">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Floating HUD info */}
                    <div className="absolute bottom-8 left-8 z-[1000] flex gap-3">
                         <div className="px-5 py-3 rounded-2xl bg-[#0f1720]/80 backdrop-blur-xl border border-white/10 flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-[#b6ff3b]" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">{selectedLocality?.locality || city}</span>
                         </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { 
                            icon: Building2, 
                            color: '#b6ff3b', 
                            title: 'Infrastructure Delta', 
                            desc: 'Proximity to high-velocity transit hubs like Metro extensions.' 
                        },
                        { 
                            icon: Activity, 
                            color: '#60a5fa', 
                            title: 'Absorption Index', 
                            desc: 'Current supply-demand metrics processed by our proprietary regressor.' 
                        },
                        { 
                            icon: TrendingUp, 
                            color: '#c084fc', 
                            title: 'Forecast Model v2', 
                            desc: '92% confidence index for the 120-month appreciation trajectory.' 
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white/2 border border-white/10 rounded-3xl p-7 hover:bg-white/5 transition-all duration-500 hover:-translate-y-1">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${feature.color}15` }}>
                                <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                            </div>
                            <h4 className="text-white font-black text-sm mb-2">{feature.title}</h4>
                            <p className="text-[11px] text-white/40 leading-relaxed font-medium">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                .custom-popup .leaflet-popup-content-wrapper {
                    background: rgba(15, 23, 32, 0.8) !important;
                    backdrop-filter: blur(20px);
                    color: white;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 24px;
                    padding: 8px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
                }
                .custom-popup .leaflet-popup-tip {
                    background: rgba(15, 23, 32, 0.8) !important;
                    backdrop-filter: blur(20px);
                }
                .leaflet-container {
                    cursor: crosshair !important;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(182,255,59,0.2);
                }
            `}</style>
        </div>
    );
}
