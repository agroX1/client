import React from 'react';
import { Sun, Thermometer, Droplets, Activity } from 'lucide-react';
import { Card } from '../ui/Card';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

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
  // Prepare chart data for weather conditions
  const weatherChartData = {
    labels: ['Temperature', 'Humidity', 'Rainfall', 'Wind Speed'],
    datasets: [
      {
        data: [
          weatherData.temperature,
          weatherData.humidity,
          weatherData.rainfall,
          weatherData.windSpeed
        ],
        backgroundColor: [
          '#EF4444', // Red for temperature
          '#3B82F6', // Blue for humidity
          '#10B981', // Green for rainfall
          '#F59E0B'  // Yellow for wind speed
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed;
            const unit = label === 'Temperature' ? '°C' : 
                        label === 'Humidity' ? '%' : 
                        label === 'Rainfall' ? 'mm' : 'km/h';
            return `${label}: ${value}${unit}`;
          }
        }
      }
    },
    cutout: '60%'
  };

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
      
      {/* Weather Metrics Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
        gap: '0.75rem',
        marginBottom: '1.5rem'
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
          <Thermometer size={16} style={{ color: '#EF4444' }} />
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
          <Droplets size={16} style={{ color: '#10B981' }} />
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
          <Activity size={16} style={{ color: '#F59E0B' }} />
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

      {/* Weather Chart */}
      <div style={{ height: '200px', width: '100%' }}>
        <Doughnut data={weatherChartData} options={chartOptions} />
      </div>
    </Card>
  );
};
