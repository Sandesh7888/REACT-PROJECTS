import Member from "../models/Member.js";

export async function createMember(req, res, next) {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (e) { next(e); }
}

export async function getMembers(req, res, next) {
  try {
    const members = await Member.find().lean();
    res.json(members);
  } catch (e) { next(e); }
}

export async function getMemberById(req, res, next) {
  try {
    const member = await Member.findById(req.params.id).lean();
    if (!member) return res.status(404).json({ message: "Not found" });
    res.json(member);
  } catch (e) { next(e); }
}

export async function updateMember(req, res, next) {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ message: "Not found" });
    res.json(member);
  } catch (e) { next(e); }
}

export async function deleteMember(req, res, next) {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (e) { next(e); }
}
