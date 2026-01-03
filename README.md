# Mumbra Cleanliness Tracker (Prototype) 🗺️🚮

An area-based geospatial monitoring tool designed to visualize hygiene and waste management levels in Mumbra, Maharashtra.

## Key Features
- **Geofenced Experience:** The map is strictly locked to Mumbra boundaries using `maxBounds`.
- **Area-Based (Choropleth) Mapping:** Unlike point-markers, this tool uses colored polygons to represent neighborhood cleanliness.
- **Weighted Scoring Algorithm:** Scores are calculated based on multiple environmental factors.
- **Interactive Dashboard:** Includes a search-to-fly feature and a real-time analytics sidebar.
- **Data Export:** Generate instant CSV reports for city officials.

## The Mathematics
The Cleanliness Index ($CI$) is calculated using a **Weighted Linear Combination (WLC)**:

$$CI = (L \cdot 0.2) + (O \cdot 0.4) + (S \cdot 0.3) + (C \cdot 0.1)$$

Where:
- $L$: Visual Litter (20% weight)
- $O$: Bin Overflow (40% weight)
- $S$: Biological Odor/Stagnancy (30% weight)
- $C$: Active Complaints (10% weight)

**Color Mapping:**
- 🟢 **Healthy:** Score 0.0 - 4.0
- 🟡 **Warning:** Score 4.1 - 7.0
- 🔴 **Critical:** Score 7.1 - 10.0

## 🛠️ Tech Stack
- **Frontend:** React.js (Vite)
- **Mapping Engine:** Leaflet & React-Leaflet
- **Styling:** CSS3 & Tailwind CSS
- **Data Format:** GeoJSON