"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import config from "@/app/config";
import Template from "@/components/Template";
import MenuBottom from "@/components/MenuBottom";
import PageLoading from "@/components/PageLoading";
import * as Icon from "react-bootstrap-icons";
import Image from "next/image";

const profilePage = () => {
  const [pageOnLoad, setPageOnLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [img, setImg] = useState("");
  const [myFile, setMyFile] = useState();

  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    profileImage: "",
  });

  const handleSelectedFile = (e) => {
    if (e.target.files.length > 0) {
      setMyFile(e.target.files[0]);
    }
  };

  const fetchData = async () => {
    await axios
      .get(config.apiServer + "/auth/get-udata", config.headerAuth())
      .then((res) => {
        if (res.data.message === "success") {
          const dataResult = res.data.result;
          if (dataResult.email == null) {
            dataResult.email = "";
          }
          setUserData(dataResult);
          setPageOnLoad(true);
        }
      });
  };

  const handleSaveUpdate = async () => {
    var formData = new FormData();
    formData.append("id", config.uData("uId"));
    formData.append("name", userData.name);
    formData.append("phone", userData.phone);
    formData.append("email", userData.email);
    formData.append("image", myFile);

    await axios
      .post(config.apiServer + "/update-udata", formData)
      .then((res) => {
        if (res.data.message === "success") {
          fetchData();
          // Update Storage ด้วย
          localStorage.setItem("uName", res.data.result.name);
          localStorage.setItem("uPic", res.data.result.profileImage);
        }
      });
  };

  // Scrool To Refresh
  const onScroll = useCallback((event) => {
    if (window.scrollY < -50) {
      fetchData();
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, []);
  return (
    <>
      <Template title={"Profile"}>
        <div className="min-h-screen w-full bg-base-200">
          <div className={`h-8 flex items-center justify-center`}>
            <span
              className={`loading loading-xl loading-spinner text-info ${
                isLoading ? "block" : "hidden"
              }`}
            ></span>
          </div>

          {pageOnLoad ? (
            <section className="min-h-screen px-4 pt-10 pb-18 mb-10">
              <div className="flex flex-col items-center bg-white mt-2 p-4 py-6 rounded-3xl">
                <div className="w-full flex items-start justify-between">
                  <div className="avatar indicator">
                    <span className="indicator-item indicator-bottom indicator-center indicator-end badge py-4">
                      <Icon.CameraFill
                        className="text-2xl"
                        onClick={() =>
                          document.getElementById("myFile").click()
                        }
                      />
                    </span>
                    <div className="mask mask-squircle w-28">
                      <Image
                        src={
                          config.apiServer + "/images/" + userData.profileImage
                        }
                        width={50}
                        height={50}
                        alt={inote.user.name}
                        priority
                      />
                    </div>
                  </div>
                  <div className="join">
                    <button
                      onClick={() => {
                        document.getElementById("modalEditData").showModal();
                      }}
                      className="btn btn-sm btn-info join-item px-2"
                    >
                      <Icon.PencilFill className="text-[1.25em]" /> ข้อมูล
                    </button>
                    <button
                      onClick={() => {
                        document.getElementById("modalChangePwd").showModal();
                      }}
                      className="btn btn-sm btn-info join-item px-2"
                    >
                      <Icon.KeyFill className="rotate-135 text-xl" /> รหัส
                    </button>
                  </div>
                </div>

                {/* // form */}
                <div className="w-full my-5">
                  <input
                    type="file"
                    className="file-input hidden"
                    onChange={(e) => handleSelectedFile(e)}
                    id="myFile"
                  />

                  <ul className="text-sm mt-4">
                    <li className="flex items-center justify-between gap-3">
                      <Icon.PersonCircle className="w-6" />
                      <div className="flex-1">{userData.name}</div>
                    </li>
                    <li className="flex items-center justify-between gap-3 border-t-[1px] border-gray-300 pt-3 mt-3">
                      <Icon.Phone className="w-6" />
                      <div className="flex-1">{userData.phone}</div>
                    </li>
                    <li className="flex items-center justify-between gap-3 border-t-[1px] border-gray-300 pt-3 mt-3">
                      <Icon.At className="text-[1rem] w-6" />
                      <div className="flex-1">{userData.email}</div>
                    </li>
                  </ul>
                </div>
                {/* <button
                  onClick={handleSaveUpdate}
                  className="btn btn-block btn-info"
                >
                  บันทึก
                </button> */}
              </div>

              {/* // Social */}
              <div className="bg-white mt-5 p-4 py-6 rounded-3xl">
                <p className="text-xs font-semibold text-secondary-content">
                  Connected Profile
                </p>
                <h2 className="text-2xl font-semibold">Socials</h2>
                <p className="text-sm mt-3 mb-5 opacity-60">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Natus, quaerat sint itaque nisi reprehenderit neque.
                </p>
                <ul className="text-sm">
                  <li className="flex items-center justify-between gap-3">
                    <Icon.Facebook className="text-blue-800" />
                    <div className="flex-1">Facebook</div>
                    <Icon.ChevronRight />
                  </li>
                  <li className="flex items-center justify-between gap-3 border-y-[1px] border-gray-300 py-3 my-3">
                    <Icon.TwitterX />
                    <div className="flex-1">Twitter X</div>
                    <Icon.ChevronRight />
                  </li>
                  <li className="flex items-center justify-between gap-3">
                    <Icon.Instagram className="text-pink-600" />
                    <div className="flex-1">Instagram</div>
                    <Icon.ChevronRight />
                  </li>
                </ul>
              </div>
            </section>
          ) : (
            <PageLoading />
          )}
        </div>
      </Template>
      <MenuBottom secure={true} />

      {/* modalChangePwd */}
      <dialog id="modalChangePwd" className="modal sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">แก้ไขรหัสผ่าน</h3>
          <div className="py-5 flex flex-col gap-3">
            <label className="input floating-label w-full border-[1px] rounded-xl h-12 bg-white">
              <Icon.Asterisk className="text-xl opacity-55" />
              <span>PASSWORD</span>
              <input
                type="password"
                className="grow border-0 focus:outline-0"
                placeholder="Password"
              />
              <div className="text-slate-400 text-xs">(required)</div>
            </label>
            <label className="input floating-label w-full border-[1px] rounded-xl h-12 bg-white">
              <Icon.Asterisk className="text-xl opacity-55" />
              <span>PASSWORD CONFIRM</span>
              <input
                type="password"
                className="grow border-0 focus:outline-0"
                placeholder="Confirm"
              />
              <div className="text-slate-400 text-xs">(required)</div>
            </label>
          </div>
          <div className="w-full mt-4">
            <form method="dialog">
              <button className="btn btn-block btn-info text-white">
                อัพเดท
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* modalEditData */}
      <dialog id="modalEditData" className="modal sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">แก้ไขรหัสผ่าน</h3>
          <div className="py-5 flex flex-col gap-3">
            <label className="input floating-label w-full border-[1px] rounded-xl h-12 my-2 bg-white">
              <Icon.PersonCircle className="text-xl opacity-55" />
              <span>NAME</span>
              <input
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                type="text"
                className="grow border-0 focus:outline-0"
                placeholder="Name"
              />
              <div className="text-slate-400 text-xs">(required)</div>
            </label>

            <label className="input floating-label w-full border-[1px] rounded-xl h-12 mb-2 bg-white">
              <Icon.Phone className="text-xl opacity-70" />
              <span>PHONE</span>
              <input
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                type="text"
                className="grow border-0 focus:outline-0"
                placeholder="Phone"
              />
              <div className="text-slate-400 text-xs">(required)</div>
            </label>

            <label className="input floating-label w-full border-[1px] rounded-xl h-12 bg-white">
              <Icon.At className="text-xl opacity-70" />
              <span>EMAIL</span>
              <input
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                type="text"
                className="grow border-0 focus:outline-0"
                placeholder="E-mail"
              />
              <div className="text-slate-400 text-xs">(required)</div>
            </label>
          </div>
          <div className="w-full mt-2">
            <form method="dialog">
              <button
                onClick={handleSaveUpdate}
                className="btn btn-block btn-info text-white"
              >
                บันทึก
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};
export default profilePage;
