import mongoose from "mongoose";

const familySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Family", familySchema);
