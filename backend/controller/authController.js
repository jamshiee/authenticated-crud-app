import { comparePassword, createJwt, hashPassword } from "../lib/authValidation.js";
import User from "../models/userSchema.js";

export const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "Provide required field",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must contain a minimum of 8 digits",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

     res.status(200).json({
      message: "User Signup Successfull",
      newUser: newUser.email,
    });
  } catch (error) {
    return res.status(401).json({
      message: `User Signup Failed: ${error}`,
      error: error,
    });
  }
};
export const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not registered" });
    }

    const checkPassword = await comparePassword(password,user.password);

    if(!checkPassword) {
        return res.status(400).json({message: "Invalid credentials"})
    }

    const token = createJwt(user._id,res);

    user.password = undefined;

    res.status(200).json({
        message:"User Login Successfull",
        user,
        token
    })


  } catch (error) {
    return res.status(401).json({
      message: `User Signin Failed: ${error}`,
      error: error,
    });
  }
};
