import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import "../styles/StatsCard.css";

function StatsCard() {
  const { tasks } = useAuth();

  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const stats = [
    {
      title: "Total Tasks",
      value: total,
      icon: <FaTasks />,
      color: "blue",
    },
    {
      title: "Completed",
      value: completed,
      icon: <FaCheckCircle />,
      color: "green",
    },
    {
      title: "Pending",
      value: pending,
      icon: <FaClock />,
      color: "orange",
    },
    {
      title: "High Priority",
      value: highPriority,
      icon: <FaExclamationTriangle />,
      color: "red",
    },
  ];

  return (
    <div className="stats-wrapper">

      <h2 className="stats-title">
        Task Overview
      </h2>

      <div className="stats-grid">

        {stats.map((item) => (

          <div
            key={item.title}
            className="stat-card"
          >

            <div className={`stat-icon ${item.color}`}>
              {item.icon}
            </div>

            <div className="stat-info">

              <h4>{item.title}</h4>

              <h2>{item.value}</h2>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default StatsCard;