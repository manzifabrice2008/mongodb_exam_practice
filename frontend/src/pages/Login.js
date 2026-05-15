import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/login", { email, password });
    res.data === "Login success" ? navigate("/dashboard") : alert("Wrong login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleLogin} className="w-full max-w-md flex flex-col gap-4">
        <input className="border px-4 py-3 rounded" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="border px-4 py-3 rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
}

export default Login;
