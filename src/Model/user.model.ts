import mongoose, { Document, Model, Schema } from 'mongoose'; // Import necessary modules from mongoose
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing

// Interface defining the properties of the User document
interface IUser extends Document {
    userId: string; // Unique identifier for the user
    username: string; // Username of the user
    email: string; // Email address of the user
    password: string; // Password of the user
    role: 'user' | 'creator' | 'admin'; // Role of the user
    createdAt: Date; // Timestamp when the document was created
    updatedAt: Date; // Timestamp when the document was last updated
}

// Interface for static methods of the User model
interface IUserModel extends Model<IUser> {
    checkPassword(password: string, hashedPassword: string): Promise<boolean>; // Method to compare plaintext password with hashed password asynchronously
}

// Define the schema for the User model
const userSchema = new Schema<IUser>({
    userId: {
        type: String, // Field type is String
        unique: true, // Each userId must be unique
        default: () => new mongoose.Types.ObjectId().toString(), // Generate a unique ID by default
    },
    username: {
        type: String, // Field type is String
        trim: true, // Remove whitespace from both ends of the string
        unique: false // Username does not need to be unique
    },
    email: {
        type: String, // Field type is String
        unique: true, // Each email must be unique
        trim: true, // Remove whitespace from both ends of the string
        lowercase: true, // Convert email to lowercase
    },
    password: {
        type: String, // Field type is String
        trim: true, // Remove whitespace from both ends of the string
        set: (password: string) => { // Function to hash the password before saving
            const salt = bcrypt.genSaltSync(10); // Generate a salt with 10 rounds
            return bcrypt.hashSync(password, salt); // Hash the password with the salt
        },
    },
    role: {
        type: String, // Field type is String
        enum: ['user', 'creator', 'admin'], // Only allow specific values for the role
    },
    createdAt: {
        type: Date, // Field type is Date
        default: Date.now, // Set default value to the current date and time
    },
    updatedAt: {
        type: Date, // Field type is Date
        default: Date.now, // Set default value to the current date and time
    }
}, {
    versionKey: false, // Disable the __v version key
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } // Automatically manage createdAt and updatedAt fields
});

// Static method to compare plaintext password with hashed password asynchronously
userSchema.statics.checkPassword = async function (password: string, hashedPassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, hashedPassword); // Use async bcrypt.compare to check passwords
    } catch (error) {
        console.error('Error comparing passwords:', error); // Log error if comparison fails
        throw new Error('Password comparison failed'); // Throw an error if comparison fails
    }
};

// Create the model from the schema
const User: IUserModel = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User; // Export the model for use in other parts of the application
