const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// Get User Profile
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update User Profile
router.put('/', auth, async (req, res) => {
    const { fullName, whatsappNumber, interests, goals } = req.body;
    const updatedData = { fullName, whatsappNumber, interests, goals };

    try {
        const user = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true }).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
