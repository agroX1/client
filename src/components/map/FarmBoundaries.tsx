import React from 'react';
import { Polygon } from 'react-leaflet';
import type { LatLng } from 'leaflet';

interface FarmBoundariesProps {
  farmBoundaries: LatLng[][];
  drawnPolygons: LatLng[][];
}

export const FarmBoundaries: React.FC<FarmBoundariesProps> = ({
  farmBoundaries,
  drawnPolygons,
}) => {
  return (
    <>
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
    </>
  );
};
