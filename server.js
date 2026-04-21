const express = require ("express")
const cors = require ("cors")
const app = express();

// Modules routes importation
const postRoutes = require ("./routes/postRoutes")

app.use(cors())
app.use(express.json());


// Register API end point
app.use("/api/posts", postRoutes)
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on localhost: ${PORT}`)
})
