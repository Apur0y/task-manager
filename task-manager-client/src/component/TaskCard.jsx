import axios from "axios";


const TaskCard = ( task ) => {

  console.log(task.task?._id);


const handleDelete=async(id)=>{

  const  res = await axios.delete(`http://localhost:5000/tasks/${id}`)
  console.log("task deleted", res.data);
}

  return (
    <div className="card w-96 bg-base-100 shadow-sm">
  <div className="card-body">
  
    <div className="flex justify-between">
      <h2 className="text-3xl font-bold">{task.task?.title}</h2>
      {/* <span className="text-xl">{task.task?.timestamp}</span> */}

    </div>
    <p>{task.task?.description}</p>
    <div className="mt-4 flex justify-between gap-2">
          <button className="btn  btn-outline btn-primary flex items-center gap-1">
             Edit
          </button>
          <button
           onClick={()=>handleDelete(task.task?._id)}
           className="btn  btn-outline btn-error flex items-center gap-1">
          Delete
          </button>
        </div>
  </div>
</div>
  );
};

export default TaskCard;
