import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    gender: { type: String, enum: ["male", "female", "other"], default: "other" },
    parents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
    spouses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
    family: { type: mongoose.Schema.Types.ObjectId, ref: "Family" },
    notes: { type: String }
  },
  { timestamps: true }
);

memberSchema.post("save", async function (doc, next) {
  try {
    if (doc.parents && doc.parents.length) {
      await mongoose.model("Member").updateMany(
        { _id: { $in: doc.parents } },
        { $addToSet: { children: doc._id } }
      );
    }
  } catch (err) {
    console.error("Member post-save hook error:", err);
  }
  next();
});

export default mongoose.model("Member", memberSchema);
