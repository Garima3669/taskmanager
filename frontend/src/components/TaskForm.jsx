import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import "../styles/TaskForm.css";

function TaskForm({ closeForm, task }) {
  const { addTask, updateTask } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Personal",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        category: task.category,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate
          ? task.dueDate.substring(0, 10)
          : "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (!formData.dueDate) {
      toast.error("Due Date is required");
      return;
    }

    let success = false;

    if (task) {
      success = await updateTask(task._id, formData);

      if (success) toast.success("Task Updated Successfully");
    } else {
      success = await addTask(formData);

      if (success) toast.success("Task Created Successfully");
    }

    if (success) closeForm();
  };

  return (
    <div className="modal">

      <div className="task-form">

        <div className="form-header">

          <div>

            <h2>
              {task ? "Edit Task" : "Create Task"}
            </h2>

            <p className="form-subtitle">
              Organize your work efficiently
            </p>

          </div>

          <button
            className="close-btn"
            onClick={closeForm}
          >
            <FaTimes />
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Title</label>

            <input
              type="text"
              name="title"
              placeholder="Enter task title"
              value={formData.title}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Description</label>

            <textarea
              name="description"
              placeholder="Write task description..."
              value={formData.description}
              onChange={handleChange}
            />

          </div>

          <div className="two-column">

            <div className="form-group">

              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Personal</option>
                <option>Work</option>
                <option>Study</option>
                <option>Shopping</option>
              </select>

            </div>

            <div className="form-group">

              <label>Priority</label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

            </div>

          </div>

          <div className="two-column">

            <div className="form-group">

              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

            </div>

            <div className="form-group">

              <label>Due Date</label>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="form-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={closeForm}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              {task ? "Update Task" : "Create Task"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default TaskForm;