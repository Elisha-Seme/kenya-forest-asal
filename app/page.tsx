'use client';

import dynamic from 'next/dynamic';

// Import maps as client components dynamically to avoid SSR issues with Leaflet
const MauForestMap = dynamic(() => import('./components/MauForestMap'), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">Loading map...</div>
});

const ASALMap = dynamic(() => import('./components/ASALMap'), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">Loading map...</div>
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-green-700 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Kenya Forest & ASAL Visualization</h1>
          <p className="text-green-100">Interactive maps showing Mau Forest Complex and Arid/Semi-Arid Lands</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Project Overview</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            This visualization provides critical information about Kenya&apos;s natural resources and climate zones:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Mau Forest Complex:</strong> The largest indigenous montane forest in East Africa, spanning multiple counties</li>
            <li><strong>ASAL Areas:</strong> Arid and Semi-Arid Lands covering a significant portion of Kenya&apos;s territory</li>
          </ul>
        </section>

        {/* Mau Forest Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <MauForestMap />
          </div>
        </section>

        {/* Divider */}
        <div className="border-t-2 border-gray-200 my-12"></div>

        {/* ASAL Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <ASALMap />
          </div>
        </section>

        {/* Key Insights */}
        <section className="mb-12 bg-blue-50 rounded-lg shadow-md p-6 border border-blue-200">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Mau Forest Complex</h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Critical water catchment area</li>
                <li>• Supports over 400,000 hectares of biodiversity</li>
                <li>• Spans Nakuru, Kericho, Narok, and Bomet counties</li>
                <li>• Feeds major rivers including the Mara, Sondu, and Ewaso Ngiro</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">ASAL Areas</h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• 23 counties classified as ASAL (9 Arid + 14 Semi-Arid)</li>
                <li>• Cover approximately 80-89% of Kenya&apos;s land mass</li>
                <li>• Home to 36-38% of Kenya&apos;s population</li>
                <li>• Support 70% of national livestock</li>
                <li>• Face unique challenges: water scarcity, drought, food insecurity</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-600 text-sm mt-12 pb-6">
          <p>Data visualization for environmental and climate analysis in Kenya</p>

        </footer>
      </div>
    </main>
  );
}
