import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line, Scatter } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Common chart options
const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

// Customer Segmentation Chart (Doughnut)
interface CustomerSegmentationProps {
  data: {
    labels: string[];
    values: number[];
  };
  title?: string;
}

export const CustomerSegmentationChart: React.FC<CustomerSegmentationProps> = ({ 
  data, 
  title = "Customer Segments" 
}) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          '#3B82F6', // Blue
          '#10B981', // Green
          '#F59E0B', // Yellow
          '#EF4444', // Red
          '#8B5CF6', // Purple
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

// Income Distribution Chart (Bar)
interface IncomeDistributionProps {
  data: {
    labels: string[];
    values: number[];
  };
  title?: string;
}

export const IncomeDistributionChart: React.FC<IncomeDistributionProps> = ({ 
  data, 
  title = "Income Distribution" 
}) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Number of Customers',
        data: data.values,
        backgroundColor: '#3B82F6',
        borderColor: '#1D4ED8',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

// Prediction Accuracy Chart (Line)
interface PredictionAccuracyProps {
  data: {
    labels: string[];
    accuracy: number[];
    confidence: number[];
  };
  title?: string;
}

export const PredictionAccuracyChart: React.FC<PredictionAccuracyProps> = ({ 
  data, 
  title = "Model Performance" 
}) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Accuracy',
        data: data.accuracy,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Confidence',
        data: data.confidence,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        ticks: {
          callback: function(value: any) {
            return (value * 100).toFixed(0) + '%';
          },
        },
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

// Customer Clustering Scatter Plot
interface CustomerClusteringProps {
  data: {
    x: number[];
    y: number[];
    labels: string[];
  };
  title?: string;
}

export const CustomerClusteringChart: React.FC<CustomerClusteringProps> = ({ 
  data, 
  title = "Customer Clustering" 
}) => {
  const chartData = {
    datasets: [
      {
        label: 'Customers',
        data: data.x.map((x, i) => ({ x, y: data.y[i] })),
        backgroundColor: '#3B82F6',
        borderColor: '#1D4ED8',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const index = context.dataIndex;
            return `Customer: ${data.labels[index]}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Age',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Income',
        },
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Scatter data={chartData} options={options} />
    </div>
  );
};

// Model Comparison Chart (Bar)
interface ModelComparisonProps {
  data: {
    models: string[];
    accuracy: number[];
    trainingTime: number[];
  };
  title?: string;
}

export const ModelComparisonChart: React.FC<ModelComparisonProps> = ({ 
  data, 
  title = "Model Comparison" 
}) => {
  const chartData = {
    labels: data.models,
    datasets: [
      {
        label: 'Accuracy (%)',
        data: data.accuracy,
        backgroundColor: '#10B981',
        borderColor: '#059669',
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        label: 'Training Time (seconds)',
        data: data.trainingTime,
        backgroundColor: '#F59E0B',
        borderColor: '#D97706',
        borderWidth: 1,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Accuracy (%)',
        },
        ticks: {
          callback: function(value: any) {
            return value.toFixed(1) + '%';
          },
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Training Time (s)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};
