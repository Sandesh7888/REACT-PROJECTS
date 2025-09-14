import mongoose from "mongoose";
import dotenv from "dotenv";
import Member from "./models/Member.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

async function seed() {
  await Member.deleteMany({});

  const dagadu = await Member.create({ name: "Dagadu" });

  const [atya, nana, kashinath, vitthal, trimbak, sahebrav] = await Member.create([
    { name: "Atya",      parents: [dagadu._id] },
    { name: "Nana",      parents: [dagadu._id] },
    { name: "Kashinath", parents: [dagadu._id] },
    { name: "Vitthal",   parents: [dagadu._id] },
    { name: "Trimbak",   parents: [dagadu._id] },
    { name: "Sahebrav",  parents: [dagadu._id] }
  ]);

  const prahlad = await Member.create({ name: "Prahlad", parents: [nana._id] });
  await Member.create([
    { name: "Bharat", parents: [prahlad._id] },
    { name: "Sharad", parents: [prahlad._id] }
  ]);

  console.log("Seed complete. Root Dagadu id:", dagadu._id.toString());
  await mongoose.disconnect();
}

seed().catch(async (e) => {
  console.error(e);
  await mongoose.disconnect();
  process.exit(1);
});
