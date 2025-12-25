SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

Clean Area Detection & Garbage Reporting System
1. Introduction
1.1 Purpose

The purpose of this document is to define the functional and non-functional requirements of the Clean Area Detection & Garbage Reporting System, a web-based application that allows users to view cleanliness levels of nearby areas and report garbage in real time using interactive maps.

This SRS serves as a reference for developers, evaluators, and faculty members to understand the system’s design, scope, and behavior.

1.2 Scope

The system provides:

A map-based visualization of cleanliness levels (clean, moderate, dirty)

Real-time garbage reporting using live location or manual selection

Data-driven overlays based on garbage density

A scalable MERN stack architecture using open-source mapping tools

The project is designed for college-level implementation, with scope for future expansion into smart city and municipal use cases.

1.3 Definitions, Acronyms & Abbreviations
Term	Description
MERN	MongoDB, Express, React, Node.js
GPS	Global Positioning System
API	Application Programming Interface
UI	User Interface
UX	User Experience
OSM	OpenStreetMap
2. Overall Description
2.1 Product Perspective

This system is a standalone web application developed using the MERN stack.
It integrates open-source maps (OpenStreetMap with Leaflet.js) to display geographical cleanliness data.

The application can later be extended for:

Municipal corporation dashboards

AI-based waste detection

Smart city monitoring systems

2.2 Product Functions

Display interactive maps with cleanliness overlays

Detect user’s live location (with permission)

Allow garbage reporting via:

Live GPS location

Manual map selection or address search

Store and analyze garbage reports

Visually classify areas as clean, moderate, or dirty

2.3 User Classes and Characteristics
User Type	Description
General User	Any citizen reporting garbage or viewing cleanliness
Admin (Future Scope)	Municipal authority reviewing reports

Users are assumed to have basic smartphone or web literacy.

2.4 Operating Environment

Web Browser (Chrome, Firefox, Edge)

Mobile & Desktop devices

Internet connection required

Server hosted on cloud/local deployment

2.5 Design and Implementation Constraints

No paid APIs (Google Maps not allowed)

Only open-source or free-tier services

Privacy-friendly (no mandatory login)

Real-time GPS access depends on browser permissions

3. System Requirements
3.1 Functional Requirements
FR1: Map Visualization

The system shall display an interactive map using OpenStreetMap.

The map shall auto-focus on the user’s current location (if permitted).

FR2: Cleanliness Overlay

The system shall display colored overlays:

Green – Clean area

Yellow – Moderately clean

Red – Garbage-prone

Overlay color shall be based on garbage report density and severity.

FR3: Live Location Garbage Reporting

The user shall be able to report garbage using current GPS location.

The system shall allow users to submit:

Garbage type

Severity level

Optional description

Timestamp (auto-generated)

FR4: Manual Location Garbage Reporting

The user shall be able to:

Click on the map to select a location OR

Enter a location name/address

The system shall resolve the location into latitude and longitude.

FR5: Data Storage

The system shall store all garbage reports in MongoDB.

Each report shall include:

Latitude

Longitude

Garbage type

Severity

Description

Timestamp

FR6: Cleanliness Score Calculation

The backend shall compute a cleanliness score using:

Number of reports

Severity level

Time of report

The score shall determine overlay color.

FR7: Real-Time Updates

The map shall update overlays dynamically when new reports are added.

3.2 Non-Functional Requirements
NFR1: Performance

Map loading time should be under 3 seconds.

API responses should be optimized using location-based queries.

NFR2: Scalability

The system architecture shall support future features like:

Admin dashboards

Heatmaps

AI-based detection

NFR3: Usability

The interface shall be simple and intuitive.

The system shall be mobile-friendly.

NFR4: Reliability

Data should not be lost in case of page refresh.

Backend should handle invalid or incomplete inputs safely.

NFR5: Security

Input validation shall be implemented.

No sensitive user data is mandatory.

NFR6: Maintainability

Clean folder structure

Proper comments

Modular code design

4. System Architecture
4.1 Architecture Overview

Frontend: React (Map UI, forms, overlays)

Backend: Node.js + Express (API, logic)

Database: MongoDB (garbage reports)

Maps: OpenStreetMap + Leaflet.js

4.2 Data Flow

User opens map

Frontend requests garbage data from backend

Backend fetches data from MongoDB

Cleanliness score calculated

Map overlays rendered

User submits garbage report

Backend stores and updates map data

5. Database Design
GarbageReport Schema
GarbageReport
- latitude: Number
- longitude: Number
- garbage_type: String
- severity: String (Low / Medium / High)
- description: String
- timestamp: Date

6. API Design
POST /report-garbage

Description: Stores a new garbage report

Input: JSON object with location and garbage details

Output: Success message

GET /garbage-reports

Description: Fetch reports for a map region

Parameters: Bounding box or radius

Output: List of garbage reports

7. Future Enhancements

Heatmap visualization

AI-based image garbage detection

Reward points for users

Admin verification dashboard

Smart city integration

8. Conclusion

The Clean Area Detection & Garbage Reporting System is a practical, socially impactful, and scalable MERN stack project.
It demonstrates real-world problem-solving using open-source technologies and serves as a strong foundation for future smart-city applications.