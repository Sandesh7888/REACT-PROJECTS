export default function colorFor(gender) {
  switch (gender?.toLowerCase()) {
    case "male":
      return "bg-blue-400";
    case "female":
      return "bg-pink-400";
    case "other":
      return "bg-green-400";
    default:
      return "bg-gray-300";
  }
}
