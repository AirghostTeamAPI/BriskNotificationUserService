import config from "config";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI: string = process.env.mongoURI || config.get("mongoURI");
    const options: mongoose.ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    await mongoose.connect(mongoURI, options);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error((err as Error).message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
