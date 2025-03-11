import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";



dotenv.config();
const otpStorage = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
};

export const sendOtp = async (req, res) => {
  const { name, email, password, branch, rollNo, phoneNo } = req.body;

  if (!name || !email || !password || !branch || !rollNo || !phoneNo) {
    return res.status(400).json({ message: "Please fill all details" });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ rollNo });
  if (existingUser) return res.status(400).json({ message: "User with this Roll No already registered" });

  const otp = generateOTP();
  otpStorage[email] = {
      otp,
      password, // Store password temporarily
      otpExpires: Date.now() + 5 * 60 * 1000, // 5-minute expiry
  };

  // Send OTP via email
  const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Email Verification OTP",
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
  };

  try {
      await transporter.sendMail(mailOptions);
      res.json({ message: "OTP sent successfully! Verify to complete signup." });
  } catch (error) {
      res.status(500).json({ message: "Error sending OTP", error });
  }
};

export const verifyOtpAndSignup = async (req, res) => {
  const { email, name, password, branch, rollNo, phoneNo,otp } = req.body;

  

  if (!email || !otp) {
      return res.status(400).json({ message: "Fill All the Details" });
  }

  const storedData = otpStorage[email];

  if (!storedData) {
      return res.status(400).json({ message: "OTP expired or not requested" });
  }

  if (storedData.otp !== otp || storedData.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
  }
  const hashedPassword = await bcrypt.hash(storedData.password, 12);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    branch,
    rollNo,
    phoneNo,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "User creation failed" });
  }
};

export const signin = async (req, res) => {
  const { rollNo, password } = req.body;
  try {
    const existingUser = await User.findOne({ rollNo });
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { rollNo: existingUser.rollNo, id: existingUser._id },
      process.env.SECRET,
      { expiresIn: "1d" }
    );

    const { password: pass, ...rest } = existingUser._doc;
    return res.status(200).json({ rest });
  } catch (error) {
    res.status(500).json({ message: "Signin failed" });
  }
};
// qtfx sbpg dcce wlpy

