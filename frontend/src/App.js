import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
