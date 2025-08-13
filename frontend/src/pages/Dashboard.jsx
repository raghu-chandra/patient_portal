import React, { useRef, useState, useEffect } from 'react';
import {
  FileText,
  Upload,
  Download,
  Heart,
  TrendingUp,
  Calendar,
  Clock,
  Users,
  Shield,
  Activity,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFiles } from '@/contexts/FileContext';
import { useUser } from '@/contexts/UserContext';
import { useNotifications } from '@/contexts/NotificationContext';

const Dashboard = () => {
  const { files, uploadFile, getRecentFiles, toggleFavorite } = useFiles();
  const { user } = useUser();
  const { addNotification } = useNotifications();
  const recentFiles = getRecentFiles(3);

  const fileInputRef = useRef(null);

  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showHealthSummary, setShowHealthSummary] = useState(false);
  const [showShareFiles, setShowShareFiles] = useState(false);
  const [selectedShareFiles, setSelectedShareFiles] = useState([]);

  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  // Calculate stats dynamically from files
  // Import stats directly from useFiles
const stats = {
    totalFiles: files.length,
    totalSize: files.reduce((acc, f) => acc + (Number(f.filesize) || 0), 0),
    favoriteFiles: files.filter((f) => f.favorite).length,
    recentFiles: getRecentFiles(7).length,
    categoryCounts: files.reduce((acc, f) => {
      if (!f) return acc; // skip if file is undefined/null
      const category = f.category || (f.filename ? f.filename.split('.').pop().toLowerCase() : 'unknown');
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {}),
  };

  const formatFileSize = (bytes) => {
  if (!bytes || bytes < 1) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
};


  // Use context uploadFile function to upload and notify
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      addNotification({
        type: 'error',
        title: 'Invalid File Type',
        message: 'Please upload a PDF file only.',
      });
      event.target.value = null;
      return;
    }

    try {
      await uploadFile(file);
      addNotification({
        type: 'success',
        title: 'Upload Successful',
        message: `${file.name} uploaded successfully!`,
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Upload Error',
        message: error.response?.data?.error || 'Upload failed. Please try again.',
      });
    }

    event.target.value = null; // reset input so same file can be selected again
  };

  // Appointment form submission
  const submitAppointment = (e) => {
    e.preventDefault();
    if (!appointmentDate || !appointmentTime) {
      addNotification({
        type: 'error',
        title: 'Missing Information',
        message: 'Please select both date and time',
      });
      return;
    }

    // TODO: Connect with backend API to save appointment

    addNotification({
      type: 'success',
      title: 'Appointment Scheduled',
      message: `Your appointment is set for ${appointmentDate} at ${appointmentTime}`,
    });

    setShowAppointmentModal(false);
    setAppointmentDate('');
    setAppointmentTime('');
  };

  // Toggle file selection in share modal
  const toggleShareFile = (fileId) => {
    setSelectedShareFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  // Submit sharing files
  const submitShareFiles = () => {
    if (selectedShareFiles.length === 0) {
      addNotification({
        type: 'error',
        title: 'No Files Selected',
        message: 'Please select files to share',
      });
      return;
    }

    // TODO: Add real sharing logic

    addNotification({
      type: 'success',
      title: 'Files Shared',
      message: `${selectedShareFiles.length} file(s) shared with your healthcare team`,
    });

    setShowShareFiles(false);
    setSelectedShareFiles([]);
  };

  // Dummy health summary data (replace with real)
  const healthSummaryData = {
    heartRate: '72 bpm',
    bloodPressure: '120/80 mmHg',
    lastCheckup: '2025-08-01',
    bmi: '22.5',
  };

  const quickActions = [
    {
      icon: Upload,
      title: 'Upload Document',
      description: 'Add new medical files',
      action: () => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      },
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Calendar,
      title: 'Schedule Appointment',
      description: 'Book with healthcare provider',
      action: () => setShowAppointmentModal(true),
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Activity,
      title: 'Health Summary',
      description: 'View your health overview',
      action: () => setShowHealthSummary(true),
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Users,
      title: 'Share Files',
      description: 'Share with healthcare team',
      action: () => setShowShareFiles(true),
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Hidden file input for PDF upload */}
      <input
        type="file"
        accept="application/pdf"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileSelect}
      />

      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's what's happening with your health documents today
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Badge className="bg-green-500/10 text-green-700 border-green-200">
            <Shield className="h-3 w-3 mr-1" />
            Secure & Protected
          </Badge>
          <Badge className="bg-blue-500/10 text-blue-700 border-blue-200">
            <Clock className="h-3 w-3 mr-1" />
            Real time Sync
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: FileText,
            label: 'Total Documents',
            value: stats.totalFiles.toString(),
            change: 'Increase from last week',
            changeType: 'positive',
          },
          {
            icon: Download,
            label: 'Storage Used',
            value: formatFileSize(stats.totalSize),
            change: '12% of limit',
            changeType: 'neutral',
          },
          {
            icon: Heart,
            label: 'Favorite Files',
            value: stats.favoriteFiles.toString(),
            change: 'Quick access',
            changeType: 'positive',
          },
          {
            icon: TrendingUp,
            label: 'This Week',
            value: stats.recentFiles.toString(),
            change: 'New uploads',
            changeType: 'positive',
          },
        ].map((stat, index) => (
          <Card
            key={index}
            className="p-6 border-primary/20 hover:border-primary/40 transition-all duration-300 hover-scale"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p
                  className={`text-xs mt-1 ${
                    stat.changeType === 'positive'
                      ? 'text-green-600'
                      : stat.changeType === 'negative'
                      ? 'text-red-600'
                      : 'text-muted-foreground'
                  }`}
                >
                  {stat.change}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6 border-primary/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <Badge variant="secondary">Shortcuts</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 border-primary/20 hover:border-primary/40 hover-scale group"
              onClick={action.action}
            >
              <div className="text-center space-y-3">
                <div
                  className={`w-12 h-12 mx-auto rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Files */}
        <Card className="lg:col-span-2 p-6 border-primary/20">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-xl font-semibold">Recent Documents</h2>
    <Badge variant="secondary">{stats.totalFiles} Total</Badge>
  </div>

  {recentFiles.length > 0 ? (
    <div className="space-y-4">
      {recentFiles.map((file, index) => (
        <div
          key={file.id}
          className="flex items-center space-x-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            {/* Clickable filename link opening PDF in new tab */}
            <a
              href={file.public_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold truncate max-w-xs text-blue-600 hover:underline"
            >
              {file.filename}
            </a>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
              <Badge className="px-2 py-0.5 text-xs" variant="secondary">
                {file.category || (file.filename ? file.filename.split('.').pop().toLowerCase() : 'unknown')}
              </Badge>
              <span>{formatFileSize(file.filesize)}</span>
            </div>
          </div>
          {file.favorite && (
            <Heart className="h-4 w-4 text-red-500 fill-current flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-8 text-muted-foreground">
      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
      <p>No documents uploaded yet</p>
      <p className="text-sm">
        Start by uploading your first medical document
      </p>
    </div>
  )}
</Card>
        {/* Health Insights */}
        <Card className="p-6 border-primary/20">
          <h2 className="text-xl font-semibold mb-6">Health Insights</h2>

          <div className="space-y-6">
            {/* Document Categories */}
            <div>
              <h3 className="font-medium mb-3 text-sm">Document Categories</h3>
              <div className="space-y-2">
                {Object.entries(stats.categoryCounts).map(([category, count]) => (
  <div key={category} className="flex justify-between items-center">
    <span className="text-sm text-muted-foreground">{category}</span>
    <Badge variant="outline" className="text-xs">
      {count}
    </Badge>
  </div>
))}
{Object.keys(stats.categoryCounts).length === 0 && (
  <p className="text-sm text-muted-foreground">No categories yet</p>
)}
              </div>
            </div>
            {/* Storage Usage */}
            <div>
  <h3 className="font-medium mb-3 text-sm">Storage Usage</h3>
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span className="text-muted-foreground">Used</span>
    <span className="font-medium">{formatFileSize(stats.totalSize)}</span>
  </div>
  <div className="w-full bg-muted rounded-full h-2">
    <div
      className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
      style={{
        width: `${Math.min((stats.totalSize / (100 * 1024 * 1024)) * 100, 100)}%`,
      }}
    />
  </div>
  <p className="text-xs text-muted-foreground">
    {((stats.totalSize / (100 * 1024 * 1024)) * 100).toFixed(1)}% of 100MB used
  </p>
</div>
</div>
          </div>
        </Card>
      </div>

      {/* Appointment Modal */}
      {showAppointmentModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="rounded-lg p-6 max-w-md w-full  bg-white text-black dark:bg-black dark:text-white">
      <h3 className="text-lg font-semibold mb-4 ">Schedule Appointment</h3>
      <form onSubmit={submitAppointment} className="space-y-4 ">
        <div>
          <label className="block mb-1 text-sm font-medium">Date</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="w-full rounded border px-3 py-2 bg-white text-black dark:bg-black dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-black dark:text-white">Time</label>
          <input
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            className="w-full rounded border px-3 py-2 bg-white text-black dark:bg-black dark:text-white"
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="px-4 py-2 rounded border hover:bg-gray-100"
            onClick={() => setShowAppointmentModal(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Schedule
          </button>
        </div>
      </form>
    </div>
  </div>
      )}

      {/* Health Summary Modal */}
      {showHealthSummary && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="rounded-lg p-6 max-w-sm w-full  bg-white text-black dark:bg-black dark:text-white">
      <h3 className="text-lg font-semibold mb-4">Health Summary</h3>
      <ul className="space-y-2 text-sm">
        <li>
          <strong>Heart Rate:</strong> {healthSummaryData.heartRate}
        </li>
        <li>
          <strong>Blood Pressure:</strong> {healthSummaryData.bloodPressure}
        </li>
        <li>
          <strong>Last Checkup:</strong> {healthSummaryData.lastCheckup}
        </li>
        <li>
          <strong>BMI:</strong> {healthSummaryData.bmi}
        </li>
      </ul>
      <div className="flex justify-end mt-6">
        <button
          className="px-4 py-2 rounded border hover:bg-gray-100"
          onClick={() => setShowHealthSummary(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

      {/* Share Files Modal */}
{showShareFiles && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-auto">
      <h3 className="text-lg font-semibold mb-4">Share Files</h3>
      {recentFiles.length === 0 ? (
        <p className="text-sm text-muted-foreground">No files to share.</p>
      ) : (
        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {recentFiles.map((file) => (
            <li key={file.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`share-file-${file.id}`}
                checked={selectedShareFiles.includes(file.id)}
                onChange={() => toggleShareFile(file.id)}
              />
              <label
                htmlFor={`share-file-${file.id}`}
                className="truncate cursor-pointer"
              >
                {file.name}
              </label>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-end mt-6 space-x-2">
        <button
          className="px-4 py-2 rounded border hover:bg-gray-100"
          onClick={() => setShowShareFiles(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700"
          onClick={submitShareFiles}
        >
          Share
        </button>
      </div>
    </div>
  </div>
      )}
    </div>
  );
};

export default Dashboard;
