import mongoose from "mongoose";

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`[+] Connected to database`);
    })
    .catch((err) => {
      if (err) console.log(err);
    });
};

export default dbConnect;
