import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface defining the properties of the User document
interface IAdmin extends Document {
    adminId: string; // Primary Key
    username: string; // New property for user's name
    email: string;
    password: string; // Renamed to match your previous schema
    role: 'user' | 'creator' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

// Interface for static methods of the User model
interface IAdminModel extends Model<IAdmin> {
    checkPassword(password: string, hashedPassword: string): boolean;
}

// Define the schema
const adminSchema = new Schema<IAdmin>({
    adminId: {
        type: String,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString(), // Automatically generate a unique ID
    },
    username:{
        type: String,
        trim: true,
        unique:false
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
        enum: ['user', 'creator','admin'],
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

// Static method to compare passwords
adminSchema.statics.checkPassword = function (password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
};

// Create the model
const Admin: IAdminModel = mongoose.model<IAdmin, IAdminModel>('Admin', adminSchema);

export default Admin;