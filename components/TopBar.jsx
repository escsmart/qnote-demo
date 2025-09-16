"use client";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

const TopBar = ({ title }) => {
  const path = usePathname();
  const navigate = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  const onScroll = useCallback((event) => {
    if (window.scrollY > 50) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, []);

  // const checkOntop = useCallback((event) => {
  //   if (window.scrollY !== 0) {
  //     alert(window.scrollY);
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   }
  // }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, []);

  return (
    <div
      className={`fixed w-full z-10 transition-all duration-200 ${
        isVisible ? "p-2 pt-3" : "p-0"
      }`}
    >
      <div
        className={`card w-full inline-flex shadow-md transition duration-200 ${
          isVisible ? "titleBarOntop" : "titleBarOnScroll"
        }`}
      >
        <div className="flex items-center justify-between gap-4 p-3 px-4 w-full">
          {path == "/" ? (
            <label htmlFor="my-drawer" className="drawer-button">
              <Icon.List />
            </label>
          ) : (
            <Icon.ChevronLeft onClick={() => navigate.back()} />
          )}
          <div className="flex-1">{title}</div>
          {path == "/shop" ? (
            <label htmlFor="my-drawer" className="drawer-button">
              <Icon.Cart3 />
            </label>
          ) : null}
          <Icon.BellFill onClick={() => window.location.reload()} />
        </div>
      </div>
    </div>
  );
};
export default TopBar;
