import mongoose from "mongoose";
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database............");
    }
    catch(err){
        console.log("Something is wrong with the database");
        throw new Error("Something is wrong with the database");
    }
}
export default connectDB