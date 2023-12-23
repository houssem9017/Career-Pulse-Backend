import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: [true, 'Company name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    userType: {
        type: String,
        required: [true, 'User type is required'],
        enum: ['employee', 'manager'],
        default: 'employee'
    }
}, { timestamps: true });

// Hash the password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

export default mongoose.model('User', userSchema);
