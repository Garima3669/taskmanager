import "../styles/CalendarTaskModal.css";

function CalendarTaskModal({
  date,
  tasks,
  onClose,
}) {
  return (
    <div
      className="calendar-modal-overlay"
      onClick={onClose}
    >

      <div
        className="calendar-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="calendar-modal-header">

          <h2>
            {date.toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </h2>

          <button onClick={onClose}>
            ✕
          </button>

        </div>

        {tasks.length === 0 ? (

          <div className="calendar-empty">

            🎉 No Tasks

          </div>

        ) : (

          tasks.map((task) => (

            <div
              className="calendar-task-item"
              key={task._id}
            >

              <div>

                <h4>{task.title}</h4>

                <p>{task.category}</p>

              </div>

              <span
                className={`calendar-priority ${task.priority.toLowerCase()}`}
              >
                {task.priority}
              </span>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default CalendarTaskModal;