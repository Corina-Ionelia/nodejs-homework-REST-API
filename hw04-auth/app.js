const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/users");
const contactRoutes = require("./routes/contacts");

const app = express();

app.use(express.json());

// Adaugă rutele
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);

// Conectează-te la baza de date
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on port ${process.env.PORT || 3000}`);
        });
    })
    .catch((err) => console.log(err));