import React, { useState } from 'react';
import { 
  Map, 
  Calendar, 
  Users, 
  Target,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  Download,
  Eye,
  BarChart3,
  Database,
  Cloud,
  Shield,
  Zap
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';

// Implementation roadmap data
const roadmapData = {
  phases: [
    {
      id: 1,
      title: 'Foundation & Data Infrastructure',
      duration: '4-6 weeks',
      status: 'completed',
      description: 'Establish core data infrastructure and basic analytics capabilities',
      tasks: [
        { name: 'Database setup and migration', status: 'completed', priority: 'high' },
        { name: 'Data collection pipeline', status: 'completed', priority: 'high' },
        { name: 'Basic customer segmentation', status: 'completed', priority: 'medium' },
        { name: 'Initial dashboard setup', status: 'completed', priority: 'medium' }
      ],
      deliverables: [
        'MongoDB database with customer data',
        'Data ingestion pipeline',
        'Basic segmentation model',
        'Initial analytics dashboard'
      ],
      resources: ['Data Engineer', 'Backend Developer', 'DevOps Engineer'],
      risks: [
        { risk: 'Data quality issues', mitigation: 'Implement data validation and cleaning processes', impact: 'medium' },
        { risk: 'Performance bottlenecks', mitigation: 'Optimize database queries and indexing', impact: 'high' }
      ]
    },
    {
      id: 2,
      title: 'Advanced Analytics & ML Models',
      duration: '6-8 weeks',
      status: 'in_progress',
      description: 'Develop machine learning models for customer intelligence',
      tasks: [
        { name: 'RFM analysis implementation', status: 'completed', priority: 'high' },
        { name: 'Customer retention prediction', status: 'completed', priority: 'high' },
        { name: 'Product recommendation engine', status: 'in_progress', priority: 'high' },
        { name: 'Churn prediction model', status: 'pending', priority: 'medium' }
      ],
      deliverables: [
        'RFM segmentation model',
        'Retention prediction model',
        'Product recommendation system',
        'Churn prediction model'
      ],
      resources: ['Data Scientist', 'ML Engineer', 'Backend Developer'],
      risks: [
        { risk: 'Model accuracy below threshold', mitigation: 'Feature engineering and hyperparameter tuning', impact: 'high' },
        { risk: 'Data privacy compliance', mitigation: 'Implement data anonymization and encryption', impact: 'medium' }
      ]
    },
    {
      id: 3,
      title: 'Frontend Development & User Experience',
      duration: '4-5 weeks',
      status: 'in_progress',
      description: 'Build intuitive user interfaces for data visualization',
      tasks: [
        { name: 'Dashboard UI development', status: 'completed', priority: 'high' },
        { name: 'Chart.js integration', status: 'completed', priority: 'high' },
        { name: 'Customer segmentation interface', status: 'completed', priority: 'medium' },
        { name: 'Mobile responsiveness', status: 'pending', priority: 'medium' }
      ],
      deliverables: [
        'Interactive analytics dashboard',
        'Customer segmentation interface',
        'Product recommendation UI',
        'Mobile-responsive design'
      ],
      resources: ['Frontend Developer', 'UI/UX Designer', 'React Developer'],
      risks: [
        { risk: 'Performance issues with large datasets', mitigation: 'Implement data pagination and lazy loading', impact: 'medium' },
        { risk: 'Cross-browser compatibility', mitigation: 'Extensive testing across browsers', impact: 'low' }
      ]
    },
    {
      id: 4,
      title: 'Integration & API Development',
      duration: '3-4 weeks',
      status: 'pending',
      description: 'Connect frontend with backend services and external systems',
      tasks: [
        { name: 'REST API development', status: 'pending', priority: 'high' },
        { name: 'Real-time data updates', status: 'pending', priority: 'medium' },
        { name: 'Third-party integrations', status: 'pending', priority: 'low' },
        { name: 'API documentation', status: 'pending', priority: 'medium' }
      ],
      deliverables: [
        'Comprehensive REST API',
        'Real-time data streaming',
        'Integration documentation',
        'API testing suite'
      ],
      resources: ['Backend Developer', 'API Developer', 'DevOps Engineer'],
      risks: [
        { risk: 'API rate limiting', mitigation: 'Implement caching and request throttling', impact: 'medium' },
        { risk: 'Data synchronization issues', mitigation: 'Implement robust error handling and retry logic', impact: 'high' }
      ]
    },
    {
      id: 5,
      title: 'Testing & Quality Assurance',
      duration: '2-3 weeks',
      status: 'pending',
      description: 'Comprehensive testing and quality assurance',
      tasks: [
        { name: 'Unit testing', status: 'pending', priority: 'high' },
        { name: 'Integration testing', status: 'pending', priority: 'high' },
        { name: 'Performance testing', status: 'pending', priority: 'medium' },
        { name: 'User acceptance testing', status: 'pending', priority: 'high' }
      ],
      deliverables: [
        'Test coverage report',
        'Performance benchmarks',
        'Bug reports and fixes',
        'User acceptance test results'
      ],
      resources: ['QA Engineer', 'Test Automation Engineer', 'Product Manager'],
      risks: [
        { risk: 'Critical bugs discovered late', mitigation: 'Implement continuous testing and early bug detection', impact: 'high' },
        { risk: 'Performance issues under load', mitigation: 'Load testing and optimization', impact: 'medium' }
      ]
    },
    {
      id: 6,
      title: 'Deployment & Production Launch',
      duration: '2-3 weeks',
      status: 'pending',
      description: 'Deploy to production and launch the system',
      tasks: [
        { name: 'Production environment setup', status: 'pending', priority: 'high' },
        { name: 'Data migration', status: 'pending', priority: 'high' },
        { name: 'Monitoring and alerting', status: 'pending', priority: 'medium' },
        { name: 'User training and documentation', status: 'pending', priority: 'medium' }
      ],
      deliverables: [
        'Production deployment',
        'Monitoring dashboard',
        'User documentation',
        'Training materials'
      ],
      resources: ['DevOps Engineer', 'System Administrator', 'Product Manager'],
      risks: [
        { risk: 'Downtime during deployment', mitigation: 'Blue-green deployment strategy', impact: 'high' },
        { risk: 'User adoption challenges', mitigation: 'Comprehensive training and support', impact: 'medium' }
      ]
    }
  ],
  architecture: {
    components: [
      {
        name: 'Frontend (React)',
        description: 'Interactive dashboard and user interfaces',
        technologies: ['React', 'TypeScript', 'Chart.js', 'Tailwind CSS'],
        status: 'completed'
      },
      {
        name: 'Backend API (FastAPI)',
        description: 'RESTful API for data processing and ML models',
        technologies: ['FastAPI', 'Python', 'Pydantic', 'Uvicorn'],
        status: 'completed'
      },
      {
        name: 'Database (MongoDB)',
        description: 'Customer data storage and analytics',
        technologies: ['MongoDB', 'Motor', 'PyMongo'],
        status: 'completed'
      },
      {
        name: 'ML Models',
        description: 'Customer segmentation and prediction models',
        technologies: ['scikit-learn', 'pandas', 'numpy', 'joblib'],
        status: 'in_progress'
      },
      {
        name: 'Data Pipeline',
        description: 'ETL processes for data ingestion and processing',
        technologies: ['Python', 'pandas', 'Apache Airflow'],
        status: 'pending'
      },
      {
        name: 'Monitoring & Logging',
        description: 'System monitoring and error tracking',
        technologies: ['Prometheus', 'Grafana', 'ELK Stack'],
        status: 'pending'
      }
    ]
  },
  timeline: {
    totalDuration: '21-29 weeks',
    startDate: '2024-01-15',
    endDate: '2024-08-15',
    milestones: [
      { date: '2024-02-15', milestone: 'Foundation Complete', status: 'completed' },
      { date: '2024-04-15', milestone: 'ML Models Ready', status: 'in_progress' },
      { date: '2024-05-15', milestone: 'Frontend Complete', status: 'pending' },
      { date: '2024-06-15', milestone: 'Integration Complete', status: 'pending' },
      { date: '2024-07-15', milestone: 'Testing Complete', status: 'pending' },
      { date: '2024-08-15', milestone: 'Production Launch', status: 'pending' }
    ]
  }
};

const ImplementationRoadmap: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState(1);
  const [viewMode, setViewMode] = useState('timeline'); // timeline, architecture, details

  const handleExport = () => {
    console.log('Exporting roadmap data...');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} style={{ color: '#10B981' }} />;
      case 'in_progress':
        return <Clock size={16} style={{ color: '#F59E0B' }} />;
      case 'pending':
        return <AlertTriangle size={16} style={{ color: '#6B7280' }} />;
      default:
        return <Clock size={16} style={{ color: '#6B7280' }} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'in_progress':
        return '#F59E0B';
      case 'pending':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            margin: 0,
            marginBottom: '0.25rem'
          }}>
            Implementation Roadmap
          </h1>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            margin: 0
          }}>
            Strategic deployment plan for Afrimash Customer Intelligence Platform
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setViewMode('timeline')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: viewMode === 'timeline' ? '#3B82F6' : 'transparent',
                color: viewMode === 'timeline' ? 'white' : 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              Timeline
            </button>
            <button
              onClick={() => setViewMode('architecture')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: viewMode === 'architecture' ? '#3B82F6' : 'transparent',
                color: viewMode === 'architecture' ? 'white' : 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              Architecture
            </button>
            <button
              onClick={() => setViewMode('details')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: viewMode === 'details' ? '#3B82F6' : 'transparent',
                color: viewMode === 'details' ? 'white' : 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              Details
            </button>
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
      </div>

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <div>
          {/* Timeline Overview */}
          <Card padding="lg" style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <Calendar size={20} style={{ color: '#3B82F6' }} />
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                margin: 0
              }}>
                Project Timeline Overview
              </h3>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem'
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#3B82F6',
                  marginBottom: '0.5rem'
                }}>
                  {roadmapData.timeline.totalDuration}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)'
                }}>
                  Total Duration
                </div>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem'
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#10B981',
                  marginBottom: '0.5rem'
                }}>
                  {roadmapData.timeline.startDate}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)'
                }}>
                  Start Date
                </div>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem'
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#EF4444',
                  marginBottom: '0.5rem'
                }}>
                  {roadmapData.timeline.endDate}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)'
                }}>
                  Target End Date
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}>
                Key Milestones
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '0.75rem'
              }}>
                {roadmapData.timeline.milestones.map((milestone, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    backgroundColor: 'var(--card-background)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.375rem'
                  }}>
                    {getStatusIcon(milestone.status)}
                    <div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--text-primary)'
                      }}>
                        {milestone.milestone}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)'
                      }}>
                        {milestone.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Phases */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '1.5rem'
          }}>
            {roadmapData.phases.map((phase) => (
              <Card key={phase.id} padding="lg">
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      margin: 0,
                      marginBottom: '0.25rem'
                    }}>
                      Phase {phase.id}: {phase.title}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      margin: 0
                    }}>
                      {phase.description}
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    {getStatusIcon(phase.status)}
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: getStatusColor(phase.status)
                    }}>
                      {phase.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  padding: '0.5rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.375rem'
                }}>
                  <Clock size={14} style={{ color: 'var(--text-secondary)' }} />
                  <span style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)'
                  }}>
                    Duration: {phase.duration}
                  </span>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}>
                    Tasks
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {phase.tasks.map((task, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.5rem',
                        backgroundColor: 'var(--card-background)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '0.25rem'
                      }}>
                        <span style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-primary)'
                        }}>
                          {task.name}
                        </span>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <div style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: getPriorityColor(task.priority)
                          }} />
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: getStatusColor(task.status)
                          }}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}>
                    Resources
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.25rem'
                  }}>
                    {phase.resources.map((resource, index) => (
                      <span key={index} style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#3B82F6',
                        color: 'white',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}>
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Architecture View */}
      {viewMode === 'architecture' && (
        <div>
          <Card padding="lg">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <Map size={20} style={{ color: '#3B82F6' }} />
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                margin: 0
              }}>
                System Architecture
              </h3>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem'
            }}>
              {roadmapData.architecture.components.map((component, index) => (
                <div key={index} style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  backgroundColor: 'var(--card-background)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.75rem'
                  }}>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      margin: 0
                    }}>
                      {component.name}
                    </h4>
                    {getStatusIcon(component.status)}
                  </div>
                  
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    marginBottom: '0.75rem'
                  }}>
                    {component.description}
                  </p>
                  
                  <div>
                    <h5 style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: '0.5rem'
                    }}>
                      Technologies
                    </h5>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.25rem'
                    }}>
                      {component.technologies.map((tech, techIndex) => (
                        <span key={techIndex} style={{
                          padding: '0.25rem 0.5rem',
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--text-primary)',
                          borderRadius: '0.25rem',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Details View */}
      {viewMode === 'details' && (
        <div>
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {roadmapData.phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id)}
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: selectedPhase === phase.id ? '#3B82F6' : 'transparent',
                  color: selectedPhase === phase.id ? 'white' : 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                Phase {phase.id}
              </button>
            ))}
          </div>

          {roadmapData.phases
            .filter(phase => phase.id === selectedPhase)
            .map((phase) => (
              <div key={phase.id}>
                <Card padding="lg" style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.5rem'
                  }}>
                    <div>
                      <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        margin: 0,
                        marginBottom: '0.5rem'
                      }}>
                        {phase.title}
                      </h2>
                      <p style={{
                        fontSize: '1rem',
                        color: 'var(--text-secondary)',
                        margin: 0
                      }}>
                        {phase.description}
                      </p>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      {getStatusIcon(phase.status)}
                      <span style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: getStatusColor(phase.status)
                      }}>
                        {phase.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      padding: '1rem',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '0.5rem',
                      textAlign: 'center'
                    }}>
                      <Clock size={20} style={{ color: '#3B82F6', marginBottom: '0.5rem' }} />
                      <div style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        marginBottom: '0.25rem'
                      }}>
                        {phase.duration}
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)'
                      }}>
                        Duration
                      </div>
                    </div>
                    
                    <div style={{
                      padding: '1rem',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '0.5rem',
                      textAlign: 'center'
                    }}>
                      <Users size={20} style={{ color: '#10B981', marginBottom: '0.5rem' }} />
                      <div style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        marginBottom: '0.25rem'
                      }}>
                        {phase.resources.length}
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)'
                      }}>
                        Team Members
                      </div>
                    </div>
                  </div>
                </Card>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {/* Tasks */}
                  <Card padding="lg">
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: '1rem'
                    }}>
                      Tasks & Progress
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {phase.tasks.map((task, index) => (
                        <div key={index} style={{
                          padding: '0.75rem',
                          backgroundColor: 'var(--card-background)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '0.375rem'
                        }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.5rem'
                          }}>
                            <span style={{
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              color: 'var(--text-primary)'
                            }}>
                              {task.name}
                            </span>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}>
                              <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: getPriorityColor(task.priority)
                              }} />
                              <span style={{
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                color: getStatusColor(task.status)
                              }}>
                                {task.status}
                              </span>
                            </div>
                          </div>
                          <div style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-secondary)'
                          }}>
                            Priority: {task.priority}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Deliverables */}
                  <Card padding="lg">
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: '1rem'
                    }}>
                      Deliverables
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {phase.deliverables.map((deliverable, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem',
                          backgroundColor: 'var(--card-background)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '0.25rem'
                        }}>
                          <CheckCircle size={14} style={{ color: '#10B981' }} />
                          <span style={{
                            fontSize: '0.875rem',
                            color: 'var(--text-primary)'
                          }}>
                            {deliverable}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Risks */}
                  <Card padding="lg">
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: '1rem'
                    }}>
                      Risks & Mitigation
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {phase.risks.map((risk, index) => (
                        <div key={index} style={{
                          padding: '0.75rem',
                          backgroundColor: 'var(--card-background)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '0.375rem'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.5rem'
                          }}>
                            <AlertTriangle size={14} style={{ color: '#EF4444' }} />
                            <span style={{
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              color: 'var(--text-primary)'
                            }}>
                              {risk.risk}
                            </span>
                            <div style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: risk.impact === 'high' ? '#EF4444' : 
                                             risk.impact === 'medium' ? '#F59E0B' : '#10B981'
                            }} />
                          </div>
                          <p style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-secondary)',
                            margin: 0,
                            lineHeight: '1.4'
                          }}>
                            <strong>Mitigation:</strong> {risk.mitigation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ImplementationRoadmap;
