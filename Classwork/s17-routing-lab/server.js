import express from 'express';
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import { AppError } from './utils/appError.js';
import { connectDB } from './config/db.js';
import { createUser } from './services/user-service.js';

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// TODO: Serve static files from the 'public' directory so index.html loads on http://localhost:3000
app.use(express.static('client'));

// TODO: Mount Routers
// Mount authRoutes on '/api/auth'
app.use("/api/auth", authRoutes);

// Mount apiRoutes on '/api/initiatives'
app.use("/api/initiatives", apiRoutes);

// Load environment variables from .env file
process.loadEnvFile();
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = "WebClass";

const mongoUrl = `mongodb+srv://${dbUser}:${dbPass}@cluster0.em6w7.mongodb.net/${dbName}`;
connectDB(mongoUrl);

// Mount routers

app.use("/api", protect, apiRoutes);
app.use("/api/auth", requireAdmin,authRoutes);
app.post("/user", (req, res) => {
    const { username, name, email, password } = req.body;
    if(!username || !email || !password) {
        return res.status(400).json({ error: 'username, email and password are required' });
    }
    createUser({ username, name, email, password })
        .then((user) => res.json(user))
        .catch((err)=> next(err));
});


// 404 Unhandled Route Handler
app.all("/{*splat}", (req, res, next) => {
    next(new AppError(`Cannot find route ${req.originalUrl} on this server!`, 404));
});

// Here ends the mongoDB connection code. The rest of the code is for the Express server and routes.

// Centralized Global Error Handler
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`🚀 SustainHub Server running at http://localhost:${PORT}`);
});
