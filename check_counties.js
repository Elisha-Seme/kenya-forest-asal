const fs = require('fs');
const geojson = JSON.parse(fs.readFileSync('./public/data/kenya_counties.geojson', 'utf8'));
const asalData = require('./public/data/asal_areas.json');

const geoCounties = geojson.features.map(f => f.properties.COUNTY);
const asalCounties = asalData.features.map(f => f.properties.county);

console.log('ASAL counties PRESENT in GeoJSON:');
asalCounties.filter(c => geoCounties.includes(c)).forEach(c => console.log('  ✓', c));

console.log('\nASAL counties MISSING from GeoJSON:');
asalCounties.filter(c => !geoCounties.includes(c)).forEach(c => console.log('  ✗', c));

console.log('\nSummary:');
console.log('Total GeoJSON counties:', geoCounties.length);
console.log('Total ASAL counties:', asalCounties.length);
console.log('ASAL counties showing on map:', asalCounties.filter(c => geoCounties.includes(c)).length);
console.log('ASAL counties NOT showing:', asalCounties.filter(c => !geoCounties.includes(c)).length);
