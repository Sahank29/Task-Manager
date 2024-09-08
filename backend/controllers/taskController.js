const asyncHandler = require("express-async-handler");
const Task = require('../models/taskModel');
const { createTaskService, deleteTaskService, updateTaskService } = require('../services/taskService');

//@desc Update Task
//@route PUT /api/task/:id
//@access private
const updateTask = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { title, description, date, status } = req.body;

    const result = await updateTaskService({ id: id },
        { title, description, date, status },
        {
            upsert: false,
            returnDocument: 'after',
            returnNewDocument: false,
        });

    if (result) {
        res.status(200).json({ status: 204, message: "Task updated successfully", task: result });
    } else {
        res.status(200).json({ status: 405, message: "Task not found" });
    }

});

//@desc delete Task
//@route delete /api/task/:id
//@access private
const deleteTask = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const result = await deleteTaskService({ id: id });

        if (result) {
            res.status(200).json({ status: 202, message: "Task deleted successfully", task: result });
        } else {
            res.status(200).json({ status: 203, message: "Task not found" });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Problem from the Server. Please try again later' });
    }
});

//@desc Create Task
//@route POST /api/task/
//@access private
const createTask = asyncHandler(async (req, res) => {
    try {
        const { id, title, description, date } = req.body;

        const result = await createTaskService(id, title, description, date);

        if (result) {
            res.status(200).json({ status: 200 });
        } else {
            res.status(200).json({ status: 201 });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Problem from the Server. Please try again later' });
    }
});

// @desc Get tasks grouped by status using aggregation
// @route GET /api/tasks
// @access Private
const getTask = asyncHandler(async (req, res) => {
    try {
        const tasks = await Task.aggregate([
            {
                $group: {
                    _id: "$status",
                    tasks: {
                        $push: {
                            id: "$id",
                            title: "$title",
                            description: "$description",
                            date: "$date",
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    status: "$_id",
                    tasks: 1,
                },
            },
        ]);

        const groupedTasks = {
            TODO: [],
            "IN PROGRESS": [],
            DONE: [],
        };

        tasks.forEach((group) => {
            if (group.status === "TODO") {
                groupedTasks.TODO = group.tasks;
            } else if (group.status === "IN PROGRESS") {
                groupedTasks["IN PROGRESS"] = group.tasks;
            } else if (group.status === "DONE") {
                groupedTasks.DONE = group.tasks;
            }
        });

        res.status(200).json(groupedTasks);
    } catch (error) {
        res.status(500).json({ status: 500, message: "Problem from the Server. Please try again later", error: error.message });
    }
});



module.exports = { getTask, createTask, deleteTask, updateTask };