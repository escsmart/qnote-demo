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
      <Link href={"/inves"}>
        <div
          className={`menuNormal ${pathname == "/inves" ? "menuActive" : null}`}
        >
          {path == "/inves" ? <Icon.ChatDots /> : <Icon.Chat />}
        </div>
        <span className="dock-label mt-1">QNote</span>
      </Link>
      <Link href={"/wallet"}>
        <div
          className={`menuNormal ${
            pathname == "/wallet" ? "menuActive" : null
          }`}
        >
          {path == "/wallet" ? (
            <Icon.ChatSquareTextFill />
          ) : (
            <Icon.ChatSquareText />
          )}
        </div>
        <span className="dock-label mt-1">QTitle</span>
      </Link>
      <Link href={"/"}>
        <div className={`menuNormal ${pathname == "/" ? "menuActive" : null}`}>
          {path == "/" ? <Icon.HouseDoorFill /> : <Icon.HouseDoor />}
        </div>
        <span className="dock-label mt-1">Home</span>
      </Link>
      <Link href={"/profile"}>
        <div
          className={`menuNormal ${
            pathname == "/profile" ? "menuActive" : null
          }`}
        >
          {path == "/profile" ? <Icon.PersonFill /> : <Icon.Person />}
        </div>
        <span className="dock-label mt-1">โปรไฟล์</span>
      </Link>
      <label htmlFor="my-drawer" className="relative drawer-button">
        <div
          className={`menuNormal ${
            pathname == "/mylist" ? "menuActive" : null
          }`}
        >
          <Icon.List />
        </div>
        <span className="dock-label mt-1">Menu</span>
      </label>
    </div>
  );
};
export default MenuBottom;
