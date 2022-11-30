const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const stripeRoute = require("./routes/stripe")
const ordersRoute = require("./routes/order")
const cors = require('cors');
const corsOptions ={
    origin:"*", 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use((req, res, next) => {
  const allowedOrigins = ['https://pmart-admin.netlify.app/','https://padjadjaran-mart.netlify.app'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  return next();
});

// menggunakan configurasi enkripsi dotenv
dotenv.config();

// melakukan koneksi ke mongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Berhasil melakukan koneksi ke MongoDB"))
  .catch((err) => {
    console.log(err);
  });

// API end point
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/stripe", stripeRoute);
app.use("/api/orders", ordersRoute);

// PORT Backend
app.listen(process.env.PORT || 5000, () => {
  console.log("Server Backend Berjalan!!");
});

