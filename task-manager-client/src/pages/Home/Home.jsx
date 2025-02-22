import { Link } from "react-router-dom";
import Done from "../../component/Done";
import InProcess from "../../component/InProcess";
import TaskCard from "../../component/TaskCard";
import Todo from "../../component/Todo";
import { signOut } from "firebase/auth";
import { auth } from "../AuthProvider/AuthProvider";

const Home = () => {

const handleSignOut=()=>{
  signOut(auth)
}




  return (
    <div className="min-h-screen bg-gray-100 p-10">
          <button
          onClick={handleSignOut}
          className="btn">Log Out</button>
      {/* Hero Section */}
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">🚀 To-Do Task Manager</h1>
        <p className="mt-3 text-gray-600 text-lg">
          Take a challenge to make your daily work fast and efficient.
        </p>
      </header>

      {/* Task Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* To-Do Column */}
        <div className="bg-white p-5 shadow-lg rounded-lg">
         <div className="flex justify-between">
         <h2 className="text-xl font-semibold text-gray-700">📌 To-Do</h2>
         <button className="btn">
          <Link to='/addtask'>Add</Link>
          </button>
         </div>
          <Todo />
          <TaskCard></TaskCard>
        </div>

        {/* In-Progress Column */}
        <div className="bg-white p-5 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">⚡ In Progress</h2>
          <InProcess />
        </div>

        {/* Done Column */}
        <div className="bg-white p-5 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">✅ Done</h2>
          <Done />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="text-center mt-10 text-gray-500">
        <p>✨ Stay productive and keep organizing your tasks!</p>
      </footer>
    </div>
  );
};

export default Home;
