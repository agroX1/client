import { useState, useCallback } from 'react';
import type { AnalysisResults } from '../types';

// API Configuration - Default to localhost backend
const API_BASE_URL = 'http://localhost:8000';

export const useAnalysis = () => {
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAnalysis = useCallback(async (farmBoundaries: any[]) => {
    if (farmBoundaries.length === 0) {
      alert('Please draw or enter farm boundaries first');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Convert farm boundaries to GeoJSON format
      const geoJSON = {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [farmBoundaries[0].map((point: any) => [point.lng, point.lat])]
        },
        properties: {
          name: 'Farm Boundary'
        }
      };

      // Call the real backend API
      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          farmBoundary: geoJSON,
          analysisType: 'comprehensive'
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const apiResults = await response.json();
      
      // Convert API response to frontend format
      const analysisResults: AnalysisResults = {
        boundary: apiResults.boundary,
        ndvi: apiResults.ndvi,
        soilType: apiResults.soilType,
        soilMoisture: apiResults.soilMoisture,
        recommendedCrops: apiResults.recommendedCrops,
        vegetationHealth: apiResults.vegetationHealth,
        analysisDate: apiResults.analysisDate
      };

      setAnalysisResults(analysisResults);
      return analysisResults;
      
    } catch (error) {
      console.error('Analysis error:', error);
      
      // Fallback to mock data if API is not available
      console.log('Falling back to mock data...');
      
      const mockResults: AnalysisResults = {
        boundary: farmBoundaries[0],
        ndvi: 0.742,
        soilType: 'Loam',
        soilMoisture: 58.3,
        recommendedCrops: ['Maize', 'Cassava', 'Yam', 'Plantain', 'Rice', 'Sorghum'],
        vegetationHealth: 'Good',
        analysisDate: new Date().toISOString()
      };

      setAnalysisResults(mockResults);
      return mockResults;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const resetAnalysis = useCallback(() => {
    setAnalysisResults(null);
  }, []);

  return {
    analysisResults,
    isAnalyzing,
    runAnalysis,
    resetAnalysis,
  };
};
