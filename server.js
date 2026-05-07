const express = require ("express")
const cors = require ("cors")
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();


// Modules routes importation
const postRoutes = require ("./routes/postRoutes")
const userRoutes = require ("./routes/userRoutes")
const authRoutes = require ("./routes/authRoutes")

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});
// Register API end point
app.use("/api/posts", postRoutes)
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DB_URL).then(() => {
    console.log("DB connected successfully");

    app.listen(PORT, () => {
        console.log(`Server is running on the http://localhost:${PORT}`)
    })
}) .catch((err) => console.log("DB connection:", err))
