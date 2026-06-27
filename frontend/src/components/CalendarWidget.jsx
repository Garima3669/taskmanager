import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { useAuth } from "../context/AuthContext";
import CalendarTaskModal from "./CalendarTaskModal";

import "../styles/CalendarWidget.css";

function CalendarWidget() {
    const { tasks } = useAuth();

    const [date, setDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);

    const formatDate = (date) => {
        const d = new Date(date);

        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const selectedTasks = tasks.filter(
        (task) => formatDate(task.dueDate) === formatDate(date)
    );

    const firstTask = selectedTasks[0];
    const remainingTasks = selectedTasks.length - 1;

    return (
        <>
            <div className="calendar-card">

                <h3>Calendar</h3>

                <Calendar
                    value={date}
                    onChange={setDate}
                    tileContent={({ date, view }) => {

                        if (view !== "month") return null;

                        const task = tasks.find(
                            (task) => formatDate(task.dueDate) === formatDate(date)
                        );

                        if (!task) return null;

                        return (
                            <span
                                className={`task-dot-calendar ${task.priority.toLowerCase()}`}
                            />
                        );
                    }}
                />

                {/* Selected Date */}

                <div className="calendar-events">

                    <div className="events-header">

                        <h4>
                            {date.toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "long",
                            })}
                        </h4>

                        <span className="event-count">
                            {selectedTasks.length} Task
                            {selectedTasks.length !== 1 && "s"}
                        </span>

                    </div>

                    {selectedTasks.length === 0 ? (

                        <div className="no-events">

                            <span>📅</span>

                            <p>No tasks for this day</p>

                        </div>

                    ) : (

                        <>
                            <div className="calendar-task">

                                <div className="task-left">

                                    <span
                                        className={`task-dot ${firstTask.priority.toLowerCase()}`}
                                    ></span>

                                    <div>

                                        <h5>{firstTask.title}</h5>

                                        <p>{firstTask.status}</p>

                                    </div>

                                </div>

                                <span
                                    className={`calendar-status ${firstTask.status
                                        .replace(" ", "-")
                                        .toLowerCase()}`}
                                >
                                    {firstTask.status}
                                </span>

                            </div>

                            {remainingTasks > 0 && (

                                <button
                                    className="show-more-btn"
                                    onClick={() => setShowModal(true)}
                                >
                                    +{remainingTasks} More Task
                                    {remainingTasks > 1 && "s"}
                                </button>

                            )}

                        </>

                    )}

                </div>

            </div>

            {showModal && (
                <CalendarTaskModal
                    date={date}
                    tasks={selectedTasks}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}

export default CalendarWidget;