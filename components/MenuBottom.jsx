"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

const MenuBottom = () => {
  const path = usePathname();
  const [pathname, setPathname] = useState("");
  //   if (pathname == "/mylist") {
  //     const element = document.querySelector("#mylist");
  //     element.classList.add("dock-active");
  //   }

  useEffect(() => {
    if (path) setPathname(path);
  }, []);

  return (
    <div className="dock dock-lg border-t-0 pb-6 pt-3 h-22 bg-white">
      <Link href={"/inote"}>
        <div
          className={`menuNormal ${pathname == "/inote" ? "menuActive" : null}`}
        >
          {path == "/inote" ? <Icon.ArchiveFill /> : <Icon.Archive />}
        </div>
        <span className="dock-label mt-1">QNote</span>
      </Link>
      <Link href={"/iquick"}>
        <div
          className={`menuNormal ${
            pathname == "/iquick" ? "menuActive" : null
          }`}
        >
          {path == "/iquick" ? <Icon.HeartFill /> : <Icon.Heart />}
        </div>
        <span className="dock-label mt-1">QNote</span>
      </Link>
      <Link href={"/"}>
        <div className={`menuNormal ${pathname == "/" ? "menuActive" : null}`}>
          {path == "/" ? <Icon.HouseDoorFill /> : <Icon.HouseDoor />}
        </div>
        <span className="dock-label mt-1">Home</span>
      </Link>
      <Link href={"/video"}>
        <div
          className={`menuNormal ${pathname == "/video" ? "menuActive" : null}`}
        >
          {path == "/video" ? <Icon.PlayCircleFill /> : <Icon.PlayCircle />}
        </div>
        <span className="dock-label mt-1">Video</span>
      </Link>
      <label htmlFor="my-drawer" className="relative drawer-button">
        <div
          className={`menuNormal ${
            pathname == "/mylist" ? "menuActive" : null
          }`}
        >
          <Icon.ColumnsGap />
        </div>
        <span className="dock-label mt-1">All</span>
      </label>
    </div>
  );
};
export default MenuBottom;
