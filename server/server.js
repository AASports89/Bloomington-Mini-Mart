// REAL IMPORT
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import path from 'path';
import cookieParser from 'cookie-parser';
// import mongoose from 'mongoose';

// IMPORTED FROM FOLDERS
import { connectDB } from './config/connection.js';
import { authRouter } from './routes/authRoutes.js'
import userRouter from './routes/userRoute.js';

const server = new ApolloServer({
  context: authRouter,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const app = express();
const PORT = process.env.PORT || 3001;

connectDB({
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

// mongoose.connect(
  // process.env.MONGODB_URI || 'mongodb://localhost:27017/shell-gas-db',
  // {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // }
  
// );

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  // 'http://localhost:3001',
  'https://mern-authentication-system-jw.vercel.app',
  'https://mern-authentication-system-using-jwt-and.vercel.app'
];

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like curl, mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.listen(PORT, ()=> {
    console.log(`server is running on port http://localhost:${PORT}`);
}
)

const startServer = async (req, res) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Network sever @ http://localhost:${PORT}${server}`);
    })
  })
  };
  
// Call the async function to start the server
  startServer();