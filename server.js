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


app.use(express.json());
app.use(cors({
    origin: '*',
   
   
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT;

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/fann', fannRoutes);
app.use('/api/pubg', pubgRoutes);
app.use('/api/tiktok', tiktokRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome",
    });
});


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

