import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const FileContext = createContext();

export const useFiles = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFiles must be used within a FileProvider');
  }
  return context;
};

// Backend call to update favorite status
const updateFileFavorite = async (id, favorite) => {
  return axios.post(`http://localhost:5000/documents/${id}/favorite`, { favorite });
};

const calculateStats = (files) => {
  const categoryCounts = {};
  let totalSize = 0;

  files.forEach((file) => {
    const ext = file.filename.split('.').pop().toLowerCase();
    categoryCounts[ext] = (categoryCounts[ext] || 0) + 1;
    totalSize += Number(file.filesize) || 0;
  });

  return {
    categoryCounts,
    totalFiles: files.length,
    totalSize,
  };
};

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/documents');
      setFiles(response.data.documents || []);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        setFiles((prev) => [response.data.document, ...prev]);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const deleteFile = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/documents/${id}`);
      setFiles((prev) => prev.filter((file) => file.id !== id));
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  };

  const downloadFile = (id) => {
    window.open(`http://localhost:5000/documents/${id}/download`, '_blank');
  };

  const getRecentFiles = (limit = 3) => {
    return [...files]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, limit);
  };

  const toggleFavorite = async (id) => {
    try {
      const file = files.find(f => f.id === id);
      if (!file) return;

      const newFavorite = !file.favorite;

      // Optimistic UI update
      setFiles(prevFiles =>
        prevFiles.map(f =>
          f.id === id ? { ...f, favorite: newFavorite } : f
        )
      );

      await updateFileFavorite(id, newFavorite);

      // Optional: fetchFiles(); to sync with backend

    } catch (error) {
      console.error('Failed to toggle favorite', error);
      await fetchFiles(); // revert if failed
    }
  };

  const stats = useMemo(() => calculateStats(files), [files]);

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <FileContext.Provider
      value={{
        files,
        fetchFiles,
        uploadFile,
        deleteFile,
        getRecentFiles,
        downloadFile,
        toggleFavorite,
        stats,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
