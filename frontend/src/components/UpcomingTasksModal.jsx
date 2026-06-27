import { FaTimes, FaCalendarAlt } from "react-icons/fa";
import "../styles/UpcomingTasksModal.css";

function UpcomingTasksModal({ tasks, onClose }) {
  return (
    <div className="upcoming-modal-overlay">

      <div className="upcoming-modal">

        {/* Header */}

        <div className="upcoming-modal-header">

          <h2>Upcoming Deadlines</h2>

          <button
            className="close-modal-btn"
            onClick={onClose}
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}

        <div className="upcoming-modal-body">

          {tasks.length === 0 ? (

            <div className="empty-upcoming">

              <span>🎉</span>

              <h3>No Upcoming Tasks</h3>

              <p>You're all caught up!</p>

            </div>

          ) : (

            tasks.map((task) => (

              <div
                key={task._id}
                className="modal-task-card"
              >

                <div className="modal-task-left">

                  <span
                    className={`priority-dot ${task.priority.toLowerCase()}`}
                  ></span>

                  <div>

                    <h4>{task.title}</h4>

                    <p>{task.category}</p>

                  </div>

                </div>

                <div className="modal-task-right">

                  <div className="modal-date">

                    <FaCalendarAlt />

                    <span>
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>

                  </div>

                  <span
                    className={`modal-status ${task.status
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                  >
                    {task.status}
                  </span>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default UpcomingTasksModal;