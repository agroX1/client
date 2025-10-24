import React, { useState } from 'react';
import { LatLng } from 'leaflet';
import { Play, Download, BarChart3, Leaf, Droplets, Sun } from 'lucide-react';

interface AnalysisSubmissionProps {
  farmBoundaries: LatLng[][];
  onAnalysisComplete: (results: AnalysisResults) => void;
}

interface AnalysisResults {
  boundary: LatLng[];
  ndvi: number;
  soilType: string;
  soilMoisture: number;
  recommendedCrops: string[];
  vegetationHealth: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  analysisDate: string;
}

const AnalysisSubmission: React.FC<AnalysisSubmissionProps> = ({ farmBoundaries, onAnalysisComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);

  const convertToGeoJSON = (boundaries: LatLng[][]): any => {
    if (boundaries.length === 0) return null;
    
    // For now, we'll use the first boundary
    const coordinates = boundaries[0].map(latlng => [latlng.lng, latlng.lat]);
    coordinates.push(coordinates[0]); // Close the polygon
    
    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [coordinates]
      },
      properties: {
        name: 'Farm Boundary',
        area: calculateArea(boundaries[0])
      }
    };
  };

  const calculateArea = (coordinates: LatLng[]): number => {
    if (coordinates.length < 3) return 0;
    
    let area = 0;
    for (let i = 0; i < coordinates.length; i++) {
      const j = (i + 1) % coordinates.length;
      area += coordinates[i].lng * coordinates[j].lat;
      area -= coordinates[j].lng * coordinates[i].lat;
    }
    return Math.abs(area) / 2 / 10000; // Convert to hectares
  };

  const runAnalysis = async () => {
    if (farmBoundaries.length === 0) {
      alert('Please draw or enter farm boundaries first');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const geoJSON = convertToGeoJSON(farmBoundaries);
      
      // Simulate API call - replace with actual backend endpoint
      const response = await fetch('/api/analyze', {
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
        throw new Error('Analysis failed');
      }

      // For demo purposes, we'll simulate results
      // In production, this would come from the API response
      const mockResults: AnalysisResults = {
        boundary: farmBoundaries[0],
        ndvi: 0.65 + Math.random() * 0.3, // Simulate NDVI between 0.65-0.95
        soilType: ['Clay', 'Sandy Loam', 'Loam', 'Silt'][Math.floor(Math.random() * 4)],
        soilMoisture: 45 + Math.random() * 30, // Simulate moisture 45-75%
        recommendedCrops: ['Maize', 'Cassava', 'Yam', 'Plantain'],
        vegetationHealth: ['Poor', 'Fair', 'Good', 'Excellent'][Math.floor(Math.random() * 4)] as any,
        analysisDate: new Date().toISOString()
      };

      setAnalysisResults(mockResults);
      onAnalysisComplete(mockResults);
      
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadResults = () => {
    if (!analysisResults) return;

    const data = {
      ...analysisResults,
      boundary: analysisResults.boundary.map(latlng => ({
        lat: latlng.lat,
        lng: latlng.lng
      }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `farm_analysis_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getVegetationColor = (health: string) => {
    switch (health) {
      case 'Poor': return 'text-red-600 bg-red-50';
      case 'Fair': return 'text-yellow-600 bg-yellow-50';
      case 'Good': return 'text-green-600 bg-green-50';
      case 'Excellent': return 'text-emerald-600 bg-emerald-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getNDVIColor = (ndvi: number) => {
    if (ndvi < 0.3) return 'text-red-600';
    if (ndvi < 0.5) return 'text-yellow-600';
    if (ndvi < 0.7) return 'text-green-600';
    return 'text-emerald-600';
  };

  return (
    <div className="space-y-6">
      {/* Analysis Submission */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">Farm Analysis</h2>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 mb-2">
            Farm boundaries: {farmBoundaries.length} area(s) defined
          </p>
          {farmBoundaries.length > 0 && (
            <p className="text-sm text-gray-500">
              Total area: {farmBoundaries.reduce((sum, boundary) => sum + calculateArea(boundary), 0).toFixed(2)} hectares
            </p>
          )}
        </div>

        <button
          onClick={runAnalysis}
          disabled={isAnalyzing || farmBoundaries.length === 0}
          className={`w-full px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            isAnalyzing || farmBoundaries.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Analyzing Farm...
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Run Analysis
            </>
          )}
        </button>
      </div>

      {/* Analysis Results */}
      {analysisResults && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              <h2 className="text-xl font-semibold text-gray-800">Analysis Results</h2>
            </div>
            <button
              onClick={downloadResults}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vegetation Index */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="h-4 w-4 text-green-500" />
                <h3 className="font-medium text-gray-800">Vegetation Index (NDVI)</h3>
              </div>
              <div className={`text-2xl font-bold ${getNDVIColor(analysisResults.ndvi)}`}>
                {analysisResults.ndvi.toFixed(3)}
              </div>
              <p className="text-sm text-gray-600">
                {analysisResults.ndvi > 0.7 ? 'High vegetation density' : 
                 analysisResults.ndvi > 0.5 ? 'Moderate vegetation' : 'Low vegetation'}
              </p>
            </div>

            {/* Soil Information */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <h3 className="font-medium text-gray-800">Soil Information</h3>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-600">Type: </span>
                  <span className="font-medium">{analysisResults.soilType}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Moisture: </span>
                  <span className="font-medium">{analysisResults.soilMoisture.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* Vegetation Health */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sun className="h-4 w-4 text-yellow-500" />
                <h3 className="font-medium text-gray-800">Vegetation Health</h3>
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getVegetationColor(analysisResults.vegetationHealth)}`}>
                {analysisResults.vegetationHealth}
              </div>
            </div>

            {/* Recommended Crops */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Recommended Crops</h3>
              <div className="flex flex-wrap gap-2">
                {analysisResults.recommendedCrops.map((crop, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                  >
                    {crop}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Analysis completed on: {new Date(analysisResults.analysisDate).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisSubmission;
