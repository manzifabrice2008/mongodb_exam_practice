import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stock, setStock] = useState([]);
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState("");

  const load = async () => {
    const res = await axios.get("http://localhost:5000/stock");
    setStock(res.data);
  };

  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/stock-in", { product, quantity: qty });
    setProduct(""); setQty(""); load();
  };

  const out = async (id) => {
    const q = prompt("Remove quantity");
    if (!q) return;
    await axios.post(`http://localhost:5000/stock-out/${id}`, { quantity: q });
    load();
  };

  const edit = async (id, p, q) => {
    const np = prompt("Product", p); if (!np) return;
    const nq = prompt("Quantity", q); if (!nq) return;
    await axios.put(`http://localhost:5000/stock/${id}`, { product: np, quantity: Number(nq) });
    load();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-8">
        <div className="bg-blue-100 rounded p-4 text-center">
          <p className="text-2xl font-bold">{stock.length}</p>
          <p className="text-gray-600">Total</p>
        </div>
        <div className="bg-green-100 rounded p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{stock.reduce((sum, s) => sum + s.quantity, 0)}</p>
          <p className="text-gray-600">In</p>
        </div>
        <div className="bg-red-100 rounded p-4 text-center">
          <p className="text-2xl font-bold text-red-700">{stock.reduce((sum, s) => sum + (s.removed || 0), 0)}</p>
          <p className="text-gray-600">Out</p>
        </div>
      </div>

      <form onSubmit={add} className="flex gap-2 max-w-xl mx-auto mb-6">
        <input className="border px-4 py-3 rounded flex-1" placeholder="Product" value={product} onChange={(e) => setProduct(e.target.value)} />
        <input className="border px-4 py-3 rounded w-24" placeholder="Qty" value={qty} onChange={(e) => setQty(e.target.value)} />
        <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">Add</button>
      </form>

      <div className="flex flex-col gap-2 max-w-xl mx-auto">
        {stock.map((item) => (
          <div key={item._id} className="flex items-center justify-between bg-gray-100 rounded px-4 py-3">
            <span>{item.product} - {item.quantity}</span>
            <div className="flex gap-2">
              <button className="bg-yellow-500 text-white px-4 py-2 rounded text-sm hover:bg-yellow-600" onClick={() => edit(item._id, item.product, item.quantity)}>Edit</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600" onClick={() => out(item._id)}>Out</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
