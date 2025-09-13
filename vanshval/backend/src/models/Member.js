import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  parents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
  spouses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Member", memberSchema);
