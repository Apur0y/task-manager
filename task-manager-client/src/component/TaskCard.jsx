import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const TaskCard = ({ task }) => {

  const [editedTask, setEditedTask] = useState({
    title:  "",
    description: task?.description || "",
    category: task?.category || "To-Do",
  });

  const handleEdit = (task) => {

    // Update the editedTask state with the clicked task's data
    setEditedTask({
      title: task?.title ,
      description: task?.description,
      category: task?.category,
    });
    // Open the modal
    document.getElementById(`${task?._id}`).showModal();
  };

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const res = await axios.put(`http://localhost:5000/tasks/${task._id}`, editedTask);
      console.log("Task updated successfully:", res.data);
      Swal.fire({
        title: "Success!",
        text: "Task updated successfully.",
        icon: "success",
      });
      // Close the modal after successful update
      document.getElementById(`${task?._id}`).close();
    } catch (error) {
      console.error("Failed to update task:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update task.",
        icon: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/tasks/${id}`);
        console.log("Task deleted successfully");
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
        });
      } catch (error) {
        console.error("Failed to delete task:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete task.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold">{task?.title}</h2>
        </div>
        <p>{task?.description}</p>
        <div className="mt-4 flex justify-between gap-2">
          <button
            onClick={() => handleEdit(task)}
            className="btn btn-outline btn-primary flex items-center gap-1"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(task?._id)}
            className="btn btn-outline btn-error flex items-center gap-1"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Modal for Editing */}
      <dialog id={`${task?._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Task</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium">Title *</label>
              <input
                type="text"
                name="title"
                value={editedTask.title}
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
                value={editedTask.description}
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
                value={editedTask.category}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border rounded-lg"
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-10 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
            >
              Update
            </button>
          </form>

          {/* Close Modal Button */}
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => document.getElementById(`${task?._id}`).close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Assuming _id is a string
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskCard;