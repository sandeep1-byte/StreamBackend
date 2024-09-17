import User from '../Model/user.model';// Adjust the import path based on your project structure
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Uncomment if JWT functionality is required
import { configDotenv } from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { log } from 'console';

import nodemailer from 'nodemailer';
configDotenv();

const ok = process.env.successstatus;

export const SignUp = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password, role } = req.body;
     console.log(req.body);
    // Validate input

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", data: existingUser });
        }

        // Create a new user
        const user = new User({
            username,
            email,
            password, // Password is handled by the schema's `set` method
            role
        });

        await user.save();

        // Generate JWT token if needed
        // const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY!, { expiresIn: '7d' });
        return res.status(200).json({ message: "User created successfully", user });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: "Error creating user" });
    }
};

export const SignIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
console.log(password)
        // console.log(req.body);
        
        // Find the user by email
        const user = await User.findOne({ email });

        console.log(user);
        
        if (!user) {
            return res.status(401).json({ error: "Unauthorized user" });
        }

        // Check if the password is valid
        const isPasswordValid = await User.checkPassword(password, user.password);

        console.log(isPasswordValid);
        
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Generate a JWT token if needed
        // const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY!, { expiresIn: '7d' });

        return res.status(200).json({ message: "User signed in successfully", user });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const { email, password, newPassword } = req.body;


        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the current password is correct
        const isPasswordCorrect = await User.checkPassword(password, user.password);
        console.log(isPasswordCorrect);
        console.log(isPasswordCorrect);
        
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        // Update the password
        // user.password = await bcrypt.hash(newPassword, 10);
        user.password = newPassword;
        await user.save();

        console.log(user);
        
        console.log("Password updated successfully");

        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const generateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Unauthorized user" });
        }

        // Verify the password asynchronously
        const isPasswordValid = await User.checkPassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Create JWT token
        const payload = { userId: user.userId, email: user.email, role: user.role };
        const token = jwt.sign(payload, process.env.SECRET_KEY!, { expiresIn: '7d' });

        console.log(`${email} ${token}`); // Optional: for debugging

        return res.status(200).json({ message: "Token created successfully", token });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ error: "Internal server error" });
    }
};



// Function to generate a random OTP
let OTP: string;
const generateOTP = (): string => {
    const otpLength = 4; // Length of the OTP
    const digits = '0123456789'; // Possible digits in the OTP
    OTP = '';
    for (let i = 0; i < otpLength; i++) {
        OTP += digits[Math.floor(Math.random() * 10)]; // Randomly select a digit
    }
    return OTP;
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user:'thegreatayurveda@gmail.com', pass: 'mscy bdjt dttl plbj'  } // Use environment variables for credentials
});

const sendOTP = (receiverMail: string): void => {
    const otp = generateOTP(); // Generate OTP
    const mailOptions = {
        from: process.env.EMAIL_USER, // Use environment variable
        to: receiverMail,
        subject: 'Your OTP for The streaming platform',
        text: `Your OTP is: ${otp}` // Include OTP in the email body
    };

    transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent successfully...', info);
        }
    });
};

// Forgot Password Function
export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  
    try {
        const user = await User.findOne({ email: req.body.email }); // Ensure email field exists in the model
         console.log(user);
         
        if (user) {
            sendOTP(req.body.email);
            res.status(200).json({ message: 'User exists', detail: 'Email sent successfully' });
        } else {
            res.status(401).json({ message: 'Unauthorized request' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', err });
    }
};

// OTP Verification Function
export const verifyOTP = (req: Request, res: Response, next: NextFunction): void => {
    const otp: string = req.body.OTP;
    if (otp === OTP) {
        res.status(200).json({ message: 'OTP Verification Successful' });
    } else {
        res.status(401).json({ message: 'OTP Verification Failed' });
    }
};

// Set New Password Function
export const setNewPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
 
    try {
        const result = await User.findOneAndUpdate(
            { email: req.body.email }, // Query condition
            { password: req.body.password }, // Update field
            { new: true, runValidators: true } // Options
        );

        if (result) {
            res.status(200).json({ message: 'Password updated successfully' });
        } else {
            res.status(401).json({ message: 'Unauthorized request' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', err });
    }
};
