const bcrypt = require('bcrypt');
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const { NAME_PATTERN, EMAIL_PATTERN } = require("../utils/utils");
exports.register = async (req, res) => {
    try {
        console.log(req.body);
        let { name, email, password, age } = req.body;
        name = name.trim();
        email = email.trim();
        password = password.trim();
        console.log(name, email, password);
        if (name == "" || email == "" || password == "") {
            res.status(301).json({
                status: "failed",
                message: "please fill all the fields",
            });
        }
        if (!NAME_PATTERN.test(name)) {
            res.status(400).json({
                message: "only letters are allowed in name ",
            });
            return;
        }
        if (!EMAIL_PATTERN.test(email)) {
            res.status(400).json({ status: "failed", message: "invalid Email" });
            return;
        }
        if (password.length < 8) {
            res.status(400).res.json({ message: "Must be greater than 8 letters" });
            return;
        }
        if (age < 10) {
            res.status(400).res.json({ message: "Age must be at least 10 years" });
            return;
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            age: age
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ message: 'Login successful', data: { token, name:user.name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
