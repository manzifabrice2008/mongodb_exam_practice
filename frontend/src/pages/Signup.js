import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/signup", { name, email, password });
    alert("Signup success");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="text-2xl font-bold mb-6">Signup</h2>
      <form onSubmit={handleSignup} className="w-full max-w-md flex flex-col gap-4">
        <input className="border px-4 py-3 rounded" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input className="border px-4 py-3 rounded" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="border px-4 py-3 rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
