import mongoose from "mongoose";

const familySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String
}, { timestamps: true });

export default mongoose.model("Family", familySchema);
