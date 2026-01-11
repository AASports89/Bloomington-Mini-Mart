import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import driverLogModel from "./DriverLog";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},

    // verifyOtp: {type: String, default:''},
    // verifyOtpExpireAt: {type: Number, default:0},

    isAdmin:{type:Boolean, default:false},

    driverLogModel

    // resetOtp: {type: String, default:''},
    // resetOtpExpireAt: {type: Number, default:0},

})

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

  userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export const userModel = mongoose.model.user || mongoose.model('user', userSchema);

export default userModel;