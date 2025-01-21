const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const { JWT_SECRET } = process.env;

// Signup
router.post(
    '/signup', [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: 'Email in use' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const avatarURL = gravatar.url(email, { s: '250', d: 'retro' }, true);
            const newUser = await User.create({ email, password: hashedPassword, avatarURL });

            res.status(201).json({
                user: {
                    email: newUser.email,
                    subscription: newUser.subscription,
                    avatarURL: newUser.avatarURL,
                },
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

// Login
router.post(
    '/login', [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Email or password is wrong' });
            }

            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
            user.token = token;
            await user.save();

            res.status(200).json({
                token,
                user: {
                    email: user.email,
                    subscription: user.subscription,
                },
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

module.exports = router;