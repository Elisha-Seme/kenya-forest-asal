# Quick Start Guide

## 🚀 Running the Application

The development server is currently running at:
- **Local**: http://localhost:3000
- **Network**: http://192.168.56.1:3000

## 📋 What You'll See

### Page 1: Mau Forest Complex
The first map shows:
- **Green shaded area**: The Mau Forest Complex
- **Gray borders**: Counties where the forest is located (Nakuru, Kericho, Narok, Bomet)
- **Click on the forest**: See popup with details
- **Below the map**: Area measurements
  - 416,000 hectares
  - 1,027,954 acres

### Page 2: ASAL (Arid & Semi-Arid Lands)
The second map shows:
- **Red counties**: Arid areas (8 counties)
  - Turkana, Marsabit, Wajir, Mandera, Garissa, Isiolo, Samburu, Tana River
- **Orange counties**: Semi-Arid areas (11 counties)
  - Baringo, Laikipia, Kajiado, Narok, West Pokot, Kitui, Makueni, Taita Taveta, Kwale, Kilifi
- **Click on any colored county**: See detailed information
- **Legend**: Bottom right of the map
- **Below the map**: Statistics boxes showing total areas

## 🎯 Interactive Features

1. **Zoom In/Out**: Use mouse scroll or +/- buttons
2. **Pan**: Click and drag the map
3. **Click Regions**: Click on colored areas for details
4. **Hover**: See county names and information

## 🛠️ Development Commands

```bash
# Start development server (already running)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📁 Key Files to Modify

### Update Map Data
- `public/data/mau_forest.json` - Mau Forest coordinates and info
- `public/data/asal_areas.json` - ASAL counties classification
- `public/data/kenya_counties.geojson` - County boundaries (already included)

### Update Components
- `app/components/MauForestMap.tsx` - Mau Forest map component
- `app/components/ASALMap.tsx` - ASAL map component
- `app/page.tsx` - Main page layout

### Update Styles
- `app/globals.css` - Global styles
- Tailwind classes in components - Inline styling

## 🎨 Color Scheme

- **Mau Forest**: Green (#32CD32 fill, #228B22 border)
- **Arid Areas**: Red (#DC143C fill, #8B0000 border)
- **Semi-Arid Areas**: Orange (#FFA500 fill, #FF8C00 border)
- **Other Counties**: Light gray

## 📊 Data Accuracy

The coordinates and area measurements are approximate. For production use:
1. Update `mau_forest.json` with actual GPS coordinates
2. Update `asal_areas.json` with official county classifications
3. Verify area calculations with official sources

## 🔧 Troubleshooting

### Map not loading?
- Check browser console for errors
- Ensure you're connected to the internet (map tiles load from OpenStreetMap)
- Clear browser cache and refresh

### Blank page?
- Check that development server is running
- Ensure all dependencies are installed (`npm install`)
- Check for JavaScript errors in browser console

### Styling issues?
- Tailwind CSS should be working automatically
- If not, check `app/globals.css` imports

## 📱 Browser Compatibility

Tested and working on:
- Chrome/Edge (recommended)
- Firefox
- Safari

## 🌐 Next Steps

1. **Customize Data**: Update JSON files with accurate coordinates
2. **Add More Features**:
   - Export map as image
   - Print functionality
   - Download data as PDF
3. **Deploy**: Deploy to Vercel or your preferred hosting
4. **Share**: Share the URL with stakeholders

---

Need help? Check the main README.md or open an issue.
