import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Users, TrendingUp, Clock, DollarSign } from 'lucide-react';

interface CustomerSegment {
  id: number;
  name: string;
  count: number;
  percentage: number;
  avgRevenue: number;
  lastPurchase: string;
  recommendations: string[];
}

interface CustomerSegmentsProps {
  segments: CustomerSegment[];
}

export const CustomerSegments: React.FC<CustomerSegmentsProps> = ({ segments }) => {
  const getSegmentColor = (segmentId: number) => {
    switch (segmentId) {
      case 0: return 'bg-red-100 text-red-800'; // Dormant/Churned
      case 1: return 'bg-green-100 text-green-800'; // Loyal/Engaged
      case 2: return 'bg-yellow-100 text-yellow-800'; // New/Recent but Inactive
      case 3: return 'bg-blue-100 text-blue-800'; // High-Engagement/Recent High-Value
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSegmentIcon = (segmentId: number) => {
    switch (segmentId) {
      case 0: return <Clock size={20} className="text-red-600" />;
      case 1: return <Users size={20} className="text-green-600" />;
      case 2: return <TrendingUp size={20} className="text-yellow-600" />;
      case 3: return <DollarSign size={20} className="text-blue-600" />;
      default: return <Users size={20} />;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Customer Segments</h3>
        <Badge>{segments.length} Segments</Badge>
      </div>
      
      <div className="space-y-4">
        {segments.map((segment) => (
          <div key={segment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {getSegmentIcon(segment.id)}
                <div>
                  <h4 className="font-medium text-gray-900">{segment.name}</h4>
                  <p className="text-sm text-gray-500">{segment.count} customers ({segment.percentage}%)</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">₵{segment.avgRevenue}</p>
                <p className="text-xs text-gray-500">Avg Revenue</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">Last Purchase: {segment.lastPurchase}</span>
              </div>
              <Badge className={getSegmentColor(segment.id)}>
                Cluster {segment.id}
              </Badge>
            </div>
            
            <div className="mt-3">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Recommended Actions:</h5>
              <ul className="space-y-1">
                {segment.recommendations.map((recommendation, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
