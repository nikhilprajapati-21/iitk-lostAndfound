const profileRoutes = require("./routes/profileRoutes");
const db = require("./config/firebase");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const itemRoutes = require("./routes/itemRoutes");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/items", itemRoutes);
app.use("/profile", profileRoutes);

app.get("/", (req, res) => {
    res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/test-env", (req, res) => {
    res.json({
        emailUser: process.env.EMAIL_USER || null,
        hasPassword: !!process.env.EMAIL_PASS,
    });
});