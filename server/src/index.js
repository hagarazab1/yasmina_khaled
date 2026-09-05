import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Headers
app.use(helmet());

// Cross-Origin Resource Sharing (Allows external origins to connect)
app.use(cors());

// Body Parsing
app.use(express.json());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per window
  message: {
    success: false,
    message: 'كتمنا الطلبات مؤقتاً لحمايتك 💖 حاول بعد قليل'
  }
});
app.use('/api/', limiter);

// API Routes
app.use('/api', authRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Centralized Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`💖 Server running smoothly on http://localhost:${PORT}`);
});
