import React from 'react';
import { Polygon } from 'react-leaflet';
import type { AnalysisResults } from '../../types';

interface AnalysisOverlayProps {
  analysisResults: AnalysisResults | null;
}

export const AnalysisOverlay: React.FC<AnalysisOverlayProps> = ({
  analysisResults,
}) => {
  if (!analysisResults) return null;

  return (
    <Polygon
      positions={analysisResults.boundary}
      color="red"
      fillColor="red"
      fillOpacity={0.2}
      weight={3}
    />
  );
};
