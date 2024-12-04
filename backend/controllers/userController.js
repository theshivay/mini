// Assuming you're using Express and Mongoose
const express = require('express');
const User = require('../models/User');  // Your User model
const router = express.Router();

// Get paginated users (for Admin)
router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Page number
    const limit = 10; // Set number of users per page
    const skip = (page - 1) * limit; // Number of users to skip

    // Fetch the users from MongoDB
    const users = await User.find().skip(skip).limit(limit).exec();
    const total = await User.countDocuments(); // Total users for calculating the number of pages

    // Return paginated data
    res.json({
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
