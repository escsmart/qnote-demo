"use client";
import config from "@/app/config";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import Swal from "sweetalert2";

const Sidebar = ({ secure }) => {
  const router = useRouter();
  const path = usePathname();
  const [uData, setUData] = useState({
    uId: 0,
    uName: "",
    uLevel: "",
    uPic: "",
  });

  const checkSecure = (bool, nowPath) => {
    bool && (nowPath == "/signin" || nowPath == "/signup")
      ? router.push("/")
      : !bool && secure
      ? router.push("/signin")
      : null;
  };

  const handleSignOut = () => {
    Swal.fire({
      text: "ยืนยันการออกจากระบบ?",
      icon: "question",
      customClass: "swal-width",
      showConfirmButton: true,
      confirmButtonText: "ยืนยัน",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
    }).then((res) => {
      if (res.isConfirmed) {
        localStorage.clear();
        router.push("/signin");
      }
    });
  };

  useEffect(() => {
    const userId = localStorage.getItem("uId");
    const bool = Boolean(userId);
    if (bool) {
      setUData((prevState) => ({
        ...prevState,
        uId: userId,
        uName: config.uData("uName"),
        uLevel: config.uData("uLevel"),
        uPic: config.uData("uPic"),
      }));
    } else {
      setUData((prevState) => ({
        ...prevState,
        uName: "ผู้เยี่ยมชม",
        uLevel: "Guest",
        uPic: "usernone.png",
      }));
    }
    checkSecure(bool, path);
  }, []);
  return (
    <div className="drawer z-10">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu text-base-content min-h-full w-9/12 p-0">
          <div className="bg-neutral-300 h-[100vh] rounded-r-3xl p-3 overflow-hidden">
            <div className="card max-h-[97vh] overflow-y-scroll scrollHide">
              {/* // card figure */}
              <div className="card image-full w-full shadow-sm rounded-3xl">
                <figure>
                  <img
                    src="https://t4.ftcdn.net/jpg/02/42/94/05/360_F_242940510_FxVXYUrB36u3YBbWsWFtbX4DyRymFOqL.jpg"
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body flex flex-col justify-between p-4">
                  <div className="inline-flex justify-end">
                    <label htmlFor="my-drawer" className="btn rounded-2xl p-3">
                      <Icon.CaretLeftFill />
                    </label>
                  </div>
                  <div>
                    <h2 className="card-title">QUICK NOTE</h2>
                    <p className="font-medium opacity-75">
                      Tools Kit high Performance
                    </p>
                  </div>
                </div>
              </div>
              {/* // userName */}
              <div className="bg-white my-4 rounded-3xl p-2 flex items-center justify-between gap-3 relative">
                <div className="avatar">
                  <div className="mask mask-squircle w-14">
                    <img src={config.apiServer + "/images/" + uData.uPic} />
                  </div>
                </div>
                <div className="flex-1">
                  {/* {config.apiServer + "/images/" + uData.uPic} */}
                  <h2 className="font-bold">{uData.uName}</h2>
                  <p className="text-gray-400 text-sm">
                    สมาชิก : {uData.uLevel}
                  </p>
                </div>

                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="m-1">
                    <Icon.ThreeDotsVertical className="text-gray-600" />
                  </div>
                  <div
                    tabIndex={0}
                    className="dropdown-content menu bg-white rounded-box z-1 w-52 p-0 shadow-sm absolute -right-2 transform translate-y-[18%]"
                  >
                    <div className="flex flex-col items-center justify-around">
                      <Link
                        href={"/profile"}
                        className="w-full inline-flex items-center p-2"
                      >
                        <div className="flex-1">Your Profile</div>
                        <Icon.ChevronRight className="justify-end" />
                      </Link>
                      <div className="w-full inline-flex items-center p-2 border-y-[1px] border-base-300">
                        <div className="flex-1">Notification</div>
                        <Icon.ChevronRight className="justify-end" />
                      </div>
                      <div
                        onClick={handleSignOut}
                        className="w-full inline-flex items-center p-2"
                      >
                        <div className="flex-1">Log Out</div>
                        <Icon.ChevronRight className="justify-end" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* // NAVIGATION */}
              <h2 className="my-1 opacity-50">NAVIGATION</h2>
              <div className="bg-white rounded-3xl shadow-md p-4">
                <div className="flex flex-col items-center justify-around gap-1">
                  <div className="w-full py-2 inline-flex items-center justify-between gap-3">
                    <button className="btn btn-sm btn-circle btn-info">
                      <Icon.HouseFill className="" />
                    </button>
                    <h2 className="flex-1">Homepage</h2>
                    <Icon.ChevronRight className="justify-end" />
                  </div>
                  <Link
                    href={"/inote-create"}
                    className="w-full py-2 inline-flex items-center justify-between gap-3"
                  >
                    <button className="btn btn-sm btn-circle btn-success">
                      <Icon.ChatRightTextFill className="text-white" />
                    </button>
                    <h2 className="flex-1">เขียนโน๊ต</h2>
                    <Icon.ChevronRight className="justify-end" />
                  </Link>
                  <Link
                    href={"/inote"}
                    className="w-full py-2 inline-flex items-center justify-between gap-3"
                  >
                    <button className="btn btn-sm btn-circle bg-pink-800 border-0">
                      <Icon.PassFill className="text-white" />
                    </button>
                    <h2 className="flex-1">โน๊ตทั้งหมด</h2>
                    <Icon.ChevronRight className="justify-end" />
                  </Link>
                  <Link
                    href={"/inote"}
                    className="w-full py-2 inline-flex items-center justify-between gap-3"
                  >
                    <button className="btn btn-sm btn-circle bg-pink-800 border-0">
                      <Icon.PassFill className="text-white" />
                    </button>
                    <h2 className="flex-1">แชร์กับฉัน</h2>
                    <Icon.ChevronRight className="justify-end" />
                  </Link>
                  <div
                    onClick={() => console.log(uData)}
                    className="w-full py-2 inline-flex items-center justify-between gap-3"
                  >
                    <button className="btn btn-sm btn-circle btn-error">
                      <Icon.SuitHeartFill className="text-white" />
                    </button>
                    <h2 className="flex-1">รายการโปรด</h2>
                    <Icon.ChevronRight className="justify-end" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
