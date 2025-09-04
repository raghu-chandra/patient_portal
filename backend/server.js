const express = require('express');
const cors = require('cors');
const documentsRoutes = require('./routes/documentsRoutes');

const app = express();
const PORT = 5000;

// Allow CORS
app.use(cors());
app.use(express.json());

// Serve static files from uploads folder
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/documents', documentsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
