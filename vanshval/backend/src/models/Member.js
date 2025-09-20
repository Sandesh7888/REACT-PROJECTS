import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  birthDate: { type: Date, required: true },
  deathDate: { type: Date },
  info: { type: String },
  familyId: { type: String }, // optional family group
  parents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
});

const Member = mongoose.model("Member", memberSchema);

export default Member;
