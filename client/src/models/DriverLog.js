import mongoose from "mongoose";

const driverLogSchema = new mongoose.Schema({
    driverID: {type: String, required: true, unique: true},
    total_filled: {type: Number, required: true},
    total_cost: {type: Number, required: true}
})

export const driverLogModel = mongoose.model.driverLog || mongoose.model('driverLog', driverLogSchema);

export default driverLogModel;