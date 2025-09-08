"use client";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

const TopBar = ({ title }) => {
  const path = usePathname();
  const navigate = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const onScroll = useCallback((event) => {
    if (window.scrollY > 50) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setScrollY(window.scrollY);
  }, []);

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
        <div className="flex items-center justify-between gap-3 p-3 px-4 w-full">
          {path == "/" ? (
            <label htmlFor="my-drawer" className="drawer-button">
              <Icon.List />
            </label>
          ) : (
            <Icon.ChevronLeft onClick={() => navigate.back()} />
          )}
          <div className="flex-1">{title}</div>
          <Icon.BellFill />
        </div>
      </div>
    </div>
  );
};
export default TopBar;
