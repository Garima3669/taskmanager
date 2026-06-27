import { useState } from "react";

import Navbar from "../components/Navbar";
import DashboardHero from "../components/DashboardHero";
import ProductivitySummary from "../components/ProductivitySummary";
import CalendarWidget from "../components/CalendarWidget";

import StatsCard from "../components/StatsCard";
import TaskChart from "../components/TaskChart";

import UpcomingTasks from "../components/UpcomingTasks";
import CategoryStats from "../components/CategoryStats";

import SearchFilter from "../components/SearchFilter";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

import { useAuth } from "../context/AuthContext";

import "../styles/Dashboard.css";

function Dashboard() {

  const { tasks } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");

  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) => {

    const searchMatch =
      search.trim() === "" ||
      task.title
        .trim()
        .toLowerCase()
        .startsWith(search.trim().toLowerCase());

    const statusMatch =
      status === "All" || task.status === status;

    const priorityMatch =
      priority === "All" || task.priority === priority;

    return searchMatch && statusMatch && priorityMatch;

  });

  return (
    <>
      <Navbar />

      <main className="dashboard">

        {/* HERO */}

        <section className="dashboard-top">

          <div className="left-panel">

            <DashboardHero
              onAddTask={handleAddTask}
            />

            <ProductivitySummary />

          </div>

          <div className="right-panel">

            <CalendarWidget />

          </div>

        </section>

        {/* ANALYTICS */}

        <section className="dashboard-row analytics-row">

          <div className="dashboard-card overview-card">

            <StatsCard />

          </div>

          <div className="dashboard-card analytics-card">

            <TaskChart />

          </div>

        </section>

        {/* SECOND ROW */}

        <section className="dashboard-row">

          <div className="dashboard-card upcoming-card">

            <UpcomingTasks />

          </div>

          <div className="dashboard-card category-card">

            <CategoryStats />

          </div>

        </section>

        {/* SEARCH */}

        <SearchFilter
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          priority={priority}
          setPriority={setPriority}
        />

        {/* TASK GRID */}

        <section className="task-grid">

          {filteredTasks.length ? (

            filteredTasks.map((task) => (

              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
              />

            ))

          ) : (

            <div className="empty-task">

              <h2>No Tasks Found</h2>

              <p>Create your first task.</p>

            </div>

          )}

        </section>

      </main>

      {showForm && (

        <TaskForm
          task={editingTask}
          closeForm={handleClose}
        />

      )}

    </>
  );
}

export default Dashboard;