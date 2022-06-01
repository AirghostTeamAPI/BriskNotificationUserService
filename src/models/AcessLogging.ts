import { model, Schema } from "mongoose";

const AccessSchema: Schema = new Schema({
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

const Access = model("Access", AccessSchema);

export default Access;
