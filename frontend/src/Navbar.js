import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const auth = ["/", "/signup"].includes(useLocation().pathname);

  return (
    <nav className="w-64 bg-gray-800 min-h-screen flex flex-col p-4 gap-2">
      <h2 className="text-white text-xl font-bold text-center mb-8">Inventory</h2>
      {auth ? (
        <>
          <Link to="/" className="text-white py-3 px-4 rounded hover:bg-gray-700">Login</Link>
          <Link to="/signup" className="text-white py-3 px-4 rounded hover:bg-gray-700">Signup</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard" className="text-white py-3 px-4 rounded hover:bg-gray-700">Dashboard</Link>
          <Link to="/" className="text-white py-3 px-4 rounded hover:bg-gray-700 mt-auto">Logout</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
