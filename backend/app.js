const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("./config");
const authRoutes = require("./routes/authRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware
app.use(errorHandler);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/resources", resourceRoutes);
const authRouter = require("./routes/authRoutes");
app.use(authRouter);

// Connect to MongoDB
const connectDB = require("./db/dbconnect");

connectDB();

app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
});