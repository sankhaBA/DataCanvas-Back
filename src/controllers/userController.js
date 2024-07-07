const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// controller for initiate login and create jwt
async function login(email, res) {
  try {
    let user = await User.findOne({ where: { email } });

    user = {
      id: user.dataValues.user_id,
      email: user.dataValues.email,
    }

    if (user) {
      const token = jwt.sign(user, 'secret', { expiresIn: '7d' });

      res.status(200).json({ token, user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
}

// Get all users
async function getAllUsers(res) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Failed to get users' });
  }
}

// Get users by email
async function getUsersByEmail(email, res) {
  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting user by email:', error);
    res.status(500).json({ error: 'Failed to get user by email' });
  }
}

// Add user
async function addUser(req, res) {
  const { email, user_name } = req.body;

  try {
    const newUser = await User.create({ email, user_name });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
}

// Update user by email
async function updateUserByEmail(req, res) {
  const { email } = req.body;
  const { user_name } = req.body;

  try {
    const [updatedRowsCount, updatedRows] = await User.update(
      { user_name },
      { where: { email }, returning: true }
    );

    if (updatedRowsCount > 0) {
      res.status(200).json(updatedRows[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user by email:', error);
    res.status(500).json({ error: 'Failed to update user by email' });
  }
}

// Delete user by email
async function deleteUserByEmail(email, res) {
  try {
    const deletedRowCount = await User.destroy({ where: { email } });

    if (deletedRowCount > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user by email:', error);
    res.status(500).json({ error: 'Failed to delete user by email' });
  }
}

module.exports = {
  login,
  getAllUsers,
  getUsersByEmail,
  addUser,
  updateUserByEmail,
  deleteUserByEmail,
};
