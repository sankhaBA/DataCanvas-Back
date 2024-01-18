const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// POST request for initiate login and create jwt
router.post('/login', (req, res) => {
    try {
        if (!req.body.email || !req.body.api_key || req.body.api_key != 'abcd1234') {
            res.status(400).json({ message: 'Bad Request' });
        } else {
            UserController.login(req.body.email, res);
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});

module.exports = router;
