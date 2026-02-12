# Kenya Forest & ASAL Visualization

An interactive Next.js application visualizing the Mau Forest Complex and Arid/Semi-Arid Lands (ASAL) in Kenya.

## 🌍 Project Overview

This application provides comprehensive visual data about:

1. **Mau Forest Complex** - The largest indigenous montane forest in East Africa
   - Location within Kenyan counties (Nakuru, Kericho, Narok, Bomet)
   - Interactive map visualization
   - Area measurements in hectares and acres

2. **ASAL Areas** - Arid and Semi-Arid Lands distribution across Kenya
   - County-level classification (Arid vs Semi-Arid)
   - Color-coded visualization
   - Total area calculations
   - List of affected counties

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd kenya-forest-asal
```

2. Install dependencies (already done):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🗺️ Features

### Mau Forest Visualization
- Interactive map showing forest boundaries
- Overlay of county borders
- Area measurements:
  - **416,000 hectares**
  - **1,027,954 acres**
- Click on forest area for detailed information

### ASAL Areas Visualization
- Color-coded county mapping:
  - 🔴 **Red** - Arid areas
  - 🟠 **Orange** - Semi-Arid areas
- Interactive legend
- Detailed statistics for each classification:
  - Total areas in hectares and acres
  - Number of counties affected
  - Complete list of counties

### Counties Classifications

**Arid Counties (9):**
Primarily pastoralist areas with highest aridity:
- Turkana
- Marsabit
- Wajir
- Mandera
- Garissa
- Isiolo
- Samburu
- Tana River
- Baringo

**Semi-Arid Counties (14):**
Support agro-pastoralism and mixed farming:
- Laikipia
- Kajiado
- Narok
- West Pokot
- Kitui
- Makueni
- Taita Taveta
- Kwale
- Kilifi
- Embu
- Lamu
- Meru
- Nyeri (Kieni sub-county)
- Tharaka Nithi

## 📁 Project Structure

```
kenya-forest-asal/
├── app/
│   ├── components/
│   │   ├── MauForestMap.tsx      # Mau Forest visualization component
│   │   └── ASALMap.tsx           # ASAL areas visualization component
│   ├── page.tsx                  # Main page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── public/
│   └── data/
│       ├── kenya_counties.geojson  # Kenya county boundaries
│       ├── mau_forest.json         # Mau Forest data
│       └── asal_areas.json         # ASAL classification data
└── package.json
```

## 🛠️ Technologies Used

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Leaflet** - Interactive maps
- **React Leaflet** - React bindings for Leaflet
- **GeoJSON** - Geographic data format

## 📊 Data Sources

The visualization uses:
- Kenya county boundary GeoJSON data
- Mau Forest Complex coordinates and area data
- ASAL classification data from Kenya's climate zones

## 🎨 Customization

### Updating Mau Forest Data

Edit `public/data/mau_forest.json` to update:
- Forest boundaries (coordinates)
- Area measurements
- County information

### Updating ASAL Data

Edit `public/data/asal_areas.json` to:
- Add/remove counties
- Update classifications
- Modify area measurements

### Styling

- Main colors and theme: `app/globals.css`
- Component styles: Inline Tailwind classes in components

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 📝 Key Insights

### Mau Forest Complex
- Critical water catchment area
- Supports over 400,000 hectares of biodiversity
- Feeds major rivers: Mara, Sondu, Ewaso Ngiro
- Spans 4 counties

### ASAL Areas
- 23 counties classified as ASAL (9 Arid + 14 Semi-Arid)
- Cover ~80-89% of Kenya's land mass
- Home to 36-38% of Kenya's population
- Support 70% of national livestock
- Face challenges: water scarcity, drought, food insecurity

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 📧 Contact

For questions or feedback about this visualization project, please open an issue in the repository.

---

Built with ❤️ for environmental and climate analysis in Kenya
