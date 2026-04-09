import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { Property } from '@/types/property';
import PropertyCard from '@/components/PropertyCard';
import { Loader2 } from 'lucide-react';

interface SimilarPropertiesProps {
    currentPropertyId: string;
    city?: string;
    locality?: string;
    propertyType?: string;
}

export default function SimilarProperties({ currentPropertyId, city, locality, propertyType }: SimilarPropertiesProps) {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSimilar = async () => {
            try {
                const params = new URLSearchParams();
                if (city) params.append('city', city);
                if (propertyType) params.append('propertyType', propertyType);

                const data = await fetchApi<{ properties: Property[] }>(`/properties?${params.toString()}`);
                
                // Filter out current property
                const filtered = data.properties.filter((p: Property) => p._id !== currentPropertyId);
                
                // Sort to prefer same locality
                filtered.sort((a, b) => {
                    if (a.locality === locality && b.locality !== locality) return -1;
                    if (a.locality !== locality && b.locality === locality) return 1;
                    return 0;
                });
                
                setProperties(filtered.slice(0, 3)); // Show top 3 similar properties
            } catch (err) {
                console.error('Failed to fetch similar properties:', err);
            } finally {
                setLoading(false);
            }
        };

        if (city || propertyType) {
            fetchSimilar();
        } else {
            setLoading(false);
        }
    }, [city, locality, propertyType, currentPropertyId]);

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--accent)' }} />
            </div>
        );
    }

    if (properties.length === 0) {
        return null; // Return null if no similar properties
    }

    return (
        <div className="mt-12 pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#ffffff' }}>Similar Properties in {city || 'this area'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map(property => (
                    <PropertyCard key={property._id} property={property} />
                ))}
            </div>
        </div>
    );
}
