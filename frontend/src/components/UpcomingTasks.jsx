import { useMemo, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import UpcomingTasksModal from "./UpcomingTasksModal";
import "../styles/UpcomingTasks.css";

function UpcomingTasks() {
  const { tasks } = useAuth();

  const [showModal, setShowModal] = useState(false);

  const upcomingTasks = useMemo(() => {
    return [...tasks]
      .filter((task) => task.status !== "Completed")
      .sort(
        (a, b) =>
          new Date(a.dueDate) - new Date(b.dueDate)
      );
  }, [tasks]);

  const previewTasks = upcomingTasks.slice(0, 3);

  return (
    <>
      <div className="upcoming-card">

        <div className="upcoming-header">

          <div>

            <h2>Upcoming Deadlines</h2>

            <p>
              {upcomingTasks.length} Pending Task
              {upcomingTasks.length !== 1 && "s"}
            </p>

          </div>

          {upcomingTasks.length > 0 && (
            <button
              className="view-all-btn"
              onClick={() => setShowModal(true)}
            >
              View All
            </button>
          )}

        </div>

        {upcomingTasks.length === 0 ? (

          <div className="no-upcoming">

            <span>🎉</span>

            <h3>All Done!</h3>

            <p>No upcoming deadlines.</p>

          </div>

        ) : (

          <div className="upcoming-list">

            {previewTasks.map((task) => (

              <div
                className="upcoming-task"
                key={task._id}
              >

                <div className="task-info">

                  <span
                    className={`priority-dot ${task.priority.toLowerCase()}`}
                  ></span>

                  <div>

                    <h4>{task.title}</h4>

                    <p>{task.category}</p>

                  </div>

                </div>

                <div className="task-date">

                  <FaCalendarAlt />

                  <span>
                    {new Date(
                      task.dueDate
                    ).toLocaleDateString()}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {showModal && (
        <UpcomingTasksModal
          tasks={upcomingTasks}
          onClose={() => setShowModal(false)}
        />
      )}

    </>
  );
}

export default UpcomingTasks;