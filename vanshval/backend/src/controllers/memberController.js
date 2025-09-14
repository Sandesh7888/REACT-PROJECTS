import Member from "../models/Member.js";

export const createMember = async (req, res) => {
  try {
    const { name, gender = "other", parents = [], spouses = [] } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ message: "Validation error: name is required" });
    }
    if (!["male","female","other"].includes(gender)) {
      return res.status(400).json({ message: "Validation error: invalid gender" });
    }

    const member = new Member({
      name: name.trim(),
      gender,
      parents,
      spouses,
      createdBy: req.user ? req.user._id : undefined
    });

    await member.save();
    // optionally populate parents/spouses
    const out = await Member.findById(member._id).populate("parents spouses");
    return res.status(201).json(out);
  } catch (err) {
    console.error("createMember error:", err);
    // if mongoose validation
    if (err.name === "ValidationError") {
      return res.status(422).json({ message: "Validation failed", details: err.errors });
    }
    return res.status(500).json({ message: "Server error while creating member", error: err.message });
  }
};
