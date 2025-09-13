import { useState } from "react";
import Tree from "../components/Tree";

export default function TreeView() {
  const [rootId, setRootId] = useState("");

  return (
    <div>
      <h2>Family Tree</h2>
      <input
        value={rootId}
        onChange={(e) => setRootId(e.target.value)}
        placeholder="Enter Root Member ID"
      />
      <Tree rootId={rootId} />
    </div>
  );
}
