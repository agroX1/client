import React from 'react';
import { Sun, Thermometer, Droplets, Activity } from 'lucide-react';
import { Card } from '../ui/Card';

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
}

interface WeatherConditionsProps {
  weatherData: WeatherData;
}

export const WeatherConditions: React.FC<WeatherConditionsProps> = ({ weatherData }) => {
  return (
    <Card padding="lg">
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem', 
        marginBottom: '1.5rem' 
      }}>
        <Sun size={20} style={{ color: '#F59E0B' }} />
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          color: 'var(--text-primary)' 
        }}>
          Weather Conditions
        </h3>
      </div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '1rem' 
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          padding: '1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '0.5rem'
        }}>
          <Thermometer size={20} style={{ color: 'var(--accent-red)' }} />
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {weatherData.temperature}°C
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Temperature
            </div>
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          padding: '1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '0.5rem'
        }}>
          <Droplets size={20} style={{ color: '#3B82F6' }} />
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {weatherData.humidity}%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Humidity
            </div>
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          padding: '1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '0.5rem'
        }}>
          <Droplets size={20} style={{ color: '#3B82F6' }} />
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {weatherData.rainfall}mm
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Rainfall
            </div>
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          padding: '1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '0.5rem'
        }}>
          <Activity size={20} style={{ color: 'var(--text-secondary)' }} />
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {weatherData.windSpeed} km/h
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Wind Speed
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
