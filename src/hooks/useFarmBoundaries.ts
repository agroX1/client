import { useState, useCallback } from 'react';
import type { LatLng } from 'leaflet';

export const useFarmBoundaries = () => {
  const [farmBoundaries, setFarmBoundaries] = useState<LatLng[][]>([]);
  const [drawnPolygons, setDrawnPolygons] = useState<LatLng[][]>([]);
  const [currentDrawingPoints, setCurrentDrawingPoints] = useState<LatLng[]>([]);

  const addFarmBoundary = useCallback((coordinates: LatLng[], area: number) => {
    setDrawnPolygons(prev => [...prev, coordinates]);
    setFarmBoundaries(prev => [...prev, coordinates]);
    setCurrentDrawingPoints([]);
  }, []);

  const resetBoundaries = useCallback(() => {
    setFarmBoundaries([]);
    setDrawnPolygons([]);
    setCurrentDrawingPoints([]);
  }, []);

  const calculatePolygonArea = useCallback((coordinates: LatLng[]): number => {
    if (coordinates.length < 3) return 0;
    let area = 0;
    for (let i = 0; i < coordinates.length; i++) {
      const j = (i + 1) % coordinates.length;
      area += coordinates[i].lng * coordinates[j].lat;
      area -= coordinates[j].lng * coordinates[i].lat;
    }
    return Math.abs(area) / 2 / 10000; // Convert to hectares
  }, []);

  return {
    farmBoundaries,
    drawnPolygons,
    currentDrawingPoints,
    setCurrentDrawingPoints,
    addFarmBoundary,
    resetBoundaries,
    calculatePolygonArea,
  };
};
