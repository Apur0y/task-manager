import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import axios from "axios";

const Todo = () => {
  const [tasks, setTasks] = useState([]);

  // Function to fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks?category=To-Do");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchTasks();

    // Set up polling for real-time updates (every 3 seconds)
    const intervalId = setInterval(fetchTasks, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [tasks]);

  // Handle task update (pass this to TaskCard)
  const handleTaskUpdate = async (updatedTask) => {
    // Update the local state immediately for better UX
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task._id === updatedTask._id ? updatedTask : task
      )
    );
    
    // Then fetch fresh data to ensure consistency
    fetchTasks();
  };

  // Handle task deletion (pass this to TaskCard)
  const handleTaskDelete = async (deletedTaskId) => {
    // Update the local state immediately for better UX
    setTasks(prevTasks => prevTasks.filter(task => task._id !== deletedTaskId));
    
    // Then fetch fresh data to ensure consistency
    fetchTasks();
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = [...tasks];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks" isDropDisabled={false}>
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="p-4 rounded">
              {tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={String(task._id)} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-2 mb-2 bg-green-700 rounded shadow"
                    >
                      <TaskCard 
                        key={task._id} 
                        task={task}
                        onTaskUpdate={handleTaskUpdate}
                        onTaskDelete={handleTaskDelete}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Todo;