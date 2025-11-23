// server.js - Complete Backend for TinyLink
const express = require("express");
const cors = require('cors');

const {initDB} = require('./initDB.js');
const { postController ,getAllLinkController,deleteLinksCodeController, getStats, getRedirect, getHealth } = require('./controller.js');
require('dotenv').config();
const {pool} = require('./db');    

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection


// Initialize database table






// Health check endpoint
app.get('/healthz', getHealth);

// API Routes
// Create a new link
app.post('/api/links', postController);

// Get all links
app.get('/api/links', getAllLinkController);

// Get stats for a specific link
app.get('/api/links/:code', getStats);

// Delete a link
app.delete('/api/links/:code', deleteLinksCodeController);

// Redirect handler - THIS MUST BE LAST
app.get('/:code', getRedirect);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});



// Start server
app.listen(PORT, async () => {
  
  await initDB();
  console.log("success");
  console.log(`🚀 TinyLink backend running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/healthz`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server...');
  await pool.end();
  process.exit(0);
});