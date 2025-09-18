"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import Sidebar from "./Sidebar";

const MenuBottom = ({ secure }) => {
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
    <>
      <div className="dock dock-lg border-t-0 pb-6 pt-3 h-22 bg-white">
        <Link href={"/inote"}>
          <div
            className={`menuNormal ${
              pathname == "/inote" ? "menuActive" : null
            }`}
          >
            {path == "/inote" ? <Icon.ArchiveFill /> : <Icon.Archive />}
          </div>
          <span className="dock-label mt-1">QNote</span>
        </Link>
        <Link href={"/ilink"}>
          <div
            className={`menuNormal ${
              pathname == "/ilink" ? "menuActive" : null
            }`}
          >
            {path == "/ilink" ? (
              <Icon.Link45deg className="text-xl" />
            ) : (
              <Icon.Link45deg className="text-xl" />
            )}
          </div>
          <span className="dock-label mt-1">iLink</span>
        </Link>
        <Link href={"/"}>
          <div
            className={`menuNormal ${pathname == "/" ? "menuActive" : null}`}
          >
            {path == "/" ? <Icon.HouseDoorFill /> : <Icon.HouseDoor />}
          </div>
          <span className="dock-label mt-1">Home</span>
        </Link>
        <Link href={"/shop"}>
          <div
            className={`menuNormal ${
              pathname == "/shop" ? "menuActive" : null
            }`}
          >
            {path == "/shop" ? <Icon.ShopWindow /> : <Icon.ShopWindow />}
          </div>
          <span className="dock-label mt-1">Shop</span>
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
      <Sidebar secure={secure} />
    </>
  );
};
export default MenuBottom;
