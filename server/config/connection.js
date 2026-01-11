import mongoose from "mongoose";
export const connectDB = async () => {
    try{
        const connection = await mongoose.connect(`${'mongodb://127.0.0.1:27017/mini-mart-db'}/mern-auth`).then(() => {
          console.log('MONGODB connected successfully');
        }
        )
    }
    catch(err){
         console.log('MongoDB connection failed',err);
    }
}
export default connectDB();