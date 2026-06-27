import {
    FaFire,
    FaBullseye,
    FaCalendarDay,
    FaExclamationTriangle,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "../styles/ProductivitySummary.css";

function ProductivitySummary() {
    const { tasks } = useAuth();

    const total = tasks.length;

    const completed = tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    const completionRate =
        total === 0 ? 0 : Math.round((completed / total) * 100);

    const today = new Date().toISOString().split("T")[0];

    const dueToday = tasks.filter(
        (task) =>
            task.status !== "Completed" &&
            task.dueDate?.substring(0, 10) === today
    ).length;

    const highPriority = tasks.filter(
        (task) =>
            task.priority === "High" &&
            task.status !== "Completed"
    ).length;

    // ================= CURRENT STREAK =================

    const completedDates = new Set(
        tasks
            .filter((task) => task.status === "Completed")
            .map((task) => {
                const d = new Date(task.dueDate);
                d.setHours(0, 0, 0, 0);
                return d.getTime();
            })
    );

    let streak = 0;

    // Start checking from today
    const checkDate = new Date();
    checkDate.setHours(0, 0, 0, 0);

    while (completedDates.has(checkDate.getTime())) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
    }

    return (
        <div className="productivity-card">

            <h2 className="productivity-title">
                Productivity
            </h2>

            {/* Streak */}

            <div className="productivity-item">

                <div className="item-left">

                    <div className="icon fire">
                        <FaFire />
                    </div>

                    <span>Current Streak</span>

                </div>

                <strong>{streak} Day{streak !== 1 ? "s" : ""}</strong>

            </div>

            {/* Completion */}

            <div className="completion-box">

                <div className="completion-header">

                    <div className="item-left">

                        <div className="icon goal">
                            <FaBullseye />
                        </div>

                        <span>Completion Rate</span>

                    </div>

                    <strong>{completionRate}%</strong>

                </div>

                <div className="progress">

                    <div
                        className="progress-fill"
                        style={{
                            width: `${completionRate}%`,
                        }}
                    />

                </div>

            </div>

            {/* Due Today */}

            <div className="productivity-item">

                <div className="item-left">

                    <div className="icon calendar">
                        <FaCalendarDay />
                    </div>

                    <span>Due Today</span>

                </div>

                <strong>{dueToday}</strong>

            </div>

            {/* High Priority */}

            <div className="productivity-item">

                <div className="item-left">

                    <div className="icon priority">
                        <FaExclamationTriangle />
                    </div>

                    <span>High Priority Left</span>

                </div>

                <strong>{highPriority}</strong>

            </div>

        </div>
    );
}

export default ProductivitySummary;