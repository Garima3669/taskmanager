import Task from "../models/Task.js";

// ================= CREATE TASK =================
export const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            priority,
            status,
            category,
            dueDate,
        } = req.body;

        if (!title || !description || !dueDate) {
            return res.status(400).json({
                success: false,
                message: "Title, Description and Due Date are required.",
            });
        }

        const task = await Task.create({
            title,
            description,
            priority,
            status,
            category,
            dueDate,
            owner: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= GET ALL TASKS =================
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            owner: req.user._id,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= GET SINGLE TASK =================
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= UPDATE TASK =================
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                owner: req.user._id,
            },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= DELETE TASK =================
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= UPDATE STATUS =================
export const updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                owner: req.user._id,
            },
            { status },
            {
                new: true,
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Task status updated",
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};