import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ["male","female","other"], required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
  family: { type: mongoose.Schema.Types.ObjectId, ref: "Family", }
}, { timestamps: true });

export default mongoose.model("Member", memberSchema);
