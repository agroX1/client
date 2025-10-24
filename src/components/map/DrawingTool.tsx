import React from 'react';
import { useMapEvents } from 'react-leaflet';
import type { DrawingToolProps } from '../../types';

export const DrawingTool: React.FC<DrawingToolProps> = ({
  onPolygonComplete,
  isDrawing,
  setIsDrawing,
  currentPoints,
  setCurrentPoints,
}) => {
  useMapEvents({
    click: (e) => {
      if (!isDrawing || !setCurrentPoints) return;
      
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
    dblclick: (e) => {
      if (!isDrawing || currentPoints.length < 3 || !setCurrentPoints) return;
      
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
