// Types for the AgroX Dashboard application

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

export type ActiveTab = 'dashboard' | 'analytics';

export interface AppState {
  activeTab: ActiveTab;
}
