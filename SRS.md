Project: Mumbra Cleanliness Tracker (Garbage Map)
1. Introduction
The Mumbra Cleanliness Tracker is a specialized geospatial prototype designed to visualize hygiene levels across Mumbra, Maharashtra. The goal is to move beyond simple point-markers to a comprehensive area-based (choropleth) map that highlights sanitary conditions using a color-coded gradient.

2. Objectives
Provide a macro-view of cleanliness in Mumbra.

Restrict user navigation to city boundaries to maintain focus.

Quantify "cleanliness" using a weighted mathematical model.

3. System Architecture
The system follows a simple client-side architecture for the prototype phase:

UI Layer: React.js for the interface.

Map Engine: Leaflet.js / React-Leaflet.

Data Layer: GeoJSON for neighborhood boundaries and JSON for health metrics.

4. Functional Requirements

4.1.  Map Navigation & Constraints 

ID       Requirement              Specification
FR-1.1    Geofencing             Map must use maxBounds to prevent panning outside Mumbra.
FR-1.2    Zoom Lock              Minimum and Maximum zoom levels must be set (approx. 14–16).
FR-1.3    Center Focus           Default load state must center on Mumbra Station area.

4.2 Area Visualization
ID       Requirement              Specification
FR-2.1   Polygonal Sectors       The city must be divided into sectors (e.g., Kausa, Station, Amrut Nagar) via GeoJSON.FR-2.2   Choropleth Mapping      Area fill color must change dynamically based on the Cleanliness Score.
FR-2.3   Color Legend            Dark Green (Clean) $\to$ Yellow (Warning) $\to$ Dark Red (Dirty).

ID,      Requirement,             Specification
FR-3.1   Scoring Engine          Calculate scores using weighted variables: Overflow, Litter, and Odor.
FR-3.2   Informational Popups    Clicking a sector must reveal the raw data contributing to the score.

5. Mathematical Model (Scoring Logic)
To determine the color of an area, the Cleanliness Index (CI) is calculated using a Weighted Linear Combination:
CI = (v * 0.2) + (o * 0.4) + (s * 0.3) + (f * 0.1)
Where: 
v = Visual Litter (Scale 0-10)
o = Bin Overflow (Scale 0-10)
s = Stagnancy/Smell (Scale 0-10)
f = Frequency of Complaints (Scale 0-10)

6. Technical Stack
Framework: React (Vite)
Mapping: Leaflet & React-Leaflet
Data: GeoJSON (Standard for geographic shapes)
Styling: CSS Modules / Tailwind CSS

7. Implementation Schedule (1-Week Sprint)
Day 1: Environment Setup & Map Initialization (Mumbra Center).
Day 2: GeoJSON implementation for Mumbra Sectors.
Day 3: Integration of the Weighted Scoring Logic.
Day 4: Dynamic Styling (Choropleth Red-to-Green logic).
Day 5: UI Components (Popups, Overlays, and Header).
Day 6: Mock Data binding and Backend simulation.
Day 7: Testing, UI Polish, and Documentation.