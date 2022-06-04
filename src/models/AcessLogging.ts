import mongoose from "mongoose";

const AccessSchema: mongoose.Schema = new mongoose.Schema({
  hours: [
    {
      hour: {
        type: Number,
        required: true
      },
      ammount: {
        type: Number,
        required: true
      }
    }
  ]
});

const Access = mongoose.model("Access", AccessSchema);

export default Access;
