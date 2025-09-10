import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    gender: { type: String, enum: ["male", "female", "other"], default: "other" },
    dob: Date,
    dod: Date,
    photos: [String],
    notes: String,

    // Relationship fields
    parents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
    spouses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }]
  },
  { timestamps: true }
);

export default mongoose.model("Member", memberSchema);
