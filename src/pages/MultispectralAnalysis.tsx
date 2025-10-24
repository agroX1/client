import React from 'react';
import { Satellite } from 'lucide-react';
import { Map } from '../components/map/Map';
import CoordinateInput from '../components/CoordinateInput';
import { FarmSummary, QuickActions } from '../components/sidebar';
import { useFarmBoundaries } from '../hooks/useFarmBoundaries';
import { useAnalysis } from '../hooks/useAnalysis';
import type { LatLng } from 'leaflet';
import type { ActiveTab } from '../types';

const MultispectralAnalysisPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>('map');
  const [lastDrawnCoordinates, setLastDrawnCoordinates] = React.useState<LatLng[] | null>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);

  // Use custom hooks
  const {
    farmBoundaries,
    drawnPolygons,
    currentDrawingPoints,
    setCurrentDrawingPoints,
    addFarmBoundary,
    resetBoundaries,
    calculatePolygonArea
  } = useFarmBoundaries();

  const {
    analysisResults,
    isAnalyzing,
    runAnalysis
  } = useAnalysis();

  // Event handlers
  const handlePolygonComplete = (coordinates: LatLng[]) => {
    const area = calculatePolygonArea(coordinates);
    addFarmBoundary(coordinates, area);
    setLastDrawnCoordinates(coordinates);
    setIsDrawing(false);
  };

  const handleReset = () => {
    resetBoundaries();
    setLastDrawnCoordinates(null);
    setIsDrawing(false);
    setShowResults(false);
  };

  const toggleDrawing = () => {
    setIsDrawing(!isDrawing);
  };

  const handleAnalysisComplete = async () => {
    await runAnalysis(farmBoundaries);
    setShowResults(true);
  };

  const handleCoordinatesSubmit = (coordinates: LatLng[]) => {
    const area = calculatePolygonArea(coordinates);
    addFarmBoundary(coordinates, area);
    setLastDrawnCoordinates(coordinates);
    setActiveTab('map');
  };

  const handleFileUpload = (coordinates: LatLng[]) => {
    const area = calculatePolygonArea(coordinates);
    addFarmBoundary(coordinates, area);
    setLastDrawnCoordinates(coordinates);
    setActiveTab('map');
  };

  return (
    <div>
      {/* Page Header */}
      <div style={{ 
        padding: '2rem 0 1rem 0', 
        borderBottom: '1px solid var(--bg-tertiary)', 
        marginBottom: '2rem' 
      }}>
        
      </div>

      {/* Dashboard Layout */}
      <div className="dashboard-layout">
        {/* Sidebar */}
        <div className="dashboard-sidebar">
          {/* Main Content Area */}
          <div className="hide-scrollbar" style={{ flex: 1, overflow: 'auto', paddingRight: '0.5rem' }}>
            {/* Coordinate Input */}
            {activeTab === 'coordinates' && (
              <CoordinateInput
                onCoordinatesSubmit={handleCoordinatesSubmit}
                onFileUpload={handleFileUpload}
                initialCoordinates={lastDrawnCoordinates}
                onBackToMap={() => setActiveTab('map')}
              />
            )}

            {/* Map Controls */}
            {activeTab === 'map' && (
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <button
                  onClick={isDrawing ? handleReset : toggleDrawing}
                  className={isDrawing ? 'btn-danger' : 'btn-primary'}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.875rem' }}
                >
                  {isDrawing ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"/>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                      </svg>
                      Stop Drawing
                    </>
                  ) : (
                    'Draw Farm Boundary'
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('coordinates')}
                  style={{ 
                    flex: 1, 
                    padding: '0.75rem 1rem',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--bg-tertiary)',
                    borderRadius: '0.5rem',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)';
                    (e.target as HTMLElement).style.borderColor = 'var(--accent-green)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                    (e.target as HTMLElement).style.borderColor = 'var(--bg-tertiary)';
                  }}
                >
                  Coordinates
                </button>
              </div>
            )}

            {/* Analysis Button - Show when farm boundaries exist but no analysis yet */}
            {activeTab === 'map' && farmBoundaries.length > 0 && !analysisResults && (
              <div style={{ marginBottom: '1rem' }}>
                <button
                  onClick={handleAnalysisComplete}
                  className="btn-primary"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 12l2 2 4-4"/>
                        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.5 0 2.91.37 4.15 1.02"/>
                      </svg>
                      Run Analysis
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Results Toggle */}
            {activeTab === 'map' && analysisResults && (
              <div style={{ marginBottom: '1rem' }}>
                <button
                  onClick={() => setShowResults(!showResults)}
                  className={showResults ? 'btn-primary' : 'btn-secondary'}
                  style={{ width: '100%' }}
                >
                  {showResults ? 'Show Map' : 'Show Results'}
                </button>
              </div>
            )}

            {/* Farm Summary */}
            {activeTab === 'map' && (
              <FarmSummary
                farmBoundaries={farmBoundaries}
                analysisResults={analysisResults}
                calculatePolygonArea={calculatePolygonArea}
              />
            )}
          </div>

          {/* Fixed Bottom - Quick Actions */}
          <div style={{ flexShrink: 0, marginTop: '1rem' }}>
            <QuickActions
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onReset={handleReset}
              onRunAnalysis={handleAnalysisComplete}
              farmBoundaries={farmBoundaries}
              analysisResults={analysisResults}
            />
          </div>
        </div>

        {/* Map Section */}
        <div className="dashboard-map">
          <div className="card" style={{ height: '600px', overflow: 'hidden' }}>
            {showResults && analysisResults ? (
              <div style={{ padding: '1.5rem', height: '100%', overflow: 'auto' }}>
                {/* Analysis Results Display */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    Farm Analysis Report
                  </h2>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Generated: {new Date(analysisResults.analysisDate).toLocaleDateString()}
                  </div>
                </div>
                
                {/* Executive Summary */}
                <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.75rem', border: '1px solid var(--bg-tertiary)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem' }}>Executive Summary</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>
                    Based on satellite imagery analysis and soil composition data, your farm shows <strong style={{ color: 'var(--accent-green)' }}>{analysisResults.vegetationHealth.toLowerCase()}</strong> vegetation health 
                    with an NDVI score of <strong style={{ color: 'var(--accent-green)' }}>{analysisResults.ndvi.toFixed(3)}</strong>. 
                    The soil analysis indicates <strong>{analysisResults.soilType}</strong> composition with <strong>{analysisResults.soilMoisture.toFixed(1)}%</strong> moisture content.
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', backgroundColor: 'rgba(0, 179, 126, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(0, 179, 126, 0.2)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-green)' }}>
                      <path d="M9 12l2 2 4-4"/>
                      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.5 0 2.91.37 4.15 1.02"/>
                    </svg>
                    <span style={{ fontSize: '0.875rem', color: 'var(--accent-green)', fontWeight: '500' }}>
                      Optimal conditions detected for crop cultivation
                    </span>
                  </div>
                </div>
                
                {/* Key Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.75rem', border: '1px solid var(--bg-tertiary)', textAlign: 'center' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(0, 179, 126, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-green)' }}>
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: '500' }}>Vegetation Index</h3>
                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--accent-green)', marginBottom: '0.25rem' }}>
                      {analysisResults.ndvi.toFixed(3)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {analysisResults.ndvi > 0.7 ? 'Excellent' : analysisResults.ndvi > 0.5 ? 'Good' : analysisResults.ndvi > 0.3 ? 'Fair' : 'Poor'}
                    </div>
                  </div>
                  
                  <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.75rem', border: '1px solid var(--bg-tertiary)', textAlign: 'center' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(139, 69, 19, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#8B4513' }}>
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: '500' }}>Soil Type</h3>
                    <div style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      {analysisResults.soilType}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {analysisResults.soilType === 'Clay' ? 'High water retention' : 
                       analysisResults.soilType === 'Sandy Loam' ? 'Good drainage' :
                       analysisResults.soilType === 'Loam' ? 'Balanced composition' : 'Moderate drainage'}
                    </div>
                  </div>
                  
                  <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.75rem', border: '1px solid var(--bg-tertiary)', textAlign: 'center' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#3B82F6' }}>
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: '500' }}>Soil Moisture</h3>
                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#3B82F6', marginBottom: '0.25rem' }}>
                      {analysisResults.soilMoisture.toFixed(1)}%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {analysisResults.soilMoisture > 60 ? 'High moisture' : analysisResults.soilMoisture > 40 ? 'Optimal' : 'Low moisture'}
                    </div>
                  </div>
                  
                  <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.75rem', border: '1px solid var(--bg-tertiary)', textAlign: 'center' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#10B981' }}>
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: '500' }}>Health Status</h3>
                    <div style={{ fontSize: '1rem', fontWeight: '600', color: '#10B981', marginBottom: '0.25rem' }}>
                      {analysisResults.vegetationHealth}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Vegetation condition
                    </div>
                  </div>
                </div>

                {/* Crop Recommendations */}
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.75rem', border: '1px solid var(--bg-tertiary)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem' }}>Recommended Crops & Growing Conditions</h3>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontWeight: '500' }}>Primary Recommendations</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      {analysisResults.recommendedCrops.map((crop, index) => (
                        <div key={index} style={{ 
                          padding: '1rem', 
                          backgroundColor: 'var(--bg-primary)', 
                          borderRadius: '0.5rem', 
                          border: '1px solid var(--bg-tertiary)',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                            {crop === 'Maize' ? '🌽' : crop === 'Cassava' ? '🥔' : crop === 'Yam' ? '🍠' : crop === 'Plantain' ? '🍌' : '🌾'}
                          </div>
                          <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                            {crop}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            {crop === 'Maize' ? 'High yield potential' :
                             crop === 'Cassava' ? 'Drought resistant' :
                             crop === 'Yam' ? 'Staple crop' :
                             crop === 'Plantain' ? 'Perennial growth' : 'Versatile crop'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ padding: '1rem', backgroundColor: 'rgba(0, 179, 126, 0.05)', borderRadius: '0.5rem', border: '1px solid rgba(0, 179, 126, 0.1)' }}>
                    <h4 style={{ fontSize: '0.875rem', color: 'var(--accent-green)', marginBottom: '0.75rem', fontWeight: '600' }}>Growing Conditions Analysis</h4>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      <p style={{ marginBottom: '0.75rem' }}>
                        <strong>Soil Suitability:</strong> Your {analysisResults.soilType} soil is well-suited for root crops and grains. 
                        The {analysisResults.soilMoisture.toFixed(1)}% moisture content provides {analysisResults.soilMoisture > 60 ? 'ample' : analysisResults.soilMoisture > 40 ? 'adequate' : 'limited'} water availability.
                      </p>
                      <p style={{ marginBottom: '0.75rem' }}>
                        <strong>Climate Considerations:</strong> Based on the NDVI analysis, your farm shows {analysisResults.vegetationHealth.toLowerCase()} vegetation health, 
                        indicating {analysisResults.ndvi > 0.7 ? 'optimal growing conditions with minimal intervention needed' : 
                                  analysisResults.ndvi > 0.5 ? 'good growing potential with standard agricultural practices' :
                                  analysisResults.ndvi > 0.3 ? 'moderate growing conditions requiring soil improvement' : 'challenging conditions requiring significant soil management'}.
                      </p>
                      <p>
                        <strong>Management Recommendations:</strong> 
                        {analysisResults.soilMoisture < 40 ? ' Implement irrigation systems to maintain optimal soil moisture. ' : ''}
                        {analysisResults.ndvi < 0.5 ? ' Consider soil amendments and organic matter addition to improve fertility. ' : ''}
                        Rotate crops annually to maintain soil health and prevent nutrient depletion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Map
                onPolygonComplete={handlePolygonComplete}
                onReset={handleReset}
                farmBoundaries={farmBoundaries}
                analysisResults={analysisResults}
                isDrawing={isDrawing}
                onToggleDrawing={toggleDrawing}
                currentDrawingPoints={currentDrawingPoints}
                setCurrentDrawingPoints={setCurrentDrawingPoints}
                drawnPolygons={drawnPolygons}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultispectralAnalysisPage;
