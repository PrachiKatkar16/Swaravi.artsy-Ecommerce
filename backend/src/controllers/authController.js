const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check existing user
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    // Generate Token
    const token=jwt.sign({
        userId:user._id,
        username:user.username
    },process.env.JWT_SECRET_KEY)

    // Store token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // Response
    res.status(201).json({
      message:"User registered successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    // Check password
    if (user && (await bcrypt.compare(password, user.password))) {

      // Generate Token
      const token=jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET_KEY)


      // Store token in cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: false, // true in production
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message:"User logged in sucessfully",
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });

    } else {
      res.status(401).json({
        message: 'Invalid email or password',
      });
    }

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  registerUser,
  loginUser,
};