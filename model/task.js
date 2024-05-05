//task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, default: 'pending' }  

    
});

const Task = mongoose.model('Task', taskSchema);



module.exports = Task;
