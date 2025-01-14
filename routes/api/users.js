const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { User } = require("../models/userModel");

const router = express.Router();

// Logout route
router.get("/logout", authMiddleware, async(req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        user.token = null;
        await user.save();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Current user route
router.get("/current", authMiddleware, (req, res) => {
    const { email, subscription } = req.user;
    res.status(200).json({ email, subscription });
});

module.exports = router;