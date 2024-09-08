const Task = require('../models/taskModel');

const createTaskService = async (id, title, description, date) => {

    const task = await Task.create({
        id, title, description, date
    });

    return task;
};

const deleteTaskService = async (id) => {

    const deletedTask = await Task.deleteOne(id);

    return deletedTask;
};

const updateTaskService = async (filter, update, properties) => {

    const updatedTask = await Task.findOneAndUpdate(filter, update, properties);

    return updatedTask;
};


module.exports = { createTaskService, deleteTaskService, updateTaskService };
