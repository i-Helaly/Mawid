require("dotenv").config();
const express = require("express");
// const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/authRoutes")
const doctorRoutes = require("./routes/doctor.route")
const resResponse = require("./utils/jsend");
const app = express();


app.use(express.json());
app.use("/" , doctorRoutes);
app.use("/" , authRoutes);

app.all("/*splat" , (req , res , next)=>{
    res.status(404).json({status: resResponse.ERROR , message: "Page not found"});
})
app.use((err , req , res)=>{
    res.json(err)
})
const port = process.env.PORT || 4000;
app.listen(port , ()=> console.log(`listening on port${port}`))