import React from 'react';
import { Marker, Polyline } from 'react-leaflet';
import type { LatLng } from 'leaflet';

interface DrawingVisualizationProps {
  isDrawing: boolean;
  currentPoints: LatLng[];
}

export const DrawingVisualization: React.FC<DrawingVisualizationProps> = ({
  isDrawing,
  currentPoints,
}) => {
  if (!isDrawing) return null;

  return (
    <>
      {/* Show current drawing points */}
      {currentPoints.map((point, index) => (
        <Marker key={`drawing-${index}`} position={point} />
      ))}

      {/* Show current drawing line */}
      {currentPoints.length > 1 && (
        <Polyline
          positions={currentPoints}
          color="red"
          weight={2}
          opacity={0.7}
        />
      )}
    </>
  );
};
