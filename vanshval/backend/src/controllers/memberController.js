import Member from "../models/Member.js";

// GET /api/tree/:id
export const getFamilyTree = async (req, res) => {
  try {
    const { id } = req.params;
    const rootMember = await Member.findById(id)
      .populate({
        path: "children",
        populate: {
          path: "children",
          populate: { path: "children" },
        },
      });

    if (!rootMember) return res.status(404).json({ message: "Root member not found" });

    res.json(rootMember);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
