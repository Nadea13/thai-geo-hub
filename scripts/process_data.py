import csv
import json
import os

input_file = r'D:\OpenHands\thailand_geography.csv'
output_dir = r'D:\Work\thai-geo-hub\src\data'

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

data = []
hierarchy = {}

with open(input_file, mode='r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        # Standard flat list
        item = {
            'province': row['province'],
            'district': row['district'],
            'subdistrict': row['subdistrict'],
            'zipcode': row['zipcode'],
            'lat': float(row['latitude']) if row['latitude'] and row['latitude'] != 'null' else None,
            'lng': float(row['longitude']) if row['longitude'] and row['longitude'] != 'null' else None
        }
        data.append(item)
        
        # Hierarchical structure
        p = row['province']
        d = row['district']
        s = row['subdistrict']
        
        if p not in hierarchy:
            hierarchy[p] = {'districts': {}}
        
        if d not in hierarchy[p]['districts']:
            hierarchy[p]['districts'][d] = []
            
        hierarchy[p]['districts'][d].append({
            'subdistrict': s,
            'zipcode': row['zipcode'],
            'lat': item['lat'],
            'lng': item['lng']
        })

with open(os.path.join(output_dir, 'geo-data.json'), 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

with open(os.path.join(output_dir, 'geo-hierarchy.json'), 'w', encoding='utf-8') as f:
    json.dump(hierarchy, f, ensure_ascii=False, indent=2)

print("Data processing complete.")
