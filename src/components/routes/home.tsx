import { auth } from "../../firebase";

export default function Home() {
  const logout = () => {
    auth.signOut();
  };
  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  );
}
