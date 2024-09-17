import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Uncomment if JWT functionality is required
import { configDotenv } from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { log } from 'console';
import Creator from '../Model/creator.model';

configDotenv();

const ok = process.env.successstatus;

export const SignUp = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password, role } = req.body;
     console.log(req.body);
    // Validate input

    try {
        // Check if creator already exists
        const existingUser = await Creator.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Creator already exists", data: existingUser });
        }

        // Create a new creator
        const creator = new Creator({
            username,
            email,
            password, // Password is handled by the schema's `set` method
            role
        });

        await creator.save();

        // Generate JWT token if needed
        // const token = jwt.sign({ id: creator._id }, process.env.SECRET_KEY!, { expiresIn: '7d' });
        return res.status(200).json({ message: "Creator created successfully", creator });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: "Error creating creator" });
    }
};

export const SignIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

    
        // Find the creator by email
        const creator = await Creator.findOne({ email });

        if (!creator) {
            return res.status(401).json({ error: "Unauthorized creator" });
        }

        // Check if the password is valid
        const isPasswordValid = Creator.checkPassword(password, creator.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Generate a JWT token if needed
        // const token = jwt.sign({ id: creator._id }, process.env.SECRET_KEY!, { expiresIn: '7d' });

        return res.status(200).json({ message: "Creator signed in successfully", creator });
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
        const creator = await Creator.findOne({ email });

        if (!creator) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the current password is correct
        const isPasswordCorrect = await Creator.checkPassword(password, creator.password);
        console.log(isPasswordCorrect);
        console.log(isPasswordCorrect);
        
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        creator.password = newPassword;
        await creator.save();

        
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

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find the creator by email
        const creator = await Creator.findOne({ email });

        if (!creator) {
            return res.status(401).json({ error: "Unauthorized creator" });
        }

        // Verify the password
        const isPasswordValid = Creator.checkPassword(password, creator.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Create JWT token
        const payload = { userId: creator.creatorId, email: creator.email, role: creator.role };
        const token = jwt.sign(payload, process.env.SECRET_KEY!, { expiresIn: '7d' });

        console.log(`${email} ${token}`); // Optional: for debugging

        return res.status(200).json({ message: "Token created successfully", token });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ error: "Internal server error" });
    }
};