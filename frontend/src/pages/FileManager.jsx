import React, { useEffect, useState } from 'react';
import { useFiles } from '@/contexts/FileContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { FileText, Trash2, UploadCloud, ArrowDownToLine, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const FileManager = () => {
  const { files, fetchFiles, uploadFile, deleteFile, downloadFile, toggleFavorite } = useFiles();
  const { addNotification } = useNotifications();

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      addNotification({
        type: 'error',
        title: 'Invalid File Type',
        message: 'Please upload PDF files only.',
      });
      e.target.value = null;
      return;
    }

    setUploading(true);
    try {
      await uploadFile(file);
      addNotification({
        type: 'success',
        title: 'Upload Successful',
        message: `${file.name} uploaded!`,
      });
      await fetchFiles();
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Upload Failed',
        message: 'Could not upload file. Try again later.',
      });
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };

  const handleDelete = async (fileId, fileName) => {
    try {
      await deleteFile(fileId);
      addNotification({
        type: 'info',
        title: 'File Deleted',
        message: `${fileName} was removed.`,
      });
      await fetchFiles();
    } catch {
      addNotification({
        type: 'error',
        title: 'Delete Failed',
        message: 'Could not delete file. Try again later.',
      });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">File Manager</h1>

      <label className="cursor-pointer inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        <UploadCloud className="w-5 h-5" />
        <span>{uploading ? 'Uploading...' : 'Upload New File'}</span>
        <input
          type="file"
          className="hidden"
          onChange={handleFileUpload}
          disabled={uploading}
          accept="application/pdf"
        />
      </label>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {files.length ? (
          files.map((file) => (
            <Card key={file.id} className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <div>
                  <a
                    href={file.public_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold truncate max-w-xs text-blue-600 hover:underline"
                  >
                    {file.filename}
                  </a>
                  <p className="text-xs text-muted-foreground">
                    {new Date(file.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => downloadFile(file.id)}
                  aria-label={`Download ${file.filename}`}
                >
                  <ArrowDownToLine className="w-4 h-4 text-green-600" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(file.id)}  // Pass id only!
                  aria-label={`Favorite ${file.filename}`}
                >
                  <Heart
                    className={`w-4 h-4 cursor-pointer transition-colors ${
                      file.favorite ? 'text-red-500 fill-current' : 'text-gray-400'
                    }`}
                  />
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(file.id, file.filename)}
                  aria-label={`Delete ${file.filename}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted-foreground col-span-full">
            No files uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default FileManager;
