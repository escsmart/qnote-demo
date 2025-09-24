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
  const [noteList, setNoteList] = useState([]);
  const [countList, setCountList] = useState(0);
  const [inote, setInote] = useState({
    title: "",
    isHistory: false,
    sharedUsers: "",
  });

  const [shareds, setShared] = useState([]);

  const fetchData = async () => {
    await axios
      .get(
        config.apiServer + "/inote/viewshared-list/" + viewId,
        config.headerAuth()
      )
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
          const items = dataList.concat(dataComplete);
          setNoteList(items);
          setShared(res.data.sharedList);
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

  // Confirm Alert
  const handleComfirm = (item) => {
    if (item.userId !== parseInt(config.uData("uId"))) {
      Swal.fire({
        text: "ไม่สามารถลบรายการ ที่ท่านไม่ได้สร้าง!",
        icon: "warning",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        text: `${
          countList == 1
            ? "หัวข้อโน๊ตจะถูกลบ เมื่อไม่มีรายการแล้ว ยืนยัน?"
            : `ยืนยันลบรายการ ${item.text} ?`
        }`,
        icon: "question",
        showConfirmButton: true,
        confirmButtonText: "YES",
        showCancelButton: true,
        cancelButtonText: "NO",
      }).then((res) => {
        if (res.isConfirmed) {
          handleRemove(item.id);
        }
      });
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
            <section className="min-h-screen px-4 pt-10 pb-18 mb-10">
              <div className="flex items-center justify-between">
                <div className="avatar indicator">
                  <span className="indicator-item indicator-bottom badge badge-info text-xs text-white px-1">
                    เจ้าของ
                  </span>
                  <div className="mask mask-squircle w-10">
                    <Image
                      src={
                        config.apiServer + "/images/" + inote.user.profileImage
                      }
                      width={20}
                      height={20}
                      alt={inote.user.name}
                      priority
                    />
                  </div>
                </div>

                {/* // Friend Shared */}
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} className="avatar-group -space-x-6">
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
                                width={10}
                                height={10}
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
                      {shareds.length > 0
                        ? shareds.map((item, index) => (
                            <div
                              key={index}
                              className="w-full inline-flex items-center p-2"
                            >
                              <div className="flex-1">{item.name}</div>
                            </div>
                          ))
                        : null}
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
                            <td className="w-16 p-0">
                              <div className="flex items-center justify-center gap-3">
                                <div className="avatar">
                                  <div className="w-5 mask mask-squircle">
                                    <Image
                                      src={
                                        config.apiServer +
                                        "/images/" +
                                        item.user.profileImage
                                      }
                                      width={10}
                                      height={10}
                                      alt="writer"
                                      priority
                                    />
                                  </div>
                                </div>
                                <Icon.Trash3
                                  className="text-[1.1em] text-error"
                                  onClick={(e) => handleComfirm(item)}
                                />
                              </div>
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
    </>
  );
};
export default viewNotePage;
