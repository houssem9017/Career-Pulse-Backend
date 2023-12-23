import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
    title:String,
    min:Number,
    max:Number,
});

export default mongoose.model('Salary', salarySchema);