import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import axios from "axios";

const Todo = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{

    axios.get("http://localhost:5000/tasks")
    .then(res=>setTasks(res.data))

  },[])
  console.log(tasks);

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
            <ul {...provided.droppableProps} ref={provided.innerRef} className="p-4  rounded">
              {tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={String(task._id)} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-2 mb-2 bg-green-700 rounded shadow"
                    >
                     <TaskCard task={task}></TaskCard>
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
