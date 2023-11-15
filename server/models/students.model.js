import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: String,
  group: String,
  attendance: Array /**[{
    subject: string
    date: string
    was:boolean
  }] */,
});
export default mongoose.model("Students", GroupSchema);
