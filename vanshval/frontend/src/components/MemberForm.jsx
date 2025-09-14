import { useState } from "react";
import api from "../api";

export default function MemberForm({ onAdded }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [parents, setParents] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/members", {
        name,
        gender,
        parents: parents.split(",").map((id) => id.trim()).filter(Boolean),
      });
      setName("");
      setParents("");
      onAdded && onAdded();
    } catch (err) {
      console.error(err);
      alert("Error adding memb
      <button type="submit">Add Member</button>
    </form>
  );
}
