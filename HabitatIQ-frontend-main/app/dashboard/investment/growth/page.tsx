"use client";

import GrowthPredictor from '@/components/GrowthPredictor';
import { TrendingUp, Info } from 'lucide-react';

export default function GrowthAnalysisPage() {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#b6ff3b]/10 flex items-center justify-center border border-[#b6ff3b]/20">
                            <TrendingUp className="w-6 h-6 text-[#b6ff3b]" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Neighborhood <span className="text-[#b6ff3b]">Growth</span></h1>
                    </div>
                    <p className="text-white/50 max-w-xl text-lg font-medium leading-relaxed">
                        Visualizing the next decade of wealth. Our AI analyzes infrastructure, demand, and localized data to pinpoint high-velocity appreciation zones.
                    </p>
                </div>
                
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Model Version</p>
                        <p className="text-sm font-bold text-white">v2.4.1 (Proprietary Regressor)</p>
                    </div>
                </div>
            </div>

            {/* Main Interactive Map & Predictor */}
            <GrowthPredictor />

            {/* Methodology Note */}
            <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10">
                <div className="flex items-start gap-4">
                    <div className="mt-1">
                        <Info className="w-5 h-5 text-[#b6ff3b]" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-2">How our Prediction Model works</h4>
                        <p className="text-sm text-white/40 leading-relaxed max-w-4xl">
                            The Neighborhood Growth Predictor leverages a multi-layer regressor trained on 15 years of historical price data, upcoming infrastructure projects (Metro, Airports, Expressways), and commercial development permits. Unlike standard inflation-based estimates, our model identifies "Heat Sinks"—undervalued pockets poised for rapid gentrification based on localized demand-supply imbalances.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
