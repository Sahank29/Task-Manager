const express = require("express");
const {
    getTask, createTask, deleteTask, updateTask
} = require("../controllers/taskController");

const validateToken = require("../middleware/validateToken");

const router = express.Router();

router.use(validateToken);
router.route("/").get(getTask).post(createTask);
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);
module.exports = router;