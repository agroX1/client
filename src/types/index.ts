// Types for the AgroX Farm Mapping application

export interface LatLng {
  lat: number;
  lng: number;
}

export interface CoordinatePoint {
  id: string;
  lat: number;
  lng: number;
}

export interface AnalysisResults {
  boundary: LatLng[];
  ndvi: number;
  soilType: string;
  soilMoisture: number;
  recommendedCrops: string[];
  vegetationHealth: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  analysisDate: string;
}

export interface FarmBoundary {
  id: string;
  coordinates: LatLng[];
  area: number; // in hectares
  createdAt: string;
}

export interface MapProps {
  onPolygonComplete?: (coordinates: import('leaflet').LatLng[], area: number) => void;
  onReset?: () => void;
  farmBoundaries?: import('leaflet').LatLng[][];
  analysisResults?: AnalysisResults | null;
  isDrawing?: boolean;
  onToggleDrawing?: () => void;
  currentDrawingPoints?: import('leaflet').LatLng[];
  setCurrentDrawingPoints?: (points: import('leaflet').LatLng[]) => void;
  drawnPolygons?: import('leaflet').LatLng[][];
}

export interface DrawingToolProps {
  onPolygonComplete: (coordinates: import('leaflet').LatLng[], area: number) => void;
  isDrawing: boolean;
  setIsDrawing: (drawing: boolean) => void;
  currentPoints: import('leaflet').LatLng[];
  setCurrentPoints: (points: import('leaflet').LatLng[]) => void;
}

export interface CoordinateInputProps {
  onCoordinatesSubmit: (coordinates: LatLng[]) => void;
  onFileUpload: (coordinates: LatLng[]) => void;
  initialCoordinates?: LatLng[] | null;
}

export interface AnalysisSubmissionProps {
  farmBoundaries: LatLng[][];
  onAnalysisComplete: (results: AnalysisResults) => void;
}

export type ActiveTab = 'map' | 'coordinates' | 'analysis' | 'multispectral' | 'detection' | 'reports' | 'weather' | 'market';

export interface AppState {
  farmBoundaries: LatLng[][];
  analysisResults: AnalysisResults | null;
  activeTab: ActiveTab;
  lastDrawnCoordinates: LatLng[] | null;
  isDrawing: boolean;
}
