import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    jobTitle: String,
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default: null },
    left: Number,
    reason: {type: String, default: ""},
    satisfaction_level: Number,
    average_montly_hours: Number,
    promotion_last_5years: Boolean,
    department: String,
    salary: String,
    monthly_income: {type: Number, default: 1800},
});
export default mongoose.model('Employee', EmployeeSchema);