"use client";
import config from "@/app/config";
import Template from "@/components/Template";
import axios from "axios";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import Swal from "sweetalert2";
import PageLoading from "@/components/PageLoading";

const createNotePage = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [cntCheck, setCntCheck] = useState(0);
  const [titleNote, setTitleNote] = useState("");
  const [btnCreateNote, setBtnCreateNote] = useState(false);
  const [titleList, setTitleList] = useState([]);
  const [loadSuccess, setLoadSuccess] = useState(false);
  const [sharedToId, setSharedToId] = useState(0);

  // TODO
  const [todo, setTodo] = useState(() => {
    let response = "";
    if (typeof window !== "undefined") {
      const todoText = localStorage.getItem("todo");
      if (todoText != null || todoText != undefined) {
        response = todoText;
      }
    }
    return response;
  });

  useEffect(() => {
    localStorage.setItem("todo", todo);
  }, [todo]);

  // TODOS
  const [todos, setTodos] = useState(() => {
    let result = [];
    if (typeof window !== "undefined") {
      const storageTodos = null ?? localStorage.getItem("todos");
      if (storageTodos != null || storageTodos != undefined) {
        result = JSON.parse(storageTodos);
      }
    }
    return result;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    let countChecked = 0;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].checked == true) {
        countChecked++;
      }
    }
    setCntCheck(countChecked);
  }, [todos]);

  // Global
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTodoSubmit = () => {
    if (todo.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
          checked: false,
        },
      ]);
    } else {
      alert("กรุณาป้อนข้อความ");
      document.getElementById("noteText").focus();
    }
    setTodo("");
    document.getElementById("noteText").focus();
  };

  // Note ** Select
  const handleEdit = (item) => {
    let countChecked = 0;
    if (item.checked == false) {
      countChecked++;
    }
    let newItem = {
      id: item.id,
      text: item.text,
      checked: !item.checked,
    };
    const editItem = todos.map((items) => {
      return items.id == item.id ? newItem : items;
    });
    setCntCheck(countChecked);
    setTodos(editItem);
  };

  // Save Note
  const handleSaveNote = async () => {
    let arr_data = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].checked == true) arr_data.push(todos[i]);
    }
    const payload = {
      title: titleNote,
      data: arr_data,
    };
    await axios
      .post(config.apiServer + "/inote/create", payload, config.headerAuth())
      .then((res) => {
        if (res.data.message === "success") {
          let updateTodos = [];
          for (let i = 0; i < todos.length; i++) {
            if (todos[i].checked == false) {
              updateTodos.push(todos[i]);
            }
          }
          setTodos(updateTodos);
          setTitleNote("");
        }
      });
  };

  // removeOnSelect
  const removeOnSelect = () => {
    const removeItem = todos.filter((todo) => {
      return todo.checked == false;
    });
    let results = [];
    for (let i = 0; i < removeItem.length; i++) {
      const data = removeItem[i];
      const newData = {
        id: i + 1,
        text: data.text,
        checked: data.checked,
      };
      results.push(newData);
    }
    setTodos(results);
  };

  // Alert2 Confirm
  const handleComfirm = (type, item) => {
    if (type == "createNote") {
      handleSaveNote();
    } else if (type == "removeOnSelect") {
      Swal.fire({
        text: `ลบรายการที่เลือก ?`,
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "NO",
        showConfirmButton: true,
        confirmButtonText: "YES",
      }).then((res) => {
        if (res.isConfirmed) {
          removeOnSelect();
        }
      });
    }
  };

  const changeHandler = (event) => {
    let { value } = event.target;
    if (event.key == "Enter") {
      document.getElementById("linkBt").click();
      handleTodoSubmit();
    }
  };

  // Get Title
  const handleGetTitle = async () => {
    await axios
      .get(config.apiServer + "/inote/list", config.headerAuth())
      .then((res) => {
        if (res.data.message === "success") {
          setTitleList(res.data.data);
          setLoadSuccess(true);
        }
      });
  };

  // Share to Note
  const handleSharedToNote = async () => {
    const sharedItem = todos.filter((todo) => {
      return todo.checked == true;
    });
    const payload = {
      toId: sharedToId,
      list: sharedItem,
    };
    await axios
      .post(config.apiServer + "/inote/sharedto-title", payload)
      .then((res) => {
        if (res.data.message === "success") {
          // สร้าง localStorage ใหม่
          const newItem = todos.filter((todo) => {
            return todo.checked == false;
          });
          let results = [];
          for (let i = 0; i < newItem.length; i++) {
            const data = newItem[i];
            const newData = {
              id: i + 1,
              text: data.text,
              checked: data.checked,
            };
            results.push(newData);
          }
          setTodos(results);
        }
      });
  };

  return (
    <>
      <Template title={"เขียนบันทึก"}>
        <div className="min-h-screen w-full bg-white">
          <section className="min-h-screen px-4 pt-28 pb-18">
            <div className="flex items-center justify-between">
              <div className="join">
                <button
                  onClick={() => router.push("/inote")}
                  className={`btn btn-info join-item`}
                >
                  <Icon.ListUl className="text-xl" />
                </button>
                <button
                  onClick={() => handleComfirm("removeOnSelect", "")}
                  className={`btn btn-info join-item ${
                    cntCheck > 0 ? "" : "btn-disabled"
                  }`}
                >
                  <Icon.Trash3Fill />
                </button>
                <button
                  onClick={() => {
                    setSharedToId(0);
                    handleGetTitle();
                    document.getElementById("modalSharedNote").showModal();
                  }}
                  className={`btn btn-info join-item ${
                    cntCheck > 0 ? "" : "btn-disabled"
                  }`}
                >
                  <Icon.Share />
                </button>
              </div>
              <button
                className={`btn btn-info ${cntCheck > 0 ? "" : "btn-disabled"}`}
                onClick={() =>
                  document.getElementById("modalCreateNote").showModal()
                }
              >
                สร้าง <Icon.PlusLg className="text-xl" />
              </button>
            </div>
            <div className={`h-[72vh] flex flex-col justify-end mt-4`}>
              <div className={`card overflow-hidden rounded-none`}>
                <div className="overflow-y-auto">
                  <table className="table bg-white rounded-none">
                    <tbody>
                      {isClient ? (
                        todos.length > 0 ? (
                          todos.map((item, index) => (
                            <tr key={index}>
                              <td className="w-10 px-3">
                                <label>
                                  <input
                                    onChange={(e) => handleEdit(item)}
                                    type="checkbox"
                                    className="checkbox"
                                    checked={item.checked ? "checked" : ""}
                                  />
                                </label>
                              </td>
                              <td
                                onClick={(e) => handleEdit(item)}
                                className="p-0"
                              >
                                {item.text}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={2}
                              className="text-center text-neutral-600 h-[72vh]"
                            >
                              <h2 className="text-sm">
                                "สร้างบันทึก..ได้อย่างรวดเร็ว"
                              </h2>
                            </td>
                          </tr>
                        )
                      ) : null}
                    </tbody>
                  </table>
                  <div id="bt" className="p-0"></div>
                </div>
              </div>
            </div>
          </section>
          <footer className="fixed bottom-0 w-full bg-white flex items-center justify-between gap-2 px-4 pt-2 pb-8">
            <label className="input border-0 focus-within:outline-0 bg-base-200 flex-1 h-[5vh] overflow-hidden rounded-full">
              <input
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                type="text"
                name="todo"
                id="noteText"
                className="input border-0 focus:outline-0 rounded-none scrollHide"
                placeholder="พิมพ์ข้อความ"
                onKeyDown={changeHandler}
              />
              <Link href={"#bt"} id="linkBt">
                <Icon.SendFill
                  onClick={handleTodoSubmit}
                  className="rotate-45 text-2xl text-blue-600"
                />
              </Link>
            </label>
          </footer>
        </div>
      </Template>

      {/* //Modal Enter Title Note */}
      <dialog id="modalCreateNote" className="modal modal-top sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">ป้อนหัวข้อสำหรับ Note นี้</h3>
          <p className="py-4">
            <input
              value={titleNote}
              onChange={(e) => {
                setTitleNote(e.target.value);
                if (e.target.value.length > 3) {
                  setBtnCreateNote(true);
                } else {
                  setBtnCreateNote(false);
                }
              }}
              type="text"
              className="input w-full focus:outline-0"
              placeholder="Enter Note Title"
            />
          </p>
          <div className="w-full mt-4">
            <form method="dialog">
              <button
                onClick={() => handleComfirm("createNote", "")}
                className={`btn btn-block ${
                  btnCreateNote ? null : "btn-disabled"
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

      {/* //Modal Share to Note */}
      <dialog id="modalSharedNote" className="modal modal-top sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">เลือกหัวข้อโน๊ตที่จะ แชร์รายการ</h3>
          <div className="py-4">
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white mt-2 shadow-md">
              <table className="table">
                <tbody>
                  {loadSuccess ? (
                    titleList.length > 0 ? (
                      titleList
                        .slice(0)
                        .reverse()
                        .map((item, index) => (
                          <tr key={index}>
                            <td>{item.title}</td>
                            <td className="text-neutral-400 text-xs w-10">
                              <input
                                onClick={() => setSharedToId(item.id)}
                                type="radio"
                                name="selNote"
                                aria-label="เลือก"
                                className="btn btn-sm"
                              />
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="text-center p-4">
                          <div className="inline-block">
                            <Icon.InfoCircle className="text-2xl text-neutral-600" />
                          </div>
                          <p className="text-neutral-500">
                            ผิดพลาด คุณยังไม่เคยสร้างโน๊ต
                          </p>
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td colSpan={2} className="text-center p-4">
                        <span className="loading loading-spinner text-info"></span>
                        <p className="text-neutral-500 mt-2">Loading</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full mt-4">
            <form method="dialog">
              <button
                onClick={() => handleSharedToNote()}
                className={`btn btn-block ${
                  sharedToId !== 0 ? null : "btn-disabled"
                } btn-info text-white`}
              >
                แชร์
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
export default createNotePage;
