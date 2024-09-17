import { Request, Response, NextFunction } from 'express';
import {verify, JwtPayload } from 'jsonwebtoken';

export const verifyUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ Message: "Authorization header is missing" });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ Message: "Token is missing" });
        }

        // Verify the token
        const isAuthorized = verify(token, process.env.User_SECRET_KEY as string) as JwtPayload;

        if (!isAuthorized) {
            return res.status(403).json({ Message: "User is unauthorized" });
        }

        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: "Internal server error" });
    }
};

export const verifyCreator = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ Message: "Authorization header is missing" });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ Message: "Token is missing" });
        }

        // Verify the token
        const isAuthorized = verify(token, process.env.User_SECRET_KEY as string) as JwtPayload;

        if (!isAuthorized) {
            return res.status(403).json({ Message: "Creator is unauthorized" });
        }

        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: "Internal server error" });
    }
};
export const verifyAdmin = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ Message: "Authorization header is missing" });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ Message: "Token is missing" });
        }

        // Verify the token
        const isAuthorized = verify(token, process.env.User_SECRET_KEY as string) as JwtPayload;

        if (!isAuthorized) {
            return res.status(403).json({ Message: "Admin is unauthorized" });
        }

        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ Error: "Internal server error" });
    }
};