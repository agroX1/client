import React, { useState, useRef, useEffect } from 'react';
import { LatLng } from 'leaflet';
import Papa from 'papaparse';
import { Upload, Plus, Trash2 } from 'lucide-react';

interface CoordinateInputProps {
  onCoordinatesSubmit: (coordinates: LatLng[]) => void;
  onFileUpload: (coordinates: LatLng[]) => void;
  initialCoordinates?: LatLng[] | null;
  onBackToMap?: () => void;
}

interface CoordinatePoint {
  id: string;
  lat: number;
  lng: number;
}

const CoordinateInput: React.FC<CoordinateInputProps> = ({ onCoordinatesSubmit, onFileUpload, initialCoordinates, onBackToMap }) => {
  const [coordinates, setCoordinates] = useState<CoordinatePoint[]>(() => {
    if (initialCoordinates && initialCoordinates.length > 0) {
      return initialCoordinates.map((coord, index) => ({
        id: (index + 1).toString(),
        lat: coord.lat,
        lng: coord.lng
      }));
    }
    return [{ id: '1', lat: 0, lng: 0 }];
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update coordinates when initialCoordinates change
  useEffect(() => {
    if (initialCoordinates && initialCoordinates.length > 0) {
      const newCoordinates = initialCoordinates.map((coord, index) => ({
        id: (index + 1).toString(),
        lat: coord.lat,
        lng: coord.lng
      }));
      setCoordinates(newCoordinates);
      setErrors({}); // Clear any existing errors
    }
  }, [initialCoordinates]);

  const validateCoordinate = (lat: number, lng: number): string | null => {
    if (isNaN(lat) || isNaN(lng)) {
      return 'Latitude and longitude must be valid numbers';
    }
    if (lat < -90 || lat > 90) {
      return 'Latitude must be between -90 and 90';
    }
    if (lng < -180 || lng > 180) {
      return 'Longitude must be between -180 and 180';
    }
    return null;
  };

  const addCoordinate = () => {
    const newId = (coordinates.length + 1).toString();
    setCoordinates([...coordinates, { id: newId, lat: 0, lng: 0 }]);
  };

  const removeCoordinate = (id: string) => {
    if (coordinates.length > 1) {
      setCoordinates(coordinates.filter(coord => coord.id !== id));
      const newErrors = { ...errors };
      delete newErrors[id];
      setErrors(newErrors);
    }
  };

  const updateCoordinate = (id: string, field: 'lat' | 'lng', value: number) => {
    setCoordinates(coordinates.map(coord => 
      coord.id === id ? { ...coord, [field]: value } : coord
    ));

    // Validate the updated coordinate
    const coord = coordinates.find(c => c.id === id);
    if (coord) {
      const newLat = field === 'lat' ? value : coord.lat;
      const newLng = field === 'lng' ? value : coord.lng;
      const error = validateCoordinate(newLat, newLng);
      
      if (error) {
        setErrors({ ...errors, [id]: error });
      } else {
        const newErrors = { ...errors };
        delete newErrors[id];
        setErrors(newErrors);
      }
    }
  };

  const handleSubmit = () => {
    const hasErrors = Object.keys(errors).length > 0;
    const hasEmptyFields = coordinates.some(coord => coord.lat === 0 && coord.lng === 0);
    
    if (hasErrors || hasEmptyFields) {
      alert('Please fix all errors and fill in all coordinate fields');
      return;
    }

    const latLngArray = coordinates.map(coord => new LatLng(coord.lat, coord.lng));
    onCoordinatesSubmit(latLngArray);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (fileExtension === 'csv') {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          try {
            const coords = results.data
              .filter((row: any) => row.lat && row.lng)
              .map((row: any) => ({
                id: Math.random().toString(),
                lat: parseFloat(row.lat),
                lng: parseFloat(row.lng)
              }));
            
            if (coords.length > 0) {
              setCoordinates(coords);
              const latLngArray = coords.map(coord => new LatLng(coord.lat, coord.lng));
              onFileUpload(latLngArray);
            } else {
              alert('No valid coordinates found in CSV file');
            }
          } catch (error) {
            alert('Error parsing CSV file');
          }
        },
        error: () => {
          alert('Error reading CSV file');
        }
      });
    } else if (fileExtension === 'json' || fileExtension === 'geojson') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          let coords: CoordinatePoint[] = [];
          
          if (fileExtension === 'geojson') {
            // Handle GeoJSON format
            if (data.type === 'FeatureCollection') {
              coords = data.features
                .filter((feature: any) => feature.geometry?.type === 'Point')
                .map((feature: any, index: number) => ({
                  id: index.toString(),
                  lat: feature.geometry.coordinates[1],
                  lng: feature.geometry.coordinates[0]
                }));
            } else if (data.type === 'Feature' && data.geometry?.type === 'Polygon') {
              coords = data.geometry.coordinates[0].map((coord: number[], index: number) => ({
                id: index.toString(),
                lat: coord[1],
                lng: coord[0]
              }));
            }
          } else {
            // Handle regular JSON format
            if (Array.isArray(data)) {
              coords = data.map((item: any, index: number) => ({
                id: index.toString(),
                lat: item.lat || item.latitude,
                lng: item.lng || item.longitude
              }));
            }
          }
          
          if (coords.length > 0) {
            setCoordinates(coords);
            const latLngArray = coords.map(coord => new LatLng(coord.lat, coord.lng));
            onFileUpload(latLngArray);
          } else {
            alert('No valid coordinates found in JSON file');
          }
        } catch (error) {
          alert('Error parsing JSON file');
        }
      };
      reader.readAsText(file);
    } else {
    }
  };

  const downloadTemplate = () => {
    const template = [
      { lat: 7.9465, lng: -1.0232 },
      { lat: 7.9500, lng: -1.0200 },
      { lat: 7.9400, lng: -1.0200 },
      { lat: 7.9400, lng: -1.0300 }
    ];
    
    const csv = Papa.unparse(template);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'coordinate_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        {initialCoordinates && initialCoordinates.length > 0 && (
          <span style={{ padding: '0.25rem 0.5rem', backgroundColor: 'rgba(0, 179, 126, 0.1)', color: 'var(--accent-green)', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500' }}>
            From Drawing
          </span>
        )}
        
        {onBackToMap && (
          <button
            onClick={onBackToMap}
            style={{
              padding: '0.5rem 0.75rem',
              backgroundColor: 'transparent',
              border: '1px solid var(--bg-tertiary)',
              borderRadius: '0.375rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)';
              (e.target as HTMLElement).style.borderColor = 'var(--accent-green)';
              (e.target as HTMLElement).style.color = 'var(--accent-green)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'transparent';
              (e.target as HTMLElement).style.borderColor = 'var(--bg-tertiary)';
              (e.target as HTMLElement).style.color = 'var(--text-secondary)';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
            Back to Map
          </button>
        )}
      </div>

      {/* File Upload Section */}
      <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem', border: '1px solid var(--bg-tertiary)' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.json,.geojson"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Upload style={{ height: '1rem', width: '1rem' }} />
            Upload File
          </button>
          <button
            onClick={downloadTemplate}
            className="btn-secondary"
          >
            Download Template
          </button>
        </div>
      </div>

      {/* Manual Entry Card with Fixed Height and Internal Scroll */}
      <div style={{ 
        backgroundColor: 'var(--bg-secondary)', 
        borderRadius: '0.5rem', 
        border: '1px solid var(--bg-tertiary)',
        height: '400px', // Fixed height
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Card Header */}
        <div style={{ 
          padding: '1rem', 
          borderBottom: '1px solid var(--bg-tertiary)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <h3 style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Manual Entry</h3>
          <button
            onClick={addCoordinate}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', padding: '0.5rem 0.75rem' }}
          >
            <Plus style={{ height: '1rem', width: '1rem' }} />
            Add Point
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div style={{ 
          flex: 1, 
          overflow: 'auto', 
          padding: '1rem',
          paddingRight: '0.5rem' // Space for scrollbar
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {coordinates.map((coord, index) => (
              <div key={coord.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                padding: '0.75rem', 
                backgroundColor: 'var(--bg-primary)', 
                borderRadius: '0.5rem', 
                border: '1px solid var(--bg-tertiary)',
                minHeight: '70px'
              }}>
                <span style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: '500', 
                  color: 'var(--text-secondary)', 
                  width: '2rem',
                  flexShrink: 0
                }}>
                  #{index + 1}
                </span>
                
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Latitude</label>
                    <input
                      type="number"
                      step="any"
                      value={coord.lat}
                      onChange={(e) => updateCoordinate(coord.id, 'lat', parseFloat(e.target.value) || 0)}
                      className="form-input"
                      placeholder="e.g., 7.9465"
                      style={{ fontSize: '0.875rem', padding: '0.5rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Longitude</label>
                    <input
                      type="number"
                      step="any"
                      value={coord.lng}
                      onChange={(e) => updateCoordinate(coord.id, 'lng', parseFloat(e.target.value) || 0)}
                      className="form-input"
                      placeholder="e.g., -1.0232"
                      style={{ fontSize: '0.875rem', padding: '0.5rem' }}
                    />
                  </div>
                </div>

                {coordinates.length > 1 && (
                  <button
                    onClick={() => removeCoordinate(coord.id)}
                    style={{ 
                      padding: '0.5rem', 
                      color: 'var(--accent-red)', 
                      backgroundColor: 'transparent', 
                      border: 'none', 
                      borderRadius: '0.5rem', 
                      cursor: 'pointer', 
                      transition: 'all 0.2s ease',
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 82, 82, 0.1)'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
                  >
                    <Trash2 style={{ height: '1rem', width: '1rem' }} />
                  </button>
                )}
              </div>
            ))}

            {Object.keys(errors).length > 0 && (
              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255, 82, 82, 0.1)', border: '1px solid rgba(255, 82, 82, 0.2)', borderRadius: '0.5rem' }}>
                {Object.entries(errors).map(([id, error]) => (
                  <p key={id} className="error-message">Point #{coordinates.findIndex(c => c.id === id) + 1}: {error}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="btn-primary"
        style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem 1rem' }}
      >
        Plot Coordinates on Map
      </button>
    </div>
  );
};

export default CoordinateInput;
