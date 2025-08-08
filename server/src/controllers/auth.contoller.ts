import { Response, Request } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    
    const exUser = await User.findOne({ email });
    if (exUser) {
      return res.status(400).json({
        msg: "Email is already in use. Kindly try a different email ID.",
      });
    }

   
    const hashpassword = await bcrypt.hash(password, 5);

   
    const user = await User.create({
      username,
      email,
      password: hashpassword,
    });
    

   
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

   
    return res.status(201).json({
      msg: "Signup successful!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      msg: "Internal server error. Please try again later.",
    });
  }
};



//Signin

export const signin = async( req: Request , res: Response) => {
  const {email , password} = req.body ;
  try {
    const existingUser = await User.findOne({ email });
    if(!existingUser) return res.status(404).json({
      msg : " No such user found ",
    })
    // Now compare it 
    const matched = await bcrypt.compare(password, existingUser.password);
    if(!matched) return res.status(404).json({
      msg : " Invalid Password "
    });
        const Key = process.env.JWT_SECRET as string;
    const token = jwt.sign({ id: existingUser._id }, Key);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        createAt : existingUser.createdAt ,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error during sign-in", err });
  }
};

interface AuthenticatedRequest extends Request {
  user?: string;
}

export const profile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user);

    return res.status(200).json({ message: "User profile fetched", user });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching profile", error: (err as Error).message });
  }
};
