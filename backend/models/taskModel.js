const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: [true],
        },
        title: {
            type: String,
            required: [true],
        },
        description: {
            type: String,
            required: [true],
        },
        date: {
            type: String,
            required: [true],
        },
        status: {
            type: String,
            enum: ['TODO', 'IN PROGRESS', 'DONE'],
            default: "TODO"
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("task", taskSchema);