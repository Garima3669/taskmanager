import { FaPlus } from "react-icons/fa";
import "../styles/DashboardHero.css";

function DashboardHero({ onAddTask }) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <section className="hero">

      <div className="hero-content">

        <h1>
          {greeting}, <span>Garima</span> 👋
        </h1>

        <p>
          Organize your work, manage deadlines
          <br />
          and boost your productivity.
        </p>

      </div>

      <button
        className="hero-btn"
        onClick={onAddTask}
      >
        <FaPlus />
        <span>Add Task</span>
      </button>

    </section>
  );
}

export default DashboardHero;