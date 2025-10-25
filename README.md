# AgroX Customer Intelligence Dashboard

A modern, responsive React-based frontend application for agricultural customer intelligence and analytics. This dashboard provides comprehensive insights into customer behavior, segmentation, retention, and product recommendations.

## Features

###  **Customer Intelligence Dashboard**
- **Real-time Analytics**: Live customer metrics and KPIs
- **Dynamic Segmentation**: AI-powered customer clustering with automatic optimal cluster selection
- **Retention Analysis**: Customer retention predictions and insights
- **Product Recommendations**: Personalized product suggestions based on ML models
- **Mobile Responsive**: Optimized for desktop, tablet, and mobile devices

###  **Customer Segmentation**
- **Dynamic Clustering**: Automatically determines optimal number of customer segments
- **Visual Analytics**: Interactive charts and graphs for segment analysis
- **Segment Insights**: Detailed descriptions and characteristics for each customer group
- **Color-coded Visualization**: Intuitive visual representation of customer segments

###  **Customer Retention**
- **Retention Predictions**: ML-powered customer retention forecasting
- **Risk Analysis**: Identify customers at risk of churning
- **Engagement Metrics**: Track customer engagement and activity patterns
- **Retention Strategies**: Data-driven recommendations for customer retention

###  **Product Recommendations**
- **Personalized Suggestions**: AI-powered product recommendations for each customer
- **Likelihood Scoring**: Confidence scores for recommendation accuracy
- **Product Analytics**: Top recommended products and customer preferences
- **Recommendation Engine**: Advanced ML algorithms for optimal product matching

###  **Modern UI/UX**
- **Professional Design**: Clean, modern interface with agricultural theme
- **Responsive Layout**: Seamless experience across all device sizes
- **Interactive Components**: Engaging charts, tables, and visualizations
- **Accessibility**: WCAG compliant design for inclusive user experience

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: CSS-in-JS with modern responsive design
- **State Management**: React Hooks and Context API
- **HTTP Client**: Axios for API communication
- **Icons**: Lucide React for consistent iconography
- **Charts**: Custom chart components for data visualization

## 📋 Prerequisites

- **Node.js**: Version 16 or higher
- **npm**: Version 8 or higher (comes with Node.js)
- **Backend API**: AgroX server running on port 8000

## 🚀 Quick Start

### 1. **Installation**
   ```bash
# Navigate to client directory
cd client

# Install dependencies
   npm install
   ```

### 2. **Environment Setup**
```bash
# Copy environment template
cp env.example .env

# Edit environment variables (if needed)
# The default configuration should work with local development
```

### 3. **Start Development Server**
   ```bash
# Start the development server
   npm run dev

# The application will be available at http://localhost:5173
```

### 4. **Build for Production**
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
client/
├── public/                     # Static assets
│   ├── assets/
│   │   └── logo.svg           # Application logo
│   └── vite.svg               # Vite logo
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── account/           # Authentication components
│   │   │   ├── SignIn.tsx
│   │   │   └── SignUp.tsx
│   │   ├── charts/            # Chart components
│   │   ├── dashboard/         # Dashboard-specific components
│   │   │   ├── AlertItem.tsx
│   │   │   ├── AlertsSection.tsx
│   │   │   ├── CropRecommendations.tsx
│   │   │   ├── CustomerSegments.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   ├── RecentAnalyses.tsx
│   │   │   └── WeatherConditions.tsx
│   │   ├── layout/            # Layout components
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── profile.tsx
│   │   │   └── sidebar.tsx
│   │   ├── ui/                # Base UI components
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Input.tsx
│   │   ├── DataUpload.tsx
│   │   ├── Map.tsx
│   │   ├── ModelTraining.tsx
│   │   ├── PlaceholderFeatures.tsx
│   │   └── PredictionsTable.tsx
│   ├── hooks/                 # Custom React hooks
│   ├── pages/                 # Page components
│   │   ├── CustomerInsightsDashboard.tsx
│   │   ├── CustomerRetention.tsx
│   │   ├── CustomerSegmentation.tsx
│   │   ├── dashboard.tsx
│   │   ├── ImplementationRoadmap.tsx
│   │   └── ProductRecommendations.tsx
│   ├── services/              # API services
│   │   └── api.ts
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/                 # Utility functions
│   │   └── testApiConnection.ts
│   ├── App.tsx               # Main application component
│   ├── App.css               # Global styles
│   ├── index.css             # Base styles
│   └── main.tsx              # Application entry point
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── eslint.config.js          # ESLint configuration
└── README.md                 # This file
```

## 🔗 API Integration

The frontend communicates with the AgroX backend API through the following services:

### **API Service (`src/services/api.ts`)**
```typescript
class AgroXApiService {
  // Customer data management
  async getCustomers(params?: CustomerParams): Promise<Customer[]>
  async createCustomer(customer: CustomerData): Promise<Customer>
  async uploadBulkData(data: BulkDataUploadRequest): Promise<UploadResult>

  // ML Predictions
  async predictSegmentation(request: SegmentationRequest): Promise<SegmentationResult>
  async predictRetention(request: RetentionRequest): Promise<RetentionResult>
  async generateRecommendations(request: RecommendationRequest): Promise<RecommendationResult>

  // Analytics & Insights
  async getDashboardStats(): Promise<DashboardStats>
  async generateDynamicInsights(request: InsightsRequest): Promise<InsightsResult>
  async getModelMetrics(): Promise<ModelMetrics>

  // Data Export
  async exportData(format: string, filters?: ExportFilters): Promise<Blob>
}
```

### **Key API Endpoints**
- `GET /api/customers` - Fetch customer data
- `POST /api/predictions/segmentation` - Customer segmentation
- `POST /api/predictions/retention` - Retention prediction
- `POST /api/recommendations` - Product recommendations
- `GET /api/dashboard/stats` - Dashboard statistics
- `POST /api/insights/dynamic` - Dynamic insights generation

## 🎨 UI Components

### **Dashboard Components**
- **MetricCard**: Displays key performance indicators
- **CustomerSegments**: Visual representation of customer clusters
- **AlertsSection**: Important notifications and warnings
- **RecentAnalyses**: Latest analysis results

### **Chart Components**
- **Segmentation Charts**: Customer cluster visualizations
- **Retention Analytics**: Retention trend analysis
- **Recommendation Charts**: Product recommendation insights

### **Layout Components**
- **DashboardLayout**: Main application layout
- **Sidebar**: Navigation and menu
- **Footer**: Application footer
- **Profile**: User profile management

## 📱 Responsive Design

The application is fully responsive with breakpoints optimized for:

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

### **Mobile Optimizations**
- Fluid typography using CSS `clamp()` function
- Flexible grid layouts with `minmax()` functions
- Touch-friendly interface elements
- Optimized spacing and padding for small screens
- Collapsible navigation for mobile devices

## 🔧 Development

### **Available Scripts**
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### **Code Standards**
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Component Structure**: Functional components with hooks
- **Styling**: CSS-in-JS with responsive design principles

### **Adding New Features**
1. Create components in appropriate directories
2. Add TypeScript interfaces in `src/types/`
3. Update API service if backend integration needed
4. Add routing in main App component
5. Test responsive design across devices

## 🧪 Testing

### **Manual Testing Checklist**
- [ ] Dashboard loads correctly
- [ ] Customer segmentation displays properly
- [ ] Retention analysis works
- [ ] Product recommendations show
- [ ] Mobile responsiveness verified
- [ ] API connections functional

### **Browser Compatibility**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Deployment

### **Production Build**
```bash
# Create optimized build
npm run build

# The build output will be in the 'dist' directory
```

### **Docker Deployment**
```bash
# Build Docker image
docker build -t agrox-client .

# Run container
docker run -p 3000:80 agrox-client
```

### **Environment Variables**
```bash
# Production environment
VITE_API_BASE_URL=https://api.agrox.com
VITE_APP_TITLE=AgroX Customer Intelligence
```

## 🔍 Troubleshooting

### **Common Issues**

1. **API Connection Errors**
   - Verify backend server is running on port 8000
   - Check CORS configuration
   - Validate API endpoints

2. **Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check TypeScript errors
   - Verify all dependencies installed

3. **Mobile Display Issues**
   - Test responsive breakpoints
   - Check CSS clamp() function support
   - Verify viewport meta tag

## 📈 Performance

### **Optimization Features**
- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image and asset compression
- **Caching**: Efficient browser caching strategies

### **Performance Metrics**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow TypeScript best practices
- Maintain responsive design principles
- Write clean, readable code
- Test across multiple devices
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review API documentation
- Contact the development team

---

**AgroX Customer Intelligence Dashboard** - Empowering agricultural businesses with data-driven customer insights and AI-powered recommendations.