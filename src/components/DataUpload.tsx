import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { apiService, handleApiError } from '../services/api';

interface DataUploadProps {
  onUploadSuccess?: () => void;
}

export const DataUpload: React.FC<DataUploadProps> = ({ onUploadSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadStats, setUploadStats] = useState<{
    recordsProcessed?: number;
    recordsSuccessful?: number;
    recordsFailed?: number;
  }>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      setUploadStatus('error');
      setUploadMessage('Please select a CSV file');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus('error');
      setUploadMessage('File size must be less than 10MB');
      return;
    }

    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setUploadStatus('idle');
    setUploadMessage('');

    try {
      const result = await apiService.uploadData(file);
      
      setUploadStatus('success');
      setUploadMessage(result.message);
      setUploadStats({
        recordsProcessed: result.records_processed,
        recordsSuccessful: result.records_processed, // Assuming all successful for now
        recordsFailed: 0,
      });

      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      const errorInfo = handleApiError(error);
      setUploadStatus('error');
      setUploadMessage(errorInfo.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.name.endsWith('.csv')) {
        uploadFile(file);
      } else {
        setUploadStatus('error');
        setUploadMessage('Please drop a CSV file');
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const resetUpload = () => {
    setUploadStatus('idle');
    setUploadMessage('');
    setUploadStats({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
        <Upload size={20} color="var(--text-primary)" />
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          margin: 0,
        }}>
          Upload Customer Data
        </h3>
      </div>

      <div
        style={{
          border: '2px dashed var(--border-color)',
          borderRadius: '0.5rem',
          padding: '2rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          backgroundColor: uploadStatus === 'success' ? 'rgba(16, 185, 129, 0.1)' : 
                          uploadStatus === 'error' ? 'rgba(239, 68, 68, 0.1)' : 
                          'transparent',
          borderColor: uploadStatus === 'success' ? '#10B981' : 
                      uploadStatus === 'error' ? '#EF4444' : 
                      'var(--border-color)',
        }}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {isUploading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <Loader className="animate-spin" size={32} color="var(--text-secondary)" />
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Uploading and processing data...
            </p>
          </div>
        ) : uploadStatus === 'success' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={32} color="#10B981" />
            <p style={{ color: '#10B981', margin: 0, fontWeight: '500' }}>
              Upload Successful!
            </p>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.875rem' }}>
              {uploadMessage}
            </p>
            {uploadStats.recordsProcessed && (
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Processed: {uploadStats.recordsProcessed} records
              </div>
            )}
          </div>
        ) : uploadStatus === 'error' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={32} color="#EF4444" />
            <p style={{ color: '#EF4444', margin: 0, fontWeight: '500' }}>
              Upload Failed
            </p>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.875rem' }}>
              {uploadMessage}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={32} color="var(--text-secondary)" />
            <p style={{ color: 'var(--text-primary)', margin: 0, fontWeight: '500' }}>
              Drop CSV file here or click to browse
            </p>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.875rem' }}>
              Maximum file size: 10MB
            </p>
          </div>
        )}
      </div>

      {uploadStatus !== 'idle' && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem',
        }}>
          <button
            onClick={resetUpload}
            style={{
              backgroundColor: 'var(--button-background)',
              color: 'var(--button-text)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.375rem',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--button-hover)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--button-background)';
            }}
          >
            Upload Another File
          </button>
        </div>
      )}

      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: 'var(--background-secondary)',
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
        color: 'var(--text-secondary)',
      }}>
        <strong>CSV Format Requirements:</strong>
        <ul style={{ margin: '0.5rem 0 0 1rem', padding: 0 }}>
          <li>Required columns: customer_id, name, email</li>
          <li>Optional columns: age, income, location, purchase_history</li>
          <li>First row should contain column headers</li>
          <li>Data should be comma-separated</li>
        </ul>
      </div>
    </div>
  );
};
