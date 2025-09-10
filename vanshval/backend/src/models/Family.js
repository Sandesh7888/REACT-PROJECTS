// src/models/Family.js
import mongoose from "mongoose";

const familySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Family", familySchema);
