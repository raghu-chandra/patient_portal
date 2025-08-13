const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const {
  uploadDocument,
  listDocuments,
  downloadDocument,
  deleteDocument,
  favoriteDocument,   // add this here
} = require('../controllers/documentsController');

router.post('/upload', upload.single('file'), uploadDocument);
router.get('/', listDocuments);
router.get('/:id/download', downloadDocument);
router.delete('/:id', deleteDocument);
router.post('/:id/favorite', favoriteDocument);


module.exports = router;
