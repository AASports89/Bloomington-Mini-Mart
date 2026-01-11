import mongoose from 'mongoose';
import userModel from './models/User.js';
import userSeeds from './userSeeds.js';

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mini-mart-db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  
);

await userModel.deleteMany({});
  
const users = await userModel.create(userSeeds);
  
console.log(users);
process.exit(0);