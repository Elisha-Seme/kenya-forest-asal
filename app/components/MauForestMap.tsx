'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Ruler, TreePine, MapPin } from 'lucide-react';

interface MauForestData {
  type: string;
  properties: {
    name: string;
    county: string;
    area_hectares: number;
    area_acres: number;
    description: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

export default function MauForestMap() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mauData, setMauData] = useState<MauForestData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load Mau Forest data
    fetch('/data/mau_forest.json')
      .then(res => res.json())
      .then(data => {
        setMauData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Mau Forest data:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current || !mauData) return;

    // Initialize map centered on Mau Forest
    const map = L.map(mapContainerRef.current).setView([-0.45, 35.55], 9);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add Mau Forest polygon
    const coordinates = mauData.geometry.coordinates[0].map(coord => [coord[1], coord[0]] as [number, number]);

    const mauPolygon = L.polygon(coordinates, {
      color: '#228B22',
      fillColor: '#32CD32',
      fillOpacity: 0.6,
      weight: 3
    }).addTo(map);

    // Add popup with information
    mauPolygon.bindPopup(`
      <div class="p-2">
        <h3 class="font-bold text-lg">${mauData.properties.name}</h3>
        <p class="text-sm mt-1"><strong>Counties:</strong> ${mauData.properties.county}</p>
        <p class="text-sm">${mauData.properties.description}</p>
      </div>
    `);

    // Fit map to polygon bounds
    map.fitBounds(mauPolygon.getBounds());

    // Load and display relevant counties
    fetch('/data/kenya_counties.geojson')
      .then(res => res.json())
      .then(countiesData => {
        const mauCounties = ['Nakuru', 'Kericho', 'Narok', 'Bomet'];

        countiesData.features.forEach((feature: any) => {
          if (mauCounties.includes(feature.properties.COUNTY)) {
            L.geoJSON(feature, {
              style: {
                color: '#666',
                weight: 2,
                fillOpacity: 0.1,
                fillColor: '#999'
              }
            }).addTo(map).bindPopup(`
              <div class="p-2">
                <h4 class="font-semibold">${feature.properties.COUNTY} County</h4>
              </div>
            `);
          }
        });
      })
      .catch(err => console.error('Error loading counties:', err));

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mauData]);

  if (loading) {
    return <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">Loading map...</div>;
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <TreePine className="w-8 h-8 text-green-700 mr-2" />
          Mau Forest Complex
        </h2>
        <p className="text-gray-600 mt-1 flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          Location: {mauData?.properties.county}
        </p>
      </div>

      <div ref={mapContainerRef} className="w-full h-96 rounded-lg shadow-lg border border-gray-300" />

      {mauData && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-semibold text-lg text-green-800 mb-2 flex items-center">
            <Ruler className="w-5 h-5 mr-2" />
            Area Measurements
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Hectares</p>
              <p className="text-2xl font-bold text-green-700">{mauData.properties.area_hectares.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Acres</p>
              <p className="text-2xl font-bold text-green-700">{mauData.properties.area_acres.toLocaleString()}</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 mt-3">{mauData.properties.description}</p>
        </div>
      )}
    </div>
  );
}
