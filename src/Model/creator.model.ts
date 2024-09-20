import mongoose, { Document, Model, Schema } from 'mongoose'; // Import necessary modules from mongoose
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing

// Interface defining the properties of the Creator document
interface ICreator extends Document {
    creatorId: string; // Unique identifier for the creator
    username: string; // Username of the creator
    email: string; // Email address of the creator
    password: string; // Password of the creator
    role: 'user' | 'creator' | 'admin'; // Role of the creator
    createdAt: Date; // Timestamp when the document was created
    updatedAt: Date; // Timestamp when the document was last updated
}

// Interface for static methods of the Creator model
interface ICreatorModel extends Model<ICreator> {
    checkPassword(password: string, hashedPassword: string): boolean; // Method to compare plaintext password with hashed password
}

// Define the schema for the Creator model
const creatorSchema = new Schema<ICreator>({
    creatorId: {
        type: String, // Field type is String
        unique: true, // Each creatorId must be unique
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

// Static method to compare plaintext password with hashed password
creatorSchema.statics.checkPassword = function (password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword); // Use bcrypt to compare the plaintext password with the hashed password
};

// Create the model from the schema
const Creator: ICreatorModel = mongoose.model<ICreator, ICreatorModel>('Creator', creatorSchema);

export default Creator; // Export the model for use in other parts of the application
