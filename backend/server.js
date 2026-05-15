const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/inventory");

const userSchema = new mongoose.Schema({ name: String, email: String, password: String });
const User = mongoose.model("User", userSchema);

const stockSchema = new mongoose.Schema({ product: String, quantity: Number, removed: { type: Number, default: 0 } });
const Stock = mongoose.model("Stock", stockSchema);

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User registered");
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email, password: req.body.password });
  res.send(user ? "Login success" : "Invalid login");
});

app.post("/stock-in", async (req, res) => {
  const { product, quantity } = req.body;
  const existing = await Stock.findOne({ product });
  if (existing) {
    existing.quantity += Number(quantity);
    await existing.save();
  } else {
    await new Stock({ product, quantity }).save();
  }
  res.send("Stock added");
});

app.get("/stock", async (req, res) => {
  res.json(await Stock.find());
});

app.post("/stock-out/:id", async (req, res) => {
  const item = await Stock.findById(req.params.id);
  if (!item) return res.send("Item not found");
  const taken = Number(req.body.quantity);
  item.quantity = Math.max(0, item.quantity - taken);
  item.removed = (item.removed || 0) + taken;
  await item.save();
  res.send("Stock updated");
});

app.put("/stock/:id", async (req, res) => {
  await Stock.findByIdAndUpdate(req.params.id, req.body);
  res.send("Stock updated");
});

app.listen(5000);
