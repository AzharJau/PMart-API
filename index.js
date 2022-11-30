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
    origin:["https://pmart-admin.netlify.app/","https://padjadjaran-mart.netlify.app/"], 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}

app.use(cors(corsOptions));


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

