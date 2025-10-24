import React, { useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import components
import { DrawingTool } from './DrawingTool';
import { DrawingVisualization } from './DrawingVisualization';
import { FarmBoundaries } from './FarmBoundaries';
import { AnalysisOverlay } from './AnalysisOverlay';

// Import types
import type { MapProps } from '../../types';

// Fix for default markers in React Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export const Map: React.FC<MapProps> = ({
  onPolygonComplete,
  onReset,
  farmBoundaries = [],
  analysisResults,
  isDrawing = false,
  onToggleDrawing,
  currentDrawingPoints = [],
  setCurrentDrawingPoints,
  drawnPolygons = [],
}) => {
  const mapRef = useRef<L.Map>(null);

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[7.9465, -1.0232]} // Ghana coordinates
        zoom={8}
        className={`h-full w-full ${isDrawing ? 'drawing-cursor' : ''}`}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Satellite layer option */}
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          opacity={0}
          id="satellite"
        />

        {/* Drawing functionality */}
        {onPolygonComplete && onToggleDrawing && setCurrentDrawingPoints && (
          <DrawingTool
            onPolygonComplete={onPolygonComplete}
            isDrawing={isDrawing}
            setIsDrawing={onToggleDrawing}
            currentPoints={currentDrawingPoints}
            setCurrentPoints={setCurrentDrawingPoints}
          />
        )}

        {/* Drawing visualization */}
        <DrawingVisualization
          isDrawing={isDrawing}
          currentPoints={currentDrawingPoints}
        />

        {/* Map overlays */}
        <FarmBoundaries
          farmBoundaries={farmBoundaries}
          drawnPolygons={drawnPolygons}
        />

        <AnalysisOverlay analysisResults={analysisResults || null} />
      </MapContainer>
    </div>
  );
};
