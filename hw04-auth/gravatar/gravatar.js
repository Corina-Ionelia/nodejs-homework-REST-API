const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const createUser = async(req, res) => {
    const { email, password } = req.body;

    const avatarURL = gravatar.url(email, { s: '250', d: 'retro' }, true);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        password: hashedPassword,
        avatarURL,
    });

    res.status(201).json(user);
};