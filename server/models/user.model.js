import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  group: String,
  password: String,
  token: {
    default: null,
    type: String,
  },
  role: [{ type: String, ref: "Role" }],
});

export default mongoose.model("User", UserSchema);
