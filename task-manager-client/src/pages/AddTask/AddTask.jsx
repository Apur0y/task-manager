import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const AddTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (task.title.trim().length === 0 || task.title.length > 50) {
      toast("Title is required and must be within 50 characters.");
      return;
    }
    
    if (task.description.length > 200) {
      toast("Description cannot exceed 200 characters.");
      return;
    }

    const newTask = {
      ...task,
      timestamp: new Date().toISOString(), // Auto-generate timestamp
    };

    try {
      const response = await axios.post("http://localhost:5000/tasks", newTask);
      console.log("Task added:", response.data);
      toast("Task added successfully!");

      // Reset form
      setTask({ title: "", description: "", category: "To-Do" });
    } catch (error) {
      console.error("Error adding task:", error);
      toast("Failed to add task.");
    }
  };

  return (
    <div className="max-w-md mx-auto  p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add a New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium">Title *</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            maxLength="50"
            required
            className="w-full p-2 border rounded-lg"
            placeholder="Enter task title"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            maxLength="200"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter task description (optional)"
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={task.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddTask;
