import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected"));
  const uri = `${process.env.MONGODB_URI_BASE}/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority&appName=Cluster`;
  await mongoose.connect(uri);
};

export default connectDB;
