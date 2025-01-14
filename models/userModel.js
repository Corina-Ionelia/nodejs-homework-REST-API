const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscription: { type: String, default: "starter" },
    token: { type: String, default: null },
});

module.exports = mongoose.model("User", userSchema);