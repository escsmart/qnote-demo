"use client";
import config from "@/app/config";
import Template from "@/components/Template";
import axios from "axios";
import moment from "moment";
import * as Icon from "react-bootstrap-icons";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

const viewNotePage = () => {
  const router = useRouter();
  const { viewId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [loadSuccess, setLoadSuccess] = useState(false);
  const [noteTitle, setNoteTitle] = useState("รายการ");
  const [noteList, setNoteList] = useState([]);
  const [countList, setCountList] = useState(0);

  // FetchData
  const fetchData = async () => {
    await axios.get(config.apiServer + "/inote/view/" + viewId).then((res) => {
      if (res.data.message === "success") {
        setCountList(res.data.count);
        setLoadSuccess(true);
        setNoteTitle(res.data.title);
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
    } else if (type == "complete") {
      // alert("complete");
    }
  };

  // Add List
  const [formData, setFormData] = useState({
    text: "",
    inoteId: viewId,
  });

  const handleSaveForm = async () => {
    await axios
      .post(config.apiServer + "/inote/add-list", formData)
      .then((res) => {
        if (res.data.message === "success") {
          setFormData({ ...formData, text: "" });
          fetchData();
        }
      });
  };

  // setcomplete
  const handleComplete = async (item) => {
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
      <Template title={noteTitle}>
        <div className="min-h-screen w-full bg-base-200">
          <div className={`h-8 flex items-center justify-center`}>
            <span
              className={`loading loading-xl loading-spinner text-info ${
                isLoading ? "block" : "hidden"
              }`}
            ></span>
          </div>
          <section className="min-h-screen px-4 pt-10 pb-18 mb-10">
            <div className="card max-h-[70vh] overflow-hidden">
              <div className="overflow-y-auto bg-white rounded-box shadow-md">
                <table className="table">
                  <tbody>
                    {loadSuccess ? (
                      noteList.length > 0 ? (
                        noteList.map((item, index) => (
                          <tr
                            key={index}
                            className={item.isComplete ? "opacity-30" : ""}
                          >
                            <td className="w-10 px-3">
                              <label>
                                <input
                                  onChange={(e) => handleComplete(item)}
                                  type="checkbox"
                                  className="checkbox"
                                  checked={item.isComplete ? "checked" : ""}
                                />
                              </label>
                            </td>
                            <td
                              onClick={(e) => handleComplete(item)}
                              className="p-0"
                            >
                              {item.text}
                            </td>
                            <td className="w-12 p-0 text-center">
                              {/* <div className="flex gap-1.5"> */}
                              <button
                                onClick={(e) => handleComfirm("remove", item)}
                                className="btn btn-circle btn-xs"
                              >
                                <Icon.Trash3 />
                              </button>
                              {/* </div> */}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={2}>ไม่พบข้อมูล สร้างโน๊ตเลย</td>
                        </tr>
                      )
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-center p-4">
                          <span className="loading loading-spinner text-info"></span>
                          <p className="text-neutral-500 mt-2">Loading</p>
                        </td>
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
        </div>
      </Template>

      {/* ModalAddNote */}

      <dialog id="modalAddNote" className="modal">
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
      </dialog>
    </>
  );
};
export default viewNotePage;
