"use client";
import config from "@/app/config";
import Template from "@/components/Template";
import axios from "axios";
import moment from "moment";
import * as Icon from "react-bootstrap-icons";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import PageLoading from "@/components/PageLoading";
import MenuBottom from "@/components/MenuBottom";
import Image from "next/image";

const viewNotePage = () => {
  const router = useRouter();
  const { viewId } = useParams();
  const [pageOnLoad, setPageOnLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [btnComplete, setBtnComplete] = useState(true);
  const [noteList, setNoteList] = useState([]);
  const [countList, setCountList] = useState(0);
  const [inote, setInote] = useState({
    title: "",
    isHistory: false,
    sharedUsers: "",
    user: {
      name: "",
      profileImage: "",
    },
  });

  const [friends, setFriend] = useState([]);
  const [shareds, setShared] = useState([]);

  const fetchData = async () => {
    await axios
      .get(config.apiServer + "/inote/view-list/" + viewId, config.headerAuth())
      .then((res) => {
        if (res.data.message === "success") {
          setInote(res.data.inote);
          setCountList(res.data.count);
          let dataList = [];
          let dataComplete = [];
          for (let i = 0; i < res.data.data.length; i++) {
            const item = res.data.data[i];
            if (item.isComplete == true) {
              dataComplete.unshift(item);
            } else {
              dataList.unshift(item);
            }
          }
          if (res.data.count == dataComplete.length) {
            setBtnComplete(false);
          } else if (res.data.count !== dataComplete.length) {
            setBtnComplete(true);
          }
          const items = dataList.concat(dataComplete);
          setNoteList(items);
          setFriend(res.data.friend.friendsList);
          setShared(res.data.friend.sharedsList);
          setPageOnLoad(true);
        } else {
          router.push("/inote");
        }
      });
  };

  // Remove
  const handleRemove = async (id) => {
    const payload = {
      count: countList,
      id: id,
    };
    await axios
      .post(config.apiServer + "/inote/remove-list/", payload)
      .then((res) => {
        if (res.data.message === "success") {
          fetchData();
        } else if (res.data.message === "removeall") {
          router.push("/inote");
        }
      });
  };

  // Delete This Note ALL
  const handleRemoveNote = async () => {
    await axios
      .delete(config.apiServer + "/inote/delete-all/" + viewId)
      .then((res) => {
        if (res.data.message === "success") {
          router.push("/inote");
        }
      });
  };

  // Edit Title
  const handleEditTitle = async () => {
    const payload = {
      id: viewId,
      title: inote.title,
    };
    await axios
      .put(config.apiServer + "/inote/editTitle", payload)
      .then((res) => {
        if (res.data.message === "success") {
          fetchData();
        }
      });
  };

  // Confirm Alert
  const handleComfirm = (type, item) => {
    if (type == "remove") {
      Swal.fire({
        text: `${
          countList == 1 ? "หัวข้อโน๊ตจะถูกลบ เมื่อไม่มีรายการแล้ว" : ""
        } ยืนยันลบรายการ ${item.text} ?`,
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "NO",
        showConfirmButton: true,
        confirmButtonText: "YES",
      }).then((res) => {
        if (res.isConfirmed) {
          handleRemove(item.id);
        }
      });
    } else if (type == "delete") {
      Swal.fire({
        text: `ลบโน๊ต ${item} ?`,
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "NO",
        showConfirmButton: true,
        confirmButtonText: "YES",
      }).then((res) => {
        if (res.isConfirmed) {
          handleRemoveNote();
        }
      });
    } else if (type == "editTitleNote") {
      handleEditTitle();
    }
  };

  // Add List
  const [formData, setFormData] = useState({
    text: "",
    inoteId: viewId,
  });

  const handleSaveForm = async () => {
    await axios
      .post(config.apiServer + "/inote/add-list", formData, config.headerAuth())
      .then((res) => {
        if (res.data.message === "success") {
          setFormData({ ...formData, text: "" });
          fetchData();
        }
      });
  };

  // setcomplete
  const handleComplete = async (type, item) => {
    if (type == "single") {
      const payload = {
        isComplete: !item.isComplete,
      };
      await axios
        .put(config.apiServer + "/inote/complete-list/" + item.id, payload)
        .then((res) => {
          if (res.data.message === "success") {
            fetchData();
          }
        });
    } else if (type == "all") {
      await axios
        .put(config.apiServer + "/inote/completeall-list/" + viewId)
        .then((res) => {
          if (res.data.message === "success") {
            fetchData();
          }
        });
    }
  };

  // setHistory
  const handleTogleHistory = async () => {
    const payload = {
      id: inote.id,
      history: !inote.isHistory,
    };
    await axios
      .put(config.apiServer + "/inote/togle-history", payload)
      .then((res) => {
        if (res.data.message === "success") {
          setInote(res.data.result);
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

  // แชร์
  const handleShared = async (item) => {
    const payload = {
      noteId: parseInt(viewId),
      friendId: item.id,
    };
    await axios
      .post(config.apiServer + "/inote/sharedtofriend", payload)
      .then((res) => {
        if (res.data.message === "success") {
          fetchData();
        }
      });
  };

  // ยกเลิกแชร์
  const handleUnShared = async (item) => {
    const payload = {
      noteId: parseInt(viewId),
      friendId: item.id,
    };
    await axios
      .post(config.apiServer + "/inote/unsharedtofriend", payload)
      .then((res) => {
        if (res.data.message === "success") {
          fetchData();
        }
      });
  };

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, []);
  return (
    <>
      <Template title={inote.title}>
        <div className="min-h-screen w-full bg-base-200">
          <div className={`h-8 flex items-center justify-center`}>
            <span
              className={`loading loading-xl loading-spinner text-info ${
                isLoading ? "block" : "hidden"
              }`}
            ></span>
          </div>
          {pageOnLoad ? (
            <section className="min-h-screen px-4 py-18 mb-10">
              <div className="flex items-center justify-between">
                <div className="join">
                  <div className="dropdown dropdown-start join-item">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-info join-item"
                    >
                      <Icon.GearFill />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 mt-2 shadow-sm"
                    >
                      <li
                        onClick={() =>
                          document
                            .getElementById("modalEditTitleNote")
                            .showModal()
                        }
                      >
                        <a>แก้ไขชื่อหัวข้อ</a>
                      </li>
                      <li onClick={(e) => handleComfirm("delete", inote.title)}>
                        <a>ลบโน๊ตนี้</a>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleComplete("all", "")}
                    className={`btn btn-info join-item ${
                      btnComplete ? null : "btn-disabled"
                    }`}
                  >
                    <Icon.CheckLg className="text-xl" />
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById("modalSelectShared").showModal();
                    }}
                    className="btn btn-info join-item"
                  >
                    <Icon.ShareFill />
                  </button>
                  <button
                    onClick={handleTogleHistory}
                    className="btn btn-info join-item"
                  >
                    {inote.isHistory ? (
                      <Icon.StarFill className="text-warning" />
                    ) : (
                      <Icon.Star />
                    )}
                  </button>
                </div>

                {/* // Friend Shared */}
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} className="avatar-group -space-x-6">
                    <div className="avatar">
                      <div className="w-10">
                        <Image
                          src={
                            config.apiServer + "/images/" + config.uData("uPic")
                          }
                          width={12}
                          height={12}
                          alt="host"
                          priority
                        />
                      </div>
                    </div>
                    {shareds.length > 0
                      ? shareds.map((item, index) => (
                          <div key={index} className="avatar">
                            <div className="w-10">
                              <Image
                                src={
                                  config.apiServer +
                                  "/images/" +
                                  item.profileImage
                                }
                                width={12}
                                height={12}
                                alt={item.name}
                                priority
                              />
                            </div>
                          </div>
                        ))
                      : null}
                  </div>

                  <div
                    tabIndex={0}
                    className="dropdown-content menu bg-white rounded-box z-1 w-52 shadow-sm"
                  >
                    <div className="flex flex-col items-center justify-around">
                      {shareds.length > 0 ? (
                        shareds.map((item, index) => (
                          <div
                            key={index}
                            className="w-full inline-flex items-center p-2"
                          >
                            <div className="flex-1">{item.name}</div>
                            <Icon.Trash3
                              onClick={() => handleUnShared(item)}
                              className="justify-end"
                            />
                          </div>
                        ))
                      ) : (
                        <>โน๊ตนี้ยังไม่ถูกแชร์</>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card max-h-[62vh] overflow-hidden mt-4">
                <div className="overflow-y-auto bg-white rounded-box shadow-md">
                  <table className="table">
                    <tbody>
                      {noteList.length > 0 ? (
                        noteList.map((item, index) => (
                          <tr
                            key={index}
                            className={item.isComplete ? "opacity-30" : ""}
                          >
                            <td className="w-10 px-3">
                              <label>
                                <input
                                  onChange={(e) =>
                                    handleComplete("single", item)
                                  }
                                  type="checkbox"
                                  className="checkbox"
                                  checked={item.isComplete ? "checked" : ""}
                                />
                              </label>
                            </td>
                            <td
                              onClick={(e) => handleComplete("single", item)}
                              className="p-0"
                            >
                              {item.text}
                            </td>
                            <td className="w-12 p-0 text-center">
                              <button
                                onClick={(e) => handleComfirm("remove", item)}
                                className="btn btn-circle btn-xs"
                              >
                                <Icon.Trash3 />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={2}>ไม่พบข้อมูล สร้างโน๊ตเลย</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => {
                    document.getElementById("modalAddNote").showModal();
                  }}
                  className="btn btn-block btn-info"
                >
                  <Icon.PlusCircle className="text-xl" /> เพิ่มรายการ
                </button>
              </div>
            </section>
          ) : (
            <PageLoading />
          )}
        </div>
      </Template>
      <MenuBottom />

      {/* ModalAddNote */}
      <dialog id="modalAddNote" className="modal modal-top sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">เพิ่มรายการ</h3>
          <p className="py-3">
            <textarea
              value={formData.text}
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              id="addNote"
              rows="4"
              className="textarea w-full rounded-xl focus:outline-0"
            ></textarea>
          </p>

          <div className="w-full mt-4">
            <form method="dialog">
              <button
                onClick={handleSaveForm}
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

      {/* //Modal Enter Title Note */}
      <dialog
        id="modalEditTitleNote"
        className="modal modal-top sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">ป้อนหัวข้อสำหรับ Note นี้</h3>
          <p className="py-4">
            <input
              value={inote.title}
              onChange={(e) => setInote({ ...inote, title: e.target.value })}
              type="text"
              className="input w-full focus:outline-0"
              placeholder="Enter Note Title"
            />
          </p>
          <div className="w-full mt-4">
            <form method="dialog">
              <button
                onClick={() => handleComfirm("editTitleNote", "")}
                className={`btn btn-block ${
                  inote.title !== "" ? null : "btn-disabled"
                } btn-success text-white`}
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

      {/* //Modal Select Shared */}
      <dialog id="modalSelectShared" className="modal sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">เลือกเพื่อนที่ต้องการแชร์</h3>
          <ul className="list p-0">
            {friends.length > 0
              ? friends.map((item, index) => (
                  <li key={index} className="list-row items-center px-0">
                    <div>
                      <Image
                        src={config.apiServer + "/images/" + item.profileImage}
                        width={20}
                        height={20}
                        alt={item.name}
                        priority
                        className="size-10 rounded-box"
                      />
                    </div>
                    <div>{item.name}</div>
                    <form method="dialog">
                      <button
                        onClick={() => handleShared(item)}
                        className="btn btn-square btn-ghost"
                      >
                        <Icon.ShareFill />
                      </button>
                    </form>
                  </li>
                ))
              : null}
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};
export default viewNotePage;
