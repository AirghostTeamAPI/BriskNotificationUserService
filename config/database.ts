import config from "config";
import { ConnectionOptions, connect, set } from "mongoose";
set('debug', true);
const connectDB = async () => {
  try {
    const mongoURI: string = process.env.mongoURI || config.get("mongoURI");
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    await connect(mongoURI, options);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error((err as Error).message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
