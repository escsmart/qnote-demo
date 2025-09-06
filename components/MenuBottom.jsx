"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
          <i
            className={pathname == "/inves" ? "bi bi-chat-dots" : "bi bi-chat"}
          ></i>
        </div>
        <span className="dock-label mt-1">QNote</span>
      </Link>
      <Link href={"/wallet"}>
        <div
          className={`menuNormal ${
            pathname == "/wallet" ? "menuActive" : null
          }`}
        >
          <i
            className={
              pathname == "/wallet"
                ? "bi bi-chat-square-text-fill"
                : "bi bi-chat-square-text"
            }
          ></i>
        </div>
        <span className="dock-label mt-1">QTitle</span>
      </Link>
      <Link href={"/"}>
        <div className={`menuNormal ${pathname == "/" ? "menuActive" : null}`}>
          <i
            className={
              pathname == "/" ? "bi bi-house-door-fill" : "bi bi-house-door"
            }
          ></i>
        </div>
        <span className="dock-label mt-1">Home</span>
      </Link>
      <Link href={"/profile"}>
        <div
          className={`menuNormal ${
            pathname == "/profile" ? "menuActive" : null
          }`}
        >
          <i
            className={
              pathname == "/profile"
                ? "bi bi-person-fill"
                : "bi bi-person text-[18px]"
            }
          ></i>
        </div>
        <span className="dock-label mt-1">โปรไฟล์</span>
      </Link>
      <label htmlFor="my-drawer" className="relative drawer-button">
        <div
          className={`menuNormal ${
            pathname == "/mylist" ? "menuActive" : null
          }`}
        >
          <i className="bi bi-list"></i>
        </div>
        <span className="dock-label mt-1">Menu</span>
      </label>
    </div>
  );
};
export default MenuBottom;
