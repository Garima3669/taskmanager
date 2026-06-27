import {
  FaSearch,
  FaFilter,
  FaFlag,
} from "react-icons/fa";

import "../styles/SearchFilter.css";

function SearchFilter({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
}) {
  return (
    <div className="search-filter">

      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="filter-box">

        <div className="select-wrapper">

          <FaFilter className="select-icon" />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>

        </div>

        <div className="select-wrapper">

          <FaFlag className="select-icon" />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

        </div>

      </div>

    </div>
  );
}

export default SearchFilter;