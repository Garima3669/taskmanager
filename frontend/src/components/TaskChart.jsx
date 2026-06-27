import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { useAuth } from "../context/AuthContext";

import "../styles/TaskChart.css";

function TaskChart() {
  const { tasks } = useAuth();

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const total = tasks.length || 1;

  const data = [
    {
      name: "Completed",
      value: completed,
      color: "#22c55e",
    },
    {
      name: "Pending",
      value: pending,
      color: "#f59e0b",
    },
    {
      name: "In Progress",
      value: progress,
      color: "#3b82f6",
    },
  ];

  return (
    <div className="analytics-wrapper">

      <h2 className="analytics-title">
        Task Analytics
      </h2>

      <div className="analytics-body">

        <div className="chart-side">

          <ResponsiveContainer
            width="100%"
            height={260}
          >
            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                innerRadius={70}
                outerRadius={95}
                paddingAngle={2}
              >
                {data.map((item) => (
                  <Cell
                    key={item.name}
                    fill={item.color}
                  />
                ))}
              </Pie>

            </PieChart>
          </ResponsiveContainer>

        </div>

        <div className="legend-side">

          {data.map((item) => (

            <div
              key={item.name}
              className="legend-card"
            >

              <div className="legend-left">

                <span
                  className="legend-dot"
                  style={{
                    background: item.color,
                  }}
                />

                <span>{item.name}</span>

              </div>

              <div className="legend-right">

                <span>{item.value}</span>

                <strong>
                  {Math.round(
                    (item.value / total) * 100
                  )}
                  %
                </strong>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default TaskChart;