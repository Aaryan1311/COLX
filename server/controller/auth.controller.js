import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
  const { name, email, password, branch, rollNo, phoneNo } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
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

    const {password:pass, ...rest} =existingUser._doc;
    return res.status(200).json({ rest });
  } catch (error) {
    res.status(500).json({ message: "Signin failed" });
  }
};

