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
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
        gap: '0.75rem' 
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          padding: '0.75rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '0.5rem',
          flexDirection: 'column',
          textAlign: 'center',
          minHeight: '80px'
        }}>
          <Thermometer size={16} style={{ color: 'var(--accent-red)' }} />
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {weatherData.temperature}°C
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
              Temperature
            </div>
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          padding: '0.75rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '0.5rem',
          flexDirection: 'column',
          textAlign: 'center',
          minHeight: '80px'
        }}>
          <Droplets size={16} style={{ color: '#3B82F6' }} />
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {weatherData.humidity}%
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
              Humidity
            </div>
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          padding: '0.75rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '0.5rem',
          flexDirection: 'column',
          textAlign: 'center',
          minHeight: '80px'
        }}>
          <Droplets size={16} style={{ color: '#3B82F6' }} />
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {weatherData.rainfall}mm
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
              Rainfall
            </div>
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          padding: '0.75rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '0.5rem',
          flexDirection: 'column',
          textAlign: 'center',
          minHeight: '80px'
        }}>
          <Activity size={16} style={{ color: 'var(--text-secondary)' }} />
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {weatherData.windSpeed} km/h
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
              Wind Speed
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
