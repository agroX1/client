# AgroX Farm Mapping System

An interactive web interface that allows farmers and agricultural groups to register, map, and analyze their farmlands using drawing tools or manual coordinate entry.

## Features

### 🗺️ Interactive Map Interface
- **Leaflet.js Integration**: High-performance mapping with multiple tile layers
- **Ghana-Centered View**: Default view centered on Ghana (7.9465°N, -1.0232°W)
- **Layer Switching**: Toggle between street view and satellite imagery
- **Zoom & Pan**: Full map navigation capabilities

### ✏️ Drawing Tools
- **Polygon Drawing**: Click-to-draw farm boundary tool
- **Area Calculation**: Automatic area calculation in hectares
- **Visual Feedback**: Real-time polygon rendering with color coding
- **Edit & Delete**: Modify or remove drawn boundaries

### 📍 Manual Coordinate Entry
- **Form-Based Input**: Enter latitude and longitude coordinates manually
- **File Upload Support**: Import coordinates from CSV, JSON, or GeoJSON files
- **Validation**: Real-time coordinate validation with error messages
- **Template Download**: Get sample CSV template for coordinate formatting

### 📊 Farm Analysis
- **Comprehensive Analysis**: NDVI, soil type, moisture, and vegetation health
- **Crop Recommendations**: AI-powered crop suggestions based on analysis
- **Results Visualization**: Overlay analysis results on the map
- **Export Options**: Download analysis results as JSON

### 🎨 User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Intuitive Navigation**: Tab-based interface for easy workflow
- **Tooltips & Help**: Contextual guidance throughout the application
- **Reset Functionality**: Clear all data and start fresh

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd agroX/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## Usage Guide

### 1. Drawing Farm Boundaries
1. Click the **"Draw Farm Boundary"** button
2. Click on the map to add points to your polygon
3. Click near the first point to complete the boundary
4. View the calculated area in the sidebar

### 2. Manual Coordinate Entry
1. Switch to the **"Coordinates"** tab
2. Enter latitude and longitude values manually
3. Or upload a CSV/JSON/GeoJSON file with coordinates
4. Click **"Plot Coordinates on Map"** to visualize

### 3. Running Analysis
1. Switch to the **"Analysis"** tab
2. Click **"Run Analysis"** to process your farm data
3. View results including:
   - Vegetation Index (NDVI)
   - Soil type and moisture
   - Recommended crops
   - Vegetation health assessment

### 4. File Format Examples

#### CSV Format
```csv
lat,lng
7.9465,-1.0232
7.9500,-1.0200
7.9400,-1.0200
7.9400,-1.0300
```

#### JSON Format
```json
[
  {"lat": 7.9465, "lng": -1.0232},
  {"lat": 7.9500, "lng": -1.0200},
  {"lat": 7.9400, "lng": -1.0200},
  {"lat": 7.9400, "lng": -1.0300}
]
```

#### GeoJSON Format
```json
{
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [[
      [-1.0232, 7.9465],
      [-1.0200, 7.9500],
      [-1.0200, 7.9400],
      [-1.0300, 7.9400],
      [-1.0232, 7.9465]
    ]]
  }
}
```

## API Integration

The application is designed to integrate with a backend API for real farm analysis. Update the API endpoint in `AnalysisSubmission.tsx`:

```typescript
const response = await fetch('/api/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    farmBoundary: geoJSON,
    analysisType: 'comprehensive'
  })
});
```

## Technology Stack

- **Frontend**: React 19, TypeScript
- **Mapping**: Leaflet.js, React-Leaflet
- **Styling**: Tailwind CSS
- **File Processing**: Papa Parse (CSV)
- **Icons**: Lucide React
- **Build Tool**: Vite

## Project Structure

```
client/src/
├── components/
│   ├── Map.tsx                 # Main map component with drawing tools
│   ├── CoordinateInput.tsx     # Manual coordinate entry form
│   └── AnalysisSubmission.tsx # Analysis submission and results
├── App.tsx                     # Main application component
├── App.css                     # Custom styles
└── main.tsx                    # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.

---

**AgroX Farm Mapping System** - Empowering farmers with data-driven agricultural insights.