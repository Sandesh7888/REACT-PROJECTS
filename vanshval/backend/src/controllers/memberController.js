import Member from "../models/Member.js";

// ✅ Create a new member
export const createMember = async (req, res) => {
  try {
    const { name, gender, parents = [], spouses = [], family } = req.body;

    const member = new Member({
      name,
      gender,
      parents,
      spouses,
      family: family || null,
    });

    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: "Error creating member", error: error.message });
  }
};

// ✅ Get all members
export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ name: 1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: "Error fetching members" });
  }
};

// ✅ Get full family tree by root member
export const getFamilyTree = async (req, res) => {
  try {
    const rootId = req.params.id;
    const root = await Member.findById(rootId).populate("spouses parents");

    if (!root) {
      return res.status(404).json({ message: "Root member not found" });
    }

    const buildTree = async (member) => {
      const children = await Member.find({ parents: member._id });

      return {
        _id: member._id,
        name: member.name,
        gender: member.gender,
        spouses: member.spouses,
        children: await Promise.all(children.map(buildTree)),
      };
    };

    const tree = await buildTree(root);
    res.json(tree);
  } catch (error) {
    res.status(500).json({ message: "Error fetching family tree" });
  }
};
