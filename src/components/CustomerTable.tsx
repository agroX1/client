import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Mail, 
  MapPin, 
  Calendar, 
  DollarSign, 
  ShoppingCart,
  TrendingUp,
  Eye,
  Filter,
  Search,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Badge } from './ui/Badge';

interface Customer {
  customer_id: string;
  name: string;
  email: string;
  age: number;
  income: number;
  location: string;
  gender: string;
  recency: number;
  avg_order_value: number;
  customer_lifetime_days: number;
  purchase_rate: number;
  total_items_sold: number;
  product_purchased: string;
  created_at: string;
  updated_at: string;
}

interface CustomerTableProps {
  customers: Customer[];
  clusterName?: string;
  isLoading?: boolean;
  onCustomerClick?: (customer: Customer) => void;
  showClusterInfo?: boolean;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  clusterName,
  isLoading = false,
  onCustomerClick,
  showClusterInfo = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Customer>('customer_id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(customers);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter and sort customers
  useEffect(() => {
    let filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customer_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.product_purchased.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort customers
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

    setFilteredCustomers(filtered);
    setCurrentPage(1);
  }, [customers, searchTerm, sortField, sortDirection]);

  const handleSort = (field: keyof Customer) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: keyof Customer) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRecencyBadge = (recency: number) => {
    if (recency <= 30) return <Badge variant="success">Recent</Badge>;
    if (recency <= 90) return <Badge variant="warning">Moderate</Badge>;
    return <Badge variant="error">At Risk</Badge>;
  };

  const getPurchaseRateBadge = (rate: number) => {
    if (rate >= 0.1) return <Badge variant="success">High</Badge>;
    if (rate >= 0.05) return <Badge variant="warning">Medium</Badge>;
    return <Badge variant="error">Low</Badge>;
  };

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading customers...</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {clusterName ? `${clusterName} Customers` : 'Customer List'}
            </h3>
            <p className="text-sm text-gray-600">
              {filteredCustomers.length} customers found
            </p>
          </div>
        </div>
        
        {showClusterInfo && clusterName && (
          <Badge variant="info" className="text-sm">
            Cluster: {clusterName}
          </Badge>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search customers by name, email, ID, location, or product..."
            value={searchTerm}
            onChange={(value) => setSearchTerm(value as string)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200">
              <th 
                className="text-left py-3 px-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('customer_id')}
              >
                <div className="flex items-center space-x-1">
                  <span>Customer ID</span>
                  {getSortIcon('customer_id')}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Name</span>
                  {getSortIcon('name')}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('email')}
              >
                <div className="flex items-center space-x-1">
                  <span>Email</span>
                  {getSortIcon('email')}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('location')}
              >
                <div className="flex items-center space-x-1">
                  <span>Location</span>
                  {getSortIcon('location')}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('avg_order_value')}
              >
                <div className="flex items-center space-x-1">
                  <span>Avg Order Value</span>
                  {getSortIcon('avg_order_value')}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('recency')}
              >
                <div className="flex items-center space-x-1">
                  <span>Recency</span>
                  {getSortIcon('recency')}
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('purchase_rate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Purchase Rate</span>
                  {getSortIcon('purchase_rate')}
                </div>
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Product</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr 
                key={customer.customer_id} 
                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                onClick={() => onCustomerClick?.(customer)}
              >
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900">
                    {customer.customer_id}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">
                        {customer.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">Age: {customer.age}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{customer.email}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{customer.location}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-green-600">
                      {formatCurrency(customer.avg_order_value)}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">{customer.recency} days</div>
                      {getRecencyBadge(customer.recency)}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">{(customer.purchase_rate * 100).toFixed(1)}%</div>
                      {getPurchaseRateBadge(customer.purchase_rate)}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 max-w-xs truncate">
                      {customer.product_purchased}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCustomerClick?.(customer);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredCustomers.length)} of {filteredCustomers.length} customers
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Try adjusting your search criteria' : 'No customers available for this cluster'}
          </p>
        </div>
      )}
    </Card>
  );
};
