import { useState } from "react";
import {
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";
import DeleteModal from "./DeleteModal";
import "../styles/TaskCard.css";

function TaskCard({ task, onEdit }) {
  const { deleteTask, updateTask } = useAuth();

  const [showDelete, setShowDelete] = useState(false);

  const handleComplete = async () => {
    if (task.status === "Completed") {
      toast.info("Task already completed");
      return;
    }

    const success = await updateTask(task._id, {
      ...task,
      status: "Completed",
    });

    if (success) {
      toast.success("Task marked as Completed 🎉");
    } else {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async () => {
    const success = await deleteTask(task._id);

    if (success) {
      toast.success("Task Deleted Successfully 🗑️");
      setShowDelete(false);
    } else {
      toast.error("Unable to delete task");
    }
  };

  return (
    <>
      <div className="task-card">

        <div className="task-header">

          <h2>{task.title}</h2>

          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>

        </div>

        <p className="task-description">
          {task.description}
        </p>

        <div className="task-info">

          <span className="status">
            {task.status}
          </span>

          <span className="category">
            {task.category}
          </span>

        </div>

        <div className="task-date">
          <FaCalendarAlt />

          <span>
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>

        <div className="task-buttons">

          <button
            className="complete-btn"
            onClick={handleComplete}
            disabled={task.status === "Completed"}
          >
            <FaCheckCircle />

            {task.status === "Completed"
              ? "Completed"
              : "Complete"}
          </button>

          <button
            className="edit-btn"
            onClick={() => onEdit(task)}
          >
            <FaEdit />
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => setShowDelete(true)}
          >
            <FaTrash />
            Delete
          </button>

        </div>

      </div>

      {showDelete && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </>
  );
}

export default TaskCard;