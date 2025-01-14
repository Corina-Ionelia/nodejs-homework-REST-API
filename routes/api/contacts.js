const express = require("express");
const { Contact } = require("../models/contactModel");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// Get contacts (with pagination and filtering)
router.get("/", authMiddleware, async(req, res) => {
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;

    const query = { owner: req.user._id };
    if (favorite !== undefined) {
        query.favorite = favorite === "true";
    }

    try {
        const contacts = await Contact.find(query)
            .skip(skip)
            .limit(Number(limit));
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new contact
router.post("/", authMiddleware, async(req, res) => {
    try {
        const newContact = await Contact.create({
            ...req.body,
            owner: req.user._id,
        });
        res.status(201).json(newContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;