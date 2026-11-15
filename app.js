
require("dotenv").config();

const express = require("express");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/appointmentModel");
const doctorRoutes = require("./routes/doctor.route");
const resResponse = require("./utils/jsend");

const app = express();

app.use(express.json());

app.use("/", doctorRoutes);
app.use("/", authRoutes);
app.use("/", bookRoutes);

app.all("/*splat", (req, res) => {
    res.status(404).json({
        status: resResponse.ERROR,
        message: "Page not found"
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        status: resResponse.ERROR,
        message: err.message || "Internal server error"
    });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
