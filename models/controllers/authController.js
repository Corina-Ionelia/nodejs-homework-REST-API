// controllers/authController.js
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const sendVerificationEmail = require('../utils/sendEmail');

const registerUser = async(req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
    }

    const verificationToken = uuidv4();
    const newUser = new User({
        email,
        password, // În realitate, trebuie criptată
        verificationToken,
    });

    await newUser.save();
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({ message: 'User created. Verification email sent.' });
};


const verifyUser = async(req, res) => {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.verificationToken = null;
    user.verify = true;
    await user.save();

    res.status(200).json({ message: 'Verification successful' });
};
const resendVerificationEmail = async(req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (user.verify) {
        return res.status(400).json({ message: 'Verification has already been passed' });
    }

    await sendVerificationEmail(user.email, user.verificationToken);
    res.status(200).json({ message: 'Verification email sent' });
};