import MemberList from "../components/MemberList";
import MemberForm from "../components/MemberForm";

export default function Home() {
  return (
    <div>
      <h1>Family Manager</h1>
      <MemberForm onAdded={() => window.location.reload()} />
      <MemberList />
    </div>
  );
}
