import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import fannRoutes from './routes/fannRoutes.js';
import pubgRoutes from './routes/pubgRoutes.js';
import tiktokRoutes from './routes/tiktokRoutes.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';

dotenv.config();

const app = express();
const server = http.createServer(app);

// --- 1. LIMIT ARTIRILMASI (413 Xətası üçün) ---
// Göndərilən json və urlencoded datasının limitini artırırıq (məsələn: 50mb)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- 2. CORS AYARLARI ---
app.use(cors({
  // İcazə verilən origin-ləri bura əlavə et
  origin: [
    "https://grezzadmin-ha9m.vercel.app",
    
    "https://grez.az",
    "https://www.grez.az"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(cookieParser());

const PORT = process.env.PORT || 5000;

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/fann', fannRoutes);
app.use('/api/pubg', pubgRoutes);
app.use('/api/tiktok', tiktokRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

// Vercel-də işləyərkən server.listen yerinə export istifadə olunması tövsiyə edilir
// Amma yerli test üçün bu qalsın:
if (process.env.NODE_ENV !== 'production') {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
