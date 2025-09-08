import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="drawer z-10">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu  text-base-content min-h-full w-80 p-3 ps-0 max-w-8/12">
          <ul className="bg-base-200 min-h-[96vh] rounded-r-3xl py-4">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <Link href={"/number"}>Game</Link>
            </li>
            <li>
              <Link href={"/mylist"}>ความเคลื่อนไหว</Link>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
