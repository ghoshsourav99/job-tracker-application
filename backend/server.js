const express = require("express");
const cors = require("cors");
const app = express();
require("./config/db");
const jobRoutes = require("./routes/jobRoutes");


app.use(cors());
app.use(express.json());

app.use("/api", jobRoutes);
app.get("/", (req, res) => {
    res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});