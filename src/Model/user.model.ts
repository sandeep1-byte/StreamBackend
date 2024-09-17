import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface defining the properties of the User document
interface IUser extends Document {
    userId: string; // Primary Key
    username: string; // New property for user's name
    email: string;
    password: string; // Renamed to match your previous schema
    role: 'user' | 'creator' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

// Interface for static methods of the User model
interface IUserModel extends Model<IUser> {
    checkPassword(password: string, hashedPassword: string): Promise<boolean>; // Make it async
}

// Define the schema
const userSchema = new Schema<IUser>({
    userId: {
        type: String,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString(), // Automatically generate a unique ID
    },
    username: {
        type: String,
        trim: true,
        unique: false
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        trim: true,
        set: (password: string) => {
            const salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(password, salt);
        },
    },
    role: {
        type: String,
        enum: ['user', 'creator', 'admin'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } // Automatically handles createdAt and updatedAt fields
});

// Static method to compare passwords asynchronously
userSchema.statics.checkPassword = async function (password: string, hashedPassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, hashedPassword); // Use async bcrypt.compare
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Password comparison failed');
    }
};

// Create the model
const User: IUserModel = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;
