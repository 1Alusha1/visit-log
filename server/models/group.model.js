import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: String,
  monitor: String,
  students: Array,
});
export default mongoose.model("Group", GroupSchema);
