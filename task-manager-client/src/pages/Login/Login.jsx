import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { app } from "../../firebase.init";
import { Link } from "react-router-dom";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Google Login Successful");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
<div className="relative w-full h-screen">
  <div
    className="absolute inset-0 bg-black opacity-50"
  ></div>
  <div
    style={{
      backgroundImage: "url(/login.jpg)",
    }}
    className="bg-cover bg-center w-full h-full relative"
  >
      <div className="hero  min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Manage your task in a nice way to make yourself more productive. Join Now with a simple login.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="fieldset-label">Email</label>
                <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className="fieldset-label">Password</label>
                <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div><a className="link link-hover">Forgot password?</a></div>
                <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
                <button className="btn btn-outline mt-2" onClick={handleGoogleLogin}>Login with Google</button>


<p className=""> Don't have an account? </p><Link to='/register'>              <button className="btn btn-secondary mt-2">Register</button>
</Link>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
