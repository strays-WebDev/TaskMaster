// model/task.js
// in order to make a task,
// we had to create an object for our task, this object has 4 different characteristics: owner,taks,  date, description
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, required: true},
    description: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, default: 'pending' }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
