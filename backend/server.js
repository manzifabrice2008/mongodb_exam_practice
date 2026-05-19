const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());


// DATABASE CONNECTION
mongoose.connect("mongodb://localhost:27017/inventory")
.then(() => {
  console.log("MongoDB Connected");
});


// USER SCHEMA
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);


// STOCK SCHEMA
const StockSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  removed: Number
});

const Stock = mongoose.model("Stock", StockSchema);


// STOCK IN SCHEMA
const StockInSchema = new mongoose.Schema({
  stockId: mongoose.Schema.Types.ObjectId,
  product: String,
  quantity: Number
});

const StockIn = mongoose.model("StockIn", StockInSchema);


// STOCK OUT SCHEMA
const StockOutSchema = new mongoose.Schema({
  stockId: mongoose.Schema.Types.ObjectId,
  product: String,
  quantity: Number
});

const StockOut = mongoose.model("StockOut", StockOutSchema);



// SIGNUP
app.post("/signup", async (req, res) => {

  const user = new User(req.body);

  await user.save();

  res.send("User Registered");
});



// LOGIN
app.post("/login", async (req, res) => {

  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });

  if (user) {
    res.send("Login success");
  } else {
    res.send("Invalid Email or Password");
  }
});



// STOCK IN
app.post("/stock-in", async (req, res) => {

  const { product, quantity } = req.body;

  let stock = await Stock.findOne({ product });

  if (stock) {

    stock.quantity = stock.quantity + Number(quantity);

    await stock.save();

  } else {

    stock = new Stock({
      product,
      quantity,
      removed: 0
    });

    await stock.save();
  }

  const stockIn = new StockIn({
    stockId: stock._id,
    product,
    quantity
  });

  await stockIn.save();

  res.send("Stock Added");
});



// GET STOCK
app.get("/stock", async (req, res) => {

  const data = await Stock.find();

  res.json(data);
});



// STOCK OUT
app.post("/stock-out/:id", async (req, res) => {

  const stock = await Stock.findById(req.params.id);

  const qty = Number(req.body.quantity);

  stock.quantity = stock.quantity - qty;

  stock.removed = stock.removed + qty;

  await stock.save();

  const stockOut = new StockOut({
    stockId: stock._id,
    product: stock.product,
    quantity: qty
  });

  await stockOut.save();

  res.send("Stock Removed");
});




// UPDATE STOCK
app.put("/stock/:id", async (req, res) => {

  await Stock.findByIdAndUpdate(req.params.id, req.body);

  res.send("Stock Updated");
});



// DELETE STOCK
app.delete("/stock/:id", async (req, res) => {

  await Stock.findByIdAndDelete(req.params.id);

  res.send("Stock Deleted");
});



// SERVER
app.listen(5000, () => {

  console.log("Server Running on Port 5000");

});