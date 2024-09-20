import mongoose, { Document, Model, Schema } from 'mongoose'; // Import necessary modules from mongoose
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing and comparison

// Interface defining the properties of the Admin document
interface IAdmin extends Document {
    adminId: string; // Primary Key
    username: string; // New property for user's name
    email: string;
    password: string; // Renamed to match your previous schema
    role: 'user' | 'creator' | 'admin'; // Enum for user roles
    createdAt: Date;
    updatedAt: Date;
}

// Interface for static methods of the Admin model
interface IAdminModel extends Model<IAdmin> {
    checkPassword(password: string, hashedPassword: string): boolean; // Method to compare passwords
}

// Define the schema
const adminSchema = new Schema<IAdmin>({
    adminId: {
        type: String,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString(), // Automatically generate a unique ID
    },
    username: {
        type: String,
        trim: true,
        unique: false // 'unique' is not required here unless usernames must be unique
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true, // Convert email to lowercase for uniformity
    },
    password: {
        type: String,
        trim: true,
        set: (password: string) => {
            const salt = bcrypt.genSaltSync(10); // Generate a salt
            return bcrypt.hashSync(password, salt); // Hash the password with the salt
        },
    },
    role: {
        type: String,
        enum: ['user', 'creator', 'admin'], // Restrict role to one of the specified values
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set to the current date and time
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Automatically set to the current date and time
    }
}, {
    versionKey: false, // Disable the version key (__v)
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } // Automatically handle createdAt and updatedAt fields
});

// Static method to compare passwords
adminSchema.statics.checkPassword = function (password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword); // Compare the provided password with the hashed password
};

// Create the model
const Admin: IAdminModel = mongoose.model<IAdmin, IAdminModel>('Admin', adminSchema);

export default Admin; // Export the Admin model for use in other parts of the application
