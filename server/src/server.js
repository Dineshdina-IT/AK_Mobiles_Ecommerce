require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Check required environment variables
if (!process.env.MONGODB_URI) {
  console.error('ERROR: MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

// Set default JWT_SECRET if not provided (for development)
if (!process.env.JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET is not defined, using default (not recommended for production)');
  process.env.JWT_SECRET = 'akmobiles-default-jwt-secret-change-in-production';
}

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
