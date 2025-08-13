const fs = require('fs');
const path = require('path');
const pool = require('../db');
// Upload document
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded or invalid file type.' });
    }

    const { filename, size: filesize } = req.file;

    // Build actual disk path
    const disk_path = path.join(__dirname, '..', 'uploads', filename);

    // Build public URL
    const public_url = `${req.protocol}://${req.get('host')}/uploads/${filename}`;

    console.log('filename:', filename);
    console.log('public_url to store:', public_url);
    console.log('disk_path to store:', disk_path);

    // Store in DB
    const query = `
      INSERT INTO documents (filename, filesize, public_url, disk_path)
      VALUES ($1, $2, $3, $4)
      RETURNING id, filename, filesize, public_url, created_at
    `;
    const values = [filename, filesize, public_url, disk_path];
    const result = await pool.query(query, values);

    res.status(201).json({ document: result.rows[0] });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file.' });
  }
};

// List all documents
const listDocuments = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, filename, filesize, public_url, created_at, favorite FROM documents ORDER BY created_at DESC'
    );
    res.json({ documents: result.rows });
  } catch (error) {
    console.error('Fetch documents error:', error);
    res.status(500).json({ error: 'Failed to fetch documents.' });
  }
};

// Download document
const downloadDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT filename, disk_path FROM documents WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found.' });
    }

    const { filename, disk_path } = result.rows[0];
    res.download(disk_path, filename);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to download file.' });
  }
};

// Delete document
const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT disk_path FROM documents WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found.' });
    }

    const { disk_path } = result.rows[0];
    fs.unlink(disk_path, async (err) => {
      if (err) {
        console.error('File delete error:', err);
        return res.status(500).json({ error: 'Failed to delete file.' });
      }
      await pool.query('DELETE FROM documents WHERE id = $1', [id]);
      res.json({ message: 'Document deleted successfully.' });
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete document.' });
  }
};
// In your backend routes file, e.g. documents.js or app.js

const favoriteDocument = async (req, res) => {
  const fileId = parseInt(req.params.id); // convert id to number
  const { favorite } = req.body;

  if (typeof favorite !== 'boolean') {
    return res.status(400).json({ error: 'Invalid favorite value' });
  }

  try {
    const result = await pool.query(
      'UPDATE documents SET favorite = $1 WHERE id = $2 RETURNING *',
      [favorite, fileId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.json({ message: 'Favorite updated', file: result.rows[0] });
  } catch (err) {
    console.error('Failed to update favorite:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
  uploadDocument,
  listDocuments,
  downloadDocument,
  deleteDocument,
  favoriteDocument
};
