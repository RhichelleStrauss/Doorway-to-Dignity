const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//data entry; user enters details
//react sends info to server, server hashes password, and ensures it matches in mongodb
//if password matches, server creates jwt 


exports.register = async (req, res) => {
    try {
        const { fullName, email, password, phone } = req.body;

        if (!fullName || !email || !password || !phone) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

                const cleanEmail = email.trim().toLowerCase();

        const existing = await User.findOne({ email: cleanEmail });
        if (existing) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await User.create({
            fullName: fullName.trim(),
            email: cleanEmail,
            phone: phone.trim(),
            password: hashedPassword,
            role: 'volunteer'
        });


        res.status(201).json({ message: 'Account created successfully!' });

      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
};

exports.login = async (req, res) => {
    try {
                const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ fullName: user.fullName, role: user.role });


      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: 'Logged out' });
};

exports.me = (req, res) => {
    const { _id, fullName, email, phone, role, preferredRole, createdAt } = req.user;
    res.status(200).json({ id: _id, fullName, email, phone, role, preferredRole, createdAt });
};

      