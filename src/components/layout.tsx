import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav>header</nav>
      <Outlet />
    </>
  );
}
