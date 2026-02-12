'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Flame, Sun, Maximize2 } from 'lucide-react';

interface ASALFeature {
  type: string;
  properties: {
    county: string;
    classification: string;
    area_hectares: number;
    area_acres: number;
  };
}

interface ASALData {
  type: string;
  features: ASALFeature[];
}

export default function ASALMap() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [countiesData, setCountiesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [totalStats, setTotalStats] = useState({
    arid: { hectares: 0, acres: 0, count: 0, counties: [] as string[] },
    semiArid: { hectares: 0, acres: 0, count: 0, counties: [] as string[] },
    total: { hectares: 0, acres: 0, count: 0 },
    asalPercentage: 0
  });

  useEffect(() => {
    // Load county data with ASAL classifications
    fetch('/data/kenya_counties.geojson')
      .then(res => res.json())
      .then(data => {
        setCountiesData(data);

        // Calculate totals from county data
        const stats = data.features.reduce((acc: any, feature: any) => {
          const classification = feature.properties.classification;
          const countyName = feature.properties.COUNTY || feature.properties.COUNTY_NAM;

          if (classification === 'Arid') {
            acc.arid.hectares += feature.properties.area_hectares || 0;
            acc.arid.acres += feature.properties.area_acres || 0;
            acc.arid.count += 1;
            if (countyName) acc.arid.counties.push(countyName);
          } else if (classification === 'Semi-Arid') {
            acc.semiArid.hectares += feature.properties.area_hectares || 0;
            acc.semiArid.acres += feature.properties.area_acres || 0;
            acc.semiArid.count += 1;
            if (countyName) acc.semiArid.counties.push(countyName);
          }
          return acc;
        }, {
          arid: { hectares: 0, acres: 0, count: 0, counties: [] },
          semiArid: { hectares: 0, acres: 0, count: 0, counties: [] }
        });

        setTotalStats(stats);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading county data:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current || !countiesData) return;

    // Initialize map centered on Kenya
    const map = L.map(mapContainerRef.current).setView([0.5, 37.5], 6);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Calculate total area of all counties
    let totalKenyaArea = 0;
    let asalTotalArea = 0;

    countiesData.features.forEach((feature: any) => {
      const countyName = feature.properties.COUNTY || feature.properties.COUNTY_NAM;
      const countyArea = feature.properties.Shape_Area || 0;
      const classification = feature.properties.classification;

      totalKenyaArea += countyArea;

      if (classification === 'Arid' || classification === 'Semi-Arid') {
        asalTotalArea += countyArea;
        const isArid = classification === 'Arid';

        const layer = L.geoJSON(feature, {
          style: {
            color: isArid ? '#8B0000' : '#FF8C00',
            weight: 2,
            fillOpacity: 0.7,
            fillColor: isArid ? '#DC143C' : '#FFA500'
          }
        }).addTo(map);

        layer.bindPopup(`
              <div class="p-3">
                <h3 class="font-bold text-lg">${countyName} County</h3>
                <p class="text-sm mt-1">
                  <span class="inline-block px-2 py-1 rounded text-white text-xs font-semibold ${isArid ? 'bg-red-600' : 'bg-orange-500'}">
                    ${classification}
                  </span>
                </p>
                <div class="mt-2 text-sm">
                  <p><strong>Area:</strong> ${feature.properties.area_hectares?.toLocaleString() || 'N/A'} ha</p>
                  <p><strong>Acres:</strong> ${feature.properties.area_acres?.toLocaleString() || 'N/A'}</p>
                </div>
              </div>
            `);
      } else {
        // Show non-ASAL counties in light green (fertile areas)
        const layer = L.geoJSON(feature, {
          style: {
            color: '#2d6a4f',
            weight: 1,
            fillOpacity: 0.4,
            fillColor: '#52b788'
          }
        }).addTo(map);

        layer.bindPopup(`
              <div class="p-3">
                <h3 class="font-bold text-lg">${countyName} County</h3>
                <p class="text-sm mt-1">
                  <span class="inline-block px-2 py-1 rounded bg-green-600 text-white text-xs font-semibold">
                    Humid/Sub-humid (Fertile)
                  </span>
                </p>
              </div>
            `);
      }
    });

    // Calculate percentage
    const asalPercentage = totalKenyaArea > 0 ? (asalTotalArea / totalKenyaArea) * 100 : 80;

    // Update state with percentage
    setTotalStats(prev => ({
      ...prev,
      asalPercentage: Math.round(asalPercentage)
    }));

    // Add enhanced legend
    const legend = new L.Control({ position: 'bottomright' });
    legend.onAdd = function () {
      const div = L.DomUtil.create('div');
      div.style.backgroundColor = 'white';
      div.style.padding = '12px';
      div.style.borderRadius = '8px';
      div.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      div.style.border = '1px solid #d1d5db';
      div.style.fontSize = '14px';
      div.style.fontFamily = 'system-ui, -apple-system, sans-serif';

      div.innerHTML = `
            <div>
              <h4 style="font-weight: bold; margin-bottom: 8px; color: #1f2937;">Land Classification</h4>
              <div style="display: flex; align-items: center; margin-bottom: 6px;">
                <div style="width: 20px; height: 20px; margin-right: 8px; background-color: #DC143C; opacity: 0.7;"></div>
                <span style="color: #374151;">Arid (9 counties)</span>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 6px;">
                <div style="width: 20px; height: 20px; margin-right: 8px; background-color: #FFA500; opacity: 0.7;"></div>
                <span style="color: #374151;">Semi-Arid (14 counties)</span>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 6px;">
                <div style="width: 20px; height: 20px; margin-right: 8px; background-color: #52b788; opacity: 0.4;"></div>
                <span style="color: #374151;">Fertile Areas (24 counties)</span>
              </div>
              <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #d1d5db; font-size: 12px; color: #4b5563;">
                <strong>ASAL areas cover ~${Math.round(asalPercentage)}% of Kenya</strong>
              </div>
            </div>
          `;
      return div;
    };
    legend.addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [countiesData]);

  if (loading) {
    return <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">Loading map...</div>;
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Arid and Semi-Arid Lands (ASAL) in Kenya</h2>
        <p className="text-gray-600 mt-1">Distribution of ASAL areas across Kenyan counties</p>
      </div>

      <div ref={mapContainerRef} className="w-full h-96 rounded-lg shadow-lg border border-gray-300" />

      {countiesData && (
        <>
          {/* Overall ASAL Coverage */}
          <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-2 border-gray-300">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Total ASAL Coverage in Kenya</h3>
              <div className="flex items-center justify-center gap-8">
                <div>
                  <p className="text-5xl font-bold text-red-600">{totalStats.asalPercentage || 80}%</p>
                  <p className="text-sm text-gray-600 mt-1">of Kenya's Land Mass</p>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-700"><strong>{totalStats.arid.count + totalStats.semiArid.count} ASAL Counties</strong> ({totalStats.arid.count} Arid + {totalStats.semiArid.count} Semi-Arid)</p>
                  <p className="text-sm text-gray-700"><strong>24 Counties</strong> are fertile/humid</p>
                  <p className="text-sm text-gray-700 mt-1">Total: <strong>47 Counties</strong> in Kenya</p>
                  <p className="text-xs text-gray-600 mt-2">Home to 36-38% of population</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Arid Areas Stats */}
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-lg text-red-800 mb-2 flex items-center">
                <Flame className="w-5 h-5 text-red-600 mr-2" />
                Arid Areas
              </h3>
              <p className="text-sm text-gray-600 mb-2">{totalStats.arid.count} Counties</p>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" /> Total Area (Hectares)
                  </p>
                  <p className="text-2xl font-bold text-red-700">{totalStats.arid.hectares.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Area (Acres)</p>
                  <p className="text-2xl font-bold text-red-700">{totalStats.arid.acres.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-700">
                <p className="font-semibold mb-1">Counties:</p>
                <p>{totalStats.arid.counties.join(', ')}</p>
              </div>
            </div>

            {/* Semi-Arid Areas Stats */}
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-lg text-orange-800 mb-2 flex items-center">
                <Sun className="w-5 h-5 text-orange-500 mr-2" />
                Semi-Arid Areas
              </h3>
              <p className="text-sm text-gray-600 mb-2">{totalStats.semiArid.count} Counties</p>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" /> Total Area (Hectares)
                  </p>
                  <p className="text-2xl font-bold text-orange-700">{totalStats.semiArid.hectares.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Area (Acres)</p>
                  <p className="text-2xl font-bold text-orange-700">{totalStats.semiArid.acres.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-700">
                <p className="font-semibold mb-1">Counties:</p>
                <p>{totalStats.semiArid.counties.join(', ')}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
