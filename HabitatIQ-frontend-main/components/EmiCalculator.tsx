import { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

interface EmiCalculatorProps {
    propertyPrice: number;
}

export default function EmiCalculator({ propertyPrice }: EmiCalculatorProps) {
    const [downPayment, setDownPayment] = useState<number>(() => propertyPrice * 0.2); // 20% down payment default
    const [interestRate, setInterestRate] = useState<number>(8.5); // Default interest rate
    const [tenureYears, setTenureYears] = useState<number>(20); // Default 20 years
    const [emi, setEmi] = useState<number>(0);

    // Update down payment if property price changes
    useEffect(() => {
        setDownPayment(propertyPrice * 0.2);
    }, [propertyPrice]);

    useEffect(() => {
        const principal = propertyPrice - downPayment;
        const r = interestRate / 12 / 100; // Monthly interest rate
        const n = tenureYears * 12; // Total number of months

        if (principal > 0 && r > 0 && n > 0) {
            const calculatedEmi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            setEmi(calculatedEmi);
        } else {
            setEmi(0);
        }
    }, [propertyPrice, downPayment, interestRate, tenureYears]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="rounded-2xl p-6 mb-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 className="flex items-center gap-2 text-lg font-bold mb-4" style={{ color: '#ffffff' }}>
                <Calculator className="w-5 h-5 text-[color:var(--accent)]" />
                EMI Calculator
            </h4>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--muted)' }}>
                        Down Payment (₹)
                    </label>
                    <input
                        type="number"
                        min="0"
                        max={propertyPrice}
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="w-full bg-transparent border rounded-lg px-3 py-2 text-sm text-white"
                        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--muted)' }}>
                            Interest Rate (%)
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="30"
                            step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full bg-transparent border rounded-lg px-3 py-2 text-sm text-white"
                            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--muted)' }}>
                            Tenure (Years)
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="30"
                            value={tenureYears}
                            onChange={(e) => setTenureYears(Number(e.target.value))}
                            className="w-full bg-transparent border rounded-lg px-3 py-2 text-sm text-white"
                            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                        />
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <div className="flex justify-between items-end">
                        <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--muted)' }}>Monthly EMI</span>
                        <span className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{formatCurrency(emi)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
