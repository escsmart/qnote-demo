"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Navbar = ({ title }) => {
  const navigate = useRouter();
  return (
    <>
      <div className="bg-prim p-4 fixed top-0 w-screen z-10">
        <div className="text-white flex items-center justify-between">
          <i
            className="bi bi-chevron-left text-xl"
            onClick={() => navigate.back()}
          ></i>
          <div>{title}</div>
          <label htmlFor="my-drawer" className="drawer-button">
            <i className="bi bi-list text-xl"></i>
          </label>
        </div>
      </div>

      <div className="drawer z-10">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <Link href={"/number"}>Game</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Navbar;
