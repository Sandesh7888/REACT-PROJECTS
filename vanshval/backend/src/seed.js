import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Family from "./models/Family.js";
import Member from "./models/Member.js";

dotenv.config();

const run = async () => {
  await connectDB();
  await Family.deleteMany({});
  await Member.deleteMany({});

  const fam = await Family.create({ name: "Vanshval Family" });

  const a = await Member.create({ name: "Grandfather", gender: "male", family: fam._id });
  const b = await Member.create({ name: "Grandmother", gender: "female", family: fam._id, spouses: [a._id] });
  a.spouses.push(b._id);
  await a.save();

  const c = await Member.create({ name: "Father", gender: "male", family: fam._id, parents: [a._id, b._id] });
  const d = await Member.create({ name: "Uncle", gender: "male", family: fam._id, parents: [a._id, b._id] });

  console.log("Seed complete");
  process.exit();
};

run().catch((e) => { console.error(e); process.exit(1); });
