import React, { useState, useEffect } from 'react';
import { Eye, Download, RefreshCw } from 'lucide-react';
import { apiService, type Prediction } from '../services/api';

interface PredictionsTableProps {
  modelId?: string;
  onExport?: (predictions: Prediction[]) => void;
}

export const PredictionsTable: React.FC<PredictionsTableProps> = ({ 
  modelId, 
  onExport 
}) => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredPredictions, setFilteredPredictions] = useState<Prediction[]>([]);
  const [filters, setFilters] = useState({
    customerId: '',
    predictionType: '',
    minConfidence: 0,
  });
  const [sortBy, setSortBy] = useState<'customer_id' | 'prediction_value' | 'confidence' | 'created_at' | 'prediction_type'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    loadPredictions();
  }, [modelId]);

  useEffect(() => {
    applyFilters();
  }, [predictions, filters, sortBy, sortOrder]);

  const loadPredictions = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getPredictions(
        undefined,
        modelId,
        undefined,
        1000
      );
      setPredictions(response.predictions);
    } catch (error) {
      console.error('Error loading predictions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...predictions];

    // Apply text filters
    if (filters.customerId) {
      filtered = filtered.filter(p => 
        p.customer_id.toLowerCase().includes(filters.customerId.toLowerCase())
      );
    }

    if (filters.predictionType) {
      filtered = filtered.filter(p => p.prediction_type === filters.predictionType);
    }

    // Apply confidence filter
    if (filters.minConfidence > 0) {
      filtered = filtered.filter(p => 
        p.confidence && p.confidence >= filters.minConfidence
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];

      if (sortBy === 'created_at') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredPredictions(filtered);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleExport = () => {
    if (onExport) {
      onExport(filteredPredictions);
    }
  };

  const getPredictionValueDisplay = (prediction: Prediction) => {
    if (prediction.prediction_type === 'clustering') {
      return `Segment ${prediction.prediction_value}`;
    } else if (prediction.prediction_type === 'classification') {
      return prediction.prediction_value ? 'Positive' : 'Negative';
    } else if (prediction.prediction_type === 'regression') {
      return `$${prediction.prediction_value?.toFixed(2)}`;
    }
    return prediction.prediction_value;
  };

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return 'var(--text-secondary)';
    if (confidence >= 0.8) return '#10B981';
    if (confidence >= 0.6) return '#F59E0B';
    return '#EF4444';
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '200px',
        color: 'var(--text-secondary)'
      }}>
        <RefreshCw className="animate-spin" size={20} />
        <span style={{ marginLeft: '0.5rem' }}>Loading predictions...</span>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'var(--card-background)',
      border: '1px solid var(--border-color)',
      borderRadius: '0.5rem',
      padding: '1.5rem',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Eye size={20} color="var(--text-primary)" />
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            margin: 0,
          }}>
            Predictions ({filteredPredictions.length})
          </h3>
        </div>
        
        <button
          onClick={handleExport}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#10B981',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Filters */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: 'var(--background-secondary)',
        borderRadius: '0.375rem',
      }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'var(--text-primary)',
            marginBottom: '0.25rem',
          }}>
            Customer ID
          </label>
          <input
            type="text"
            value={filters.customerId}
            onChange={(e) => handleFilterChange('customerId', e.target.value)}
            placeholder="Search customer ID..."
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid var(--border-color)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--input-background)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'var(--text-primary)',
            marginBottom: '0.25rem',
          }}>
            Prediction Type
          </label>
          <select
            value={filters.predictionType}
            onChange={(e) => handleFilterChange('predictionType', e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid var(--border-color)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--input-background)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
            }}
          >
            <option value="">All Types</option>
            <option value="clustering">Clustering</option>
            <option value="classification">Classification</option>
            <option value="regression">Regression</option>
          </select>
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'var(--text-primary)',
            marginBottom: '0.25rem',
          }}>
            Min Confidence
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={filters.minConfidence}
            onChange={(e) => handleFilterChange('minConfidence', parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {(filters.minConfidence * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.875rem',
        }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th
                onClick={() => handleSort('customer_id')}
                style={{
                  padding: '0.75rem',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                Customer ID {sortBy === 'customer_id' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('prediction_type')}
                style={{
                  padding: '0.75rem',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                Type {sortBy === 'prediction_type' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('prediction_value')}
                style={{
                  padding: '0.75rem',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                Prediction {sortBy === 'prediction_value' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('confidence')}
                style={{
                  padding: '0.75rem',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                Confidence {sortBy === 'confidence' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('created_at')}
                style={{
                  padding: '0.75rem',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                Created {sortBy === 'created_at' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPredictions.map((prediction, index) => (
              <tr
                key={prediction.prediction_id}
                style={{
                  borderBottom: index < filteredPredictions.length - 1 ? '1px solid var(--border-color)' : 'none',
                }}
              >
                <td style={{ padding: '0.75rem', color: 'var(--text-primary)' }}>
                  {prediction.customer_id}
                </td>
                <td style={{ padding: '0.75rem', color: 'var(--text-primary)' }}>
                  <span style={{
                    backgroundColor: 'var(--background-secondary)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    textTransform: 'capitalize',
                  }}>
                    {prediction.prediction_type}
                  </span>
                </td>
                <td style={{ padding: '0.75rem', color: 'var(--text-primary)' }}>
                  {getPredictionValueDisplay(prediction)}
                </td>
                <td style={{ padding: '0.75rem' }}>
                  {prediction.confidence ? (
                    <span style={{
                      color: getConfidenceColor(prediction.confidence),
                      fontWeight: '500',
                    }}>
                      {(prediction.confidence * 100).toFixed(1)}%
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-secondary)' }}>N/A</span>
                  )}
                </td>
                <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>
                  {new Date(prediction.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPredictions.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: 'var(--text-secondary)',
          }}>
            No predictions found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
};
