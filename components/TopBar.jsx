"use client";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

const TopBar = ({ title }) => {
  const path = usePathname();
  const navigate = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  const onScroll = useCallback((event) => {
    if (window.scrollY > 70) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, []);

  return (
    <div className={`fixed w-full z-10 transition-all duration-200`}>
      {path == "/" ? null : (
        <>
          <div
            className={`w-full inline-flex transition duration-200 px-3 pt-11 ${
              isVisible ? "titleBarOntop" : "shadow-md titleBarOnScroll"
            }`}
          >
            <div
              className={`flex items-center justify-between gap-4 p-3 w-full transition-all duration-200 ${
                isVisible ? "px-4 bg5" : "px-3"
              }`}
            >
              <Icon.ChevronLeft onClick={() => navigate.back()} />
              <div
                className={`transition-all duration-200 ${
                  isVisible ? "flex-1" : ""
                }`}
              >
                {title}
              </div>
              {path == "/shop" ? (
                <label htmlFor="my-drawer" className="drawer-button">
                  <Icon.Cart3 />
                </label>
              ) : null}
              <div className="indicator">
                <span className="indicator-item badge badge-sm border-[1px] border-gray-500 px-1.5 badge-error text-white">
                  4
                </span>
                <Icon.BellFill
                  onClick={() => window.location.reload()}
                  className="text-xl"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default TopBar;
