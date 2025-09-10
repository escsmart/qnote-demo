"use client";
import config from "@/app/config";
import Template from "@/components/Template";
import axios from "axios";
import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import Swal from "sweetalert2";

const inotePage = () => {
  const [isClient, setIsClient] = useState(false);
  const [cntCheck, setCntCheck] = useState(0);
  const [titleNote, setTitleNote] = useState("");
  const [todo, setTodo] = useState("");
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
    setIsClient(true);
    localStorage.setItem("todos", JSON.stringify(todos));
    let countChecked = 0;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].checked == true) {
        countChecked++;
      }
    }
    setCntCheck(countChecked);
  }, [todos]);

  const handleTodoSubmit = () => {
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
          checked: false,
        },
      ]);
    }
    setTodo("");
  };

  const handleRemove = (id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
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
      .post(config.apiServer + "/inote/create", payload)
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

  const handleComfirm = (type, item) => {
    if (type == "remove") {
      Swal.fire({
        text: `ลบรายการ ${item.text} ?`,
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
    }
  };

  return (
    <>
      <Template title={"Create Note"}>
        <div className="min-h-screen w-full bg-base-200">
          <section className="min-h-screen px-4 py-18 mb-10">
            <div className="w-full">
              <div
                className="card my-2 h-32 shadow-md relative"
                style={{
                  backgroundImage: "url('./bg/note-text-bg.jpg')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                }}
              >
                <textarea
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  name="todo"
                  id="noteText"
                  rows="4"
                  className="py-4 px-8 focus:outline-0"
                  placeholder="Enter Note heer.."
                ></textarea>
                <button
                  onClick={() => {
                    setTodo("");
                    document.getElementById("noteText").focus();
                  }}
                  className={`btn btn-sm btn-circle btn-error absolute -top-2 -right-2 text-white ${
                    todo == "" ? "hidden" : ""
                  }`}
                >
                  <Icon.XLg />
                </button>
              </div>
              <div className="w-full flex my-4">
                <button
                  onClick={handleTodoSubmit}
                  className="btn rounded-2xl btn-success flex-1 text-white"
                >
                  บันทึกข้อความ
                </button>
              </div>
            </div>

            <div className="card bg-white h-[40vh] overflow-hidden shadow-md my-4 px-2">
              <div className="divider">
                รายการโน๊ต
                <Icon.PenFill className="text-5xl" />
              </div>
              <div className="overflow-y-auto">
                <table className="table table-xs table-zebra">
                  <tbody>
                    {isClient ? (
                      todos.length > 0 ? (
                        todos
                          .slice(0)
                          .reverse()
                          .map((item, index) => (
                            <tr key={index}>
                              <th className="w-10">
                                <label>
                                  <input
                                    onChange={(e) => handleEdit(item)}
                                    type="checkbox"
                                    className="checkbox"
                                    checked={item.checked ? "checked" : ""}
                                  />
                                </label>
                              </th>
                              <td onClick={(e) => handleEdit(item)}>
                                <div className="flex items-center gap-3">
                                  <div className="text-sm text-neutral-600">
                                    {item.text}
                                  </div>
                                </div>
                              </td>
                              <th className="w-10">
                                <Icon.Trash3
                                  onClick={() => handleComfirm("remove", item)}
                                  className="text-[1.4em]"
                                />
                              </th>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td
                            colSpan={3}
                            className="text-center text-neutral-600 h-[30vh]"
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
              </div>
            </div>
            <button
              className={`btn btn-lg btn-block btn-success text-white ${
                cntCheck > 0 ? "" : "btn-disabled"
              }`}
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              สร้าง Note
            </button>
          </section>
        </div>
      </Template>

      {/* //Modal Enter Title Note */}
      <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">ป้อนหัวข้อสำหรับ Note นี้</h3>
          <p className="py-4">
            <input
              value={titleNote}
              onChange={(e) => setTitleNote(e.target.value)}
              type="text"
              className="input w-full"
              placeholder="Enter Note Title"
            />
          </p>
          <div className="w-full mt-4">
            <form method="dialog">
              <button
                onClick={handleSaveNote}
                className="btn btn-block btn-success text-white"
              >
                ยืนยัน
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
export default inotePage;
