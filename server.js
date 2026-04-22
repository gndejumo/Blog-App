const express = require ("express")
const cors = require ("cors")
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// Modules routes importation
const postRoutes = require ("./routes/postRoutes")

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});
// Register API end point
app.use("/api/posts", postRoutes)

mongoose.connect(process.env.DB_URL).then(() => {
    console.log('DB successfully connected')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on localhost: ${PORT}`)
})
