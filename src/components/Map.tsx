import React, { useState, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Polygon, useMapEvents, Marker, Polyline } from 'react-leaflet';
import { LatLng } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

interface MapProps {
  onPolygonComplete?: (coordinates: LatLng[], area: number) => void;
  onReset?: () => void;
  farmBoundaries?: LatLng[][];
  analysisResults?: any;
  isDrawing?: boolean;
  onToggleDrawing?: () => void;
}

interface DrawingToolProps {
  onPolygonComplete: (coordinates: LatLng[], area: number) => void;
  isDrawing: boolean;
  setIsDrawing: (drawing: boolean) => void;
  currentPoints: LatLng[];
  setCurrentPoints: (points: LatLng[]) => void;
}

const DrawingTool: React.FC<DrawingToolProps> = ({ onPolygonComplete, isDrawing, setIsDrawing, currentPoints, setCurrentPoints }) => {
  useMapEvents({
    click: (e: any) => {
      if (!isDrawing) return;
      
      const newPoint = e.latlng;
      const newPoints = [...currentPoints, newPoint];
      setCurrentPoints(newPoints);
      
      // Complete polygon if we have at least 3 points and user clicks near the first point
      if (newPoints.length >= 3) {
        const firstPoint = newPoints[0];
        const distance = newPoint.distanceTo(firstPoint);
        if (distance < 100) { // Within ~100 meters (increased tolerance)
          // Calculate area using shoelace formula
          let area = 0;
          for (let i = 0; i < newPoints.length; i++) {
            const j = (i + 1) % newPoints.length;
            area += newPoints[i].lng * newPoints[j].lat;
            area -= newPoints[j].lng * newPoints[i].lat;
          }
          const areaHectares = Math.abs(area) / 2 / 10000; // Convert to hectares
          onPolygonComplete(newPoints, areaHectares);
          setIsDrawing(false);
        }
      }
    },
    dblclick: (e: any) => {
      if (!isDrawing || currentPoints.length < 3) return;
      
      // Complete polygon on double-click
      const newPoints = [...currentPoints, e.latlng];
      let area = 0;
      for (let i = 0; i < newPoints.length; i++) {
        const j = (i + 1) % newPoints.length;
        area += newPoints[i].lng * newPoints[j].lat;
        area -= newPoints[j].lng * newPoints[i].lat;
      }
      const areaHectares = Math.abs(area) / 2 / 10000;
      onPolygonComplete(newPoints, areaHectares);
      setIsDrawing(false);
    }
  });

  return null; // This component doesn't render anything visible
};

const Map: React.FC<MapProps> = ({ onPolygonComplete, farmBoundaries = [], analysisResults, isDrawing: externalIsDrawing, onToggleDrawing }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnPolygons, setDrawnPolygons] = useState<LatLng[][]>([]);
  const [currentDrawingPoints, setCurrentDrawingPoints] = useState<LatLng[]>([]);
  const mapRef = useRef<L.Map>(null);

  // Use external drawing state if provided, otherwise use internal state
  const drawingState = externalIsDrawing !== undefined ? externalIsDrawing : isDrawing;
  const setDrawingState = externalIsDrawing !== undefined ? (onToggleDrawing || (() => {})) : setIsDrawing;

  const handlePolygonComplete = useCallback((coordinates: LatLng[], area: number) => {
    setDrawnPolygons(prev => [...prev, coordinates]);
    setCurrentDrawingPoints([]);
    if (onPolygonComplete) {
      onPolygonComplete(coordinates, area);
    }
  }, [onPolygonComplete]);


  const calculatePolygonArea = (coordinates: LatLng[]): number => {
    if (coordinates.length < 3) return 0;
    let area = 0;
    for (let i = 0; i < coordinates.length; i++) {
      const j = (i + 1) % coordinates.length;
      area += coordinates[i].lng * coordinates[j].lat;
      area -= coordinates[j].lng * coordinates[i].lat;
    }
    return Math.abs(area) / 2 / 10000; // Convert to hectares
  };

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[7.9465, -1.0232]} // Ghana coordinates
        zoom={8}
        className={`h-full w-full ${drawingState ? 'drawing-cursor' : ''}`}
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

        <DrawingTool
          onPolygonComplete={handlePolygonComplete}
          isDrawing={drawingState}
          setIsDrawing={setDrawingState}
          currentPoints={currentDrawingPoints}
          setCurrentPoints={setCurrentDrawingPoints}
        />

        {/* Show current drawing points */}
        {drawingState && currentDrawingPoints.map((point, index) => (
          <Marker key={`drawing-${index}`} position={point} />
        ))}

        {/* Show current drawing line */}
        {drawingState && currentDrawingPoints.length > 1 && (
          <Polyline
            positions={currentDrawingPoints}
            color="red"
            weight={2}
            opacity={0.7}
          />
        )}

        {/* Render drawn polygons */}
        {drawnPolygons.map((polygon, index) => (
          <Polygon
            key={`drawn-${index}`}
            positions={polygon}
            color="blue"
            fillColor="lightblue"
            fillOpacity={0.3}
            weight={2}
          />
        ))}

        {/* Render farm boundaries */}
        {farmBoundaries.map((boundary, index) => (
          <Polygon
            key={`boundary-${index}`}
            positions={boundary}
            color="green"
            fillColor="lightgreen"
            fillOpacity={0.3}
            weight={2}
          />
        ))}

        {/* Render analysis results overlay */}
        {analysisResults && (
          <Polygon
            positions={analysisResults.boundary}
            color="red"
            fillColor="red"
            fillOpacity={0.2}
            weight={3}
          />
        )}
      </MapContainer>

      {/* Map Controls - Moved to page level */}

      {/* Drawing Instructions */}
      {drawingState && (
        <div className="absolute top-4 right-4 z-[1000] bg-white p-4 rounded-lg shadow-lg max-w-xs">
          <h3 className="font-semibold text-gray-800 mb-2">Drawing Instructions:</h3>
          <p className="text-sm text-gray-600">
            Click on the map to add points to your farm boundary. Click near the first point to complete the polygon.
          </p>
        </div>
      )}

      {/* Area Display */}
      {drawnPolygons.length > 0 && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Farm Areas:</h3>
          {drawnPolygons.map((polygon, index) => (
            <div key={index} className="text-sm text-gray-600">
              Area {index + 1}: {calculatePolygonArea(polygon).toFixed(2)} hectares
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Map;
