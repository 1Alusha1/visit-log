import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AllOfGroupsSchema = new Schema({
  name: { type: String, ref: "Group" },
});
export default mongoose.model("AllOfGroups", AllOfGroupsSchema);
