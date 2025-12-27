const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const logSchema = new Schema({
    total_fill: {
            type: Number,
            required: true
        },
    total_cost: {
            type: Number,
            required: true
        },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
});

const DriverLog = model('DriverLog', logSchema);

module.exports = DriverLog;