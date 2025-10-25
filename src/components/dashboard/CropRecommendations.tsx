import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CropRecommendation {
  crop: string;
  suitability: number;
  reason: string;
}

interface CropRecommendationsProps {
  recommendations: CropRecommendation[];
}

export const CropRecommendations: React.FC<CropRecommendationsProps> = ({ recommendations }) => {
  // Prepare chart data for crop recommendations
  const cropChartData = {
    labels: recommendations.map(crop => crop.crop),
    datasets: [
      {
        label: 'Suitability Score',
        data: recommendations.map(crop => crop.suitability),
        backgroundColor: [
          '#10B981', // Green for high suitability
          '#3B82F6', // Blue for medium-high suitability
          '#F59E0B'  // Yellow for medium suitability
        ],
        borderColor: [
          '#059669',
          '#1D4ED8',
          '#D97706'
        ],
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const crop = recommendations[context.dataIndex];
            return `${crop.crop}: ${crop.suitability}% suitability`;
          },
          afterLabel: function(context: any) {
            const crop = recommendations[context.dataIndex];
            return crop.reason;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <Card padding="lg">
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem', 
        marginBottom: '1.5rem' 
      }}>
        <BarChart3 size={20} style={{ color: 'var(--accent-green)' }} />
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          color: 'var(--text-primary)' 
        }}>
          Crop Recommendations
        </h3>
      </div>

      {/* Crop Suitability Chart */}
      <div style={{ height: '200px', width: '100%', marginBottom: '1.5rem' }}>
        <Bar data={cropChartData} options={chartOptions} />
      </div>

      {/* Crop Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {recommendations.map((crop, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            justifyContent: 'space-between',
            padding: '0.75rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '0.5rem',
            border: '1px solid var(--bg-tertiary)',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h4 style={{ 
                fontSize: '0.8rem', 
                fontWeight: '600', 
                color: 'var(--text-primary)',
                marginBottom: '0.25rem'
              }}>
                {crop.crop}
              </h4>
              <p style={{ 
                fontSize: '0.7rem', 
                color: 'var(--text-secondary)',
                lineHeight: '1.4'
              }}>
                {crop.reason}
              </p>
            </div>
            <div style={{ 
              fontSize: '1rem', 
              fontWeight: 'bold', 
              color: crop.suitability >= 90 ? '#10B981' : 
                     crop.suitability >= 80 ? '#3B82F6' : '#F59E0B',
              flexShrink: 0
            }}>
              {crop.suitability}%
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
