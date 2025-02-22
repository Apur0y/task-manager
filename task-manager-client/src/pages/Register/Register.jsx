import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from "../../firebase.init"; // Ensure Firebase is initialized in this file
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  
  const navigate = useNavigate()
  const auth = getAuth(app);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      })
      .then(user=>navigate('/'))
      
      console.log("User registered successfully:", user);
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-gray-950 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2 "
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="text"
          name="photoURL"
          placeholder="Photo URL"
          value={formData.photoURL}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
     <Link to='/'> <button className="btn mt-7">Home</button></Link>
    </div>
  );
};

export default Register;