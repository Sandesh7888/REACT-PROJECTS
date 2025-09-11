import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    parents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
    spouses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
    family: { type: mongoose.Schema.Types.ObjectId, ref: "Family" },
    dateOfBirth: { type: Date },
    dateOfDeath: { type: Date },
    notes: { type: String },
    photo: { type: String },
  },
  { timestamps: true }
);

// ✅ Auto-update parent's children list after saving a member
memberSchema.post("save", async function (doc, next) {
  if (doc.parents.length > 0) {
    await mongoose.model("Member").updateMany(
      { _id: { $in: doc.parents } },
      { $addToSet: { children: doc._id } }
    );
  }
  next();
});

export default mongoose.model("Member", memberSchema);
