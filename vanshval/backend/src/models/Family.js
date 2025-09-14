import mongoose from "mongoose";
import User from "./User.js";


const familySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
  },
  { timestamps: true }
);

export default mongoose.model("Family", familySchema);
