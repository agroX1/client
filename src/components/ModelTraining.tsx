import React, { useState } from 'react';
import { Brain, Play, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { apiService, handleApiError } from '../services/api';

interface ModelTrainingProps {
  onTrainingComplete?: () => void;
}

export const ModelTraining: React.FC<ModelTrainingProps> = ({ onTrainingComplete }) => {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingStatus, setTrainingStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [trainingMessage, setTrainingMessage] = useState('');
  const [trainingResult, setTrainingResult] = useState<{
    trainingId?: string;
    modelName?: string;
    accuracy?: number;
  }>({});

  const [formData, setFormData] = useState({
    modelName: '',
    modelType: 'clustering' as 'clustering' | 'classification' | 'regression',
    nClusters: 3,
    nEstimators: 100,
    maxDepth: 10,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'nClusters' || name === 'nEstimators' || name === 'maxDepth' 
        ? parseInt(value) || 0 
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.modelName.trim()) {
      setTrainingStatus('error');
      setTrainingMessage('Please enter a model name');
      return;
    }

    setIsTraining(true);
    setTrainingStatus('idle');
    setTrainingMessage('');

    try {
      const parameters: Record<string, any> = {};
      
      if (formData.modelType === 'clustering') {
        parameters.n_clusters = formData.nClusters;
      } else if (formData.modelType === 'classification' || formData.modelType === 'regression') {
        parameters.n_estimators = formData.nEstimators;
        parameters.max_depth = formData.maxDepth;
      }

      const result = await apiService.trainModel(
        formData.modelName,
        formData.modelType,
        parameters
      );

      setTrainingStatus('success');
      setTrainingMessage(result.message);
      setTrainingResult({
        trainingId: result.training_id,
        modelName: result.model_name,
        accuracy: undefined, // Accuracy not available in response
      });

      if (onTrainingComplete) {
        onTrainingComplete();
      }
    } catch (error) {
      const errorInfo = handleApiError(error);
      setTrainingStatus('error');
      setTrainingMessage(errorInfo.message);
    } finally {
      setIsTraining(false);
    }
  };

  const resetForm = () => {
    setTrainingStatus('idle');
    setTrainingMessage('');
    setTrainingResult({});
    setFormData({
      modelName: '',
      modelType: 'clustering',
      nClusters: 3,
      nEstimators: 100,
      maxDepth: 10,
    });
  };

  return (
    <div style={{
      backgroundColor: 'var(--card-background)',
      border: '1px solid var(--border-color)',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      marginBottom: '1.5rem',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1rem',
      }}>
        <Brain size={20} color="var(--text-primary)" />
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          margin: 0,
        }}>
          Train Machine Learning Model
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
            }}>
              Model Name *
            </label>
            <input
              type="text"
              name="modelName"
              value={formData.modelName}
              onChange={handleInputChange}
              placeholder="e.g., customer_segments"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
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
              marginBottom: '0.5rem',
            }}>
              Model Type *
            </label>
            <select
              name="modelType"
              value={formData.modelType}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--border-color)',
                borderRadius: '0.375rem',
                backgroundColor: 'var(--input-background)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
              }}
            >
              <option value="clustering">Clustering (K-Means)</option>
              <option value="classification">Classification (Random Forest)</option>
              <option value="regression">Regression (Random Forest)</option>
            </select>
          </div>

          {formData.modelType === 'clustering' && (
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
              }}>
                Number of Clusters
              </label>
              <input
                type="number"
                name="nClusters"
                value={formData.nClusters}
                onChange={handleInputChange}
                min="2"
                max="10"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.375rem',
                  backgroundColor: 'var(--input-background)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                }}
              />
            </div>
          )}

          {(formData.modelType === 'classification' || formData.modelType === 'regression') && (
            <>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}>
                  Number of Estimators
                </label>
                <input
                  type="number"
                  name="nEstimators"
                  value={formData.nEstimators}
                  onChange={handleInputChange}
                  min="10"
                  max="1000"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
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
                  marginBottom: '0.5rem',
                }}>
                  Max Depth
                </label>
                <input
                  type="number"
                  name="maxDepth"
                  value={formData.maxDepth}
                  onChange={handleInputChange}
                  min="1"
                  max="50"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.375rem',
                    backgroundColor: 'var(--input-background)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                  }}
                />
              </div>
            </>
          )}
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
        }}>
          <button
            type="submit"
            disabled={isTraining}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: isTraining ? 'var(--text-secondary)' : 'var(--button-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              padding: '0.75rem 1.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: isTraining ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {isTraining ? (
              <>
                <Loader className="animate-spin" size={16} />
                Training...
              </>
            ) : (
              <>
                <Play size={16} />
                Train Model
              </>
            )}
          </button>

          {trainingStatus !== 'idle' && (
            <button
              type="button"
              onClick={resetForm}
              style={{
                backgroundColor: 'var(--button-background)',
                color: 'var(--button-text)',
                border: '1px solid var(--border-color)',
                borderRadius: '0.375rem',
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Reset
            </button>
          )}
        </div>
      </form>

      {trainingStatus === 'success' && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid #10B981',
          borderRadius: '0.375rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <CheckCircle size={16} color="#10B981" />
          <div>
            <p style={{ color: '#10B981', margin: 0, fontWeight: '500' }}>
              Training Completed Successfully!
            </p>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.875rem' }}>
              {trainingMessage}
            </p>
            {trainingResult.accuracy && (
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.875rem' }}>
                Accuracy: {(trainingResult.accuracy * 100).toFixed(2)}%
              </p>
            )}
          </div>
        </div>
      )}

      {trainingStatus === 'error' && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid #EF4444',
          borderRadius: '0.375rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <AlertCircle size={16} color="#EF4444" />
          <div>
            <p style={{ color: '#EF4444', margin: 0, fontWeight: '500' }}>
              Training Failed
            </p>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.875rem' }}>
              {trainingMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
