import { useAuth } from "../context/AuthContext";
import "../styles/CategoryStats.css";

function CategoryStats() {
  const { tasks } = useAuth();

  const categories = ["Work", "Study", "Personal", "Shopping"];

  const totalTasks = tasks.length || 1;

  return (
    <div className="category-card">

      <div className="category-top">

        <h2 className="category-heading">
          Categories
        </h2>

        <span className="category-count">
          {categories.length}
        </span>

      </div>

      <div className="category-list">

        {categories.map((category) => {

          const count = tasks.filter(
            (task) => task.category === category
          ).length;

          const percentage = Math.round(
            (count / totalTasks) * 100
          );

          return (

            <div
              className="category-item"
              key={category}
            >

              <div className="category-header">

                <span>{category}</span>

                <span>
                  {count} ({percentage}%)
                </span>

              </div>

              <div className="progress-bar">

                <div
                  className={`progress-fill ${category.toLowerCase()}`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}

export default CategoryStats;