import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // ==========================
    // Get Logged-in User
    // ==========================
    const getProfile = async () => {
        try {
            const res = await API.get("/auth/me");
            setUser(res.data.user);
        } catch (error) {
            console.log("PROFILE ERROR:", error.response?.data || error.message);
        }
    };

    // ==========================
    // Get All Tasks
    // ==========================
    const getTasks = async () => {
        try {
            const res = await API.get("/tasks");
            setTasks(res.data.tasks);
        } catch (error) {
            console.log("GET TASKS ERROR:", error.response?.data || error.message);
        }
    };

    // ==========================
    // Add Task
    // ==========================
    const addTask = async (taskData) => {
        try {
            console.log("Sending Task:", taskData);

            const res = await API.post("/tasks", taskData);

            console.log("Backend Response:", res.data);

            setTasks((prev) => [...prev, res.data.task]);

            return true;
        } catch (error) {
            console.log("ADD TASK ERROR:", error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);
            }

            return false;
        }
    };

    // ==========================
    // Update Task
    // ==========================
    const updateTask = async (id, taskData) => {
        try {
            const res = await API.put(`/tasks/${id}`, taskData);

            setTasks((prev) =>
                prev.map((task) =>
                    task._id === id ? res.data.task : task
                )
            );

            return true;
        } catch (error) {
            console.log("UPDATE TASK ERROR:", error.response?.data || error.message);
            return false;
        }
    };

    // ==========================
    // Delete Task
    // ==========================
    const deleteTask = async (id) => {
        try {
            await API.delete(`/tasks/${id}`);

            setTasks((prev) =>
                prev.filter((task) => task._id !== id)
            );

            return true;
        } catch (error) {
            console.log("DELETE TASK ERROR:", error.response?.data || error.message);
            return false;
        }
    };

    // ==========================
    // Logout
    // ==========================
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setTasks([]);
    };

    // ==========================
    // Load User & Tasks
    // ==========================
    useEffect(() => {
        const loadData = async () => {
            if (localStorage.getItem("token")) {
                await getProfile();
                await getTasks();
            }

            setLoading(false);
        };

        loadData();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                tasks,
                setTasks,
                loading,
                getProfile,
                getTasks,
                addTask,
                updateTask,
                deleteTask,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);