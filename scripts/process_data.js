const fs = require('fs');
const path = require('path');

const inputFile = 'D:/OpenHands/thailand_geography.csv';
const outputDir = 'D:/Work/thai-geo-hub/src/data';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const content = fs.readFileSync(inputFile, 'utf-8');
const lines = content.split('\n');
const headers = lines[0].split(',');

const data = [];
const hierarchy = {};

for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const values = line.split(',');
    const row = {};
    headers.forEach((header, index) => {
        row[header.trim()] = values[index] ? values[index].trim() : '';
    });

    const item = {
        province: row['province'],
        district: row['district'],
        subdistrict: row['subdistrict'],
        zipcode: row['zipcode'],
        lat: (row['latitude'] && row['latitude'] !== 'null') ? parseFloat(row['latitude']) : null,
        lng: (row['longitude'] && row['longitude'] !== 'null') ? parseFloat(row['longitude']) : null
    };
    data.append ? null : data.push(item);
    
    const p = row['province'];
    const d = row['district'];
    const s = row['subdistrict'];
    
    if (!hierarchy[p]) {
        hierarchy[p] = { districts: {} };
    }
    
    if (!hierarchy[p].districts[d]) {
        hierarchy[p].districts[d] = [];
    }
    
    hierarchy[p].districts[d].push({
        subdistrict: s,
        zipcode: row['zipcode'],
        lat: item.lat,
        lng: item.lng
    });
}

fs.writeFileSync(path.join(outputDir, 'geo-data.json'), JSON.stringify(data, null, 2));
fs.writeFileSync(path.join(outputDir, 'geo-hierarchy.json'), JSON.stringify(hierarchy, null, 2));

console.log("Data processing complete.");
