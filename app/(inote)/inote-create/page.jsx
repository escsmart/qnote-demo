"use client";
import config from "@/app/config";
import Template from "@/components/Template";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import Swal from "sweetalert2";

const createNotePage = () => {
  const boxRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [btnDel, setBtnDel] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [cntCheck, setCntCheck] = useState(0);
  const [titleNote, setTitleNote] = useState("");

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
    // setfocus
    const elm = document.getElementById("noteText");
    const tLength = todo.length;
    if (tLength > 0) {
      elm.focus();
      elm.setSelectionRange(tLength, tLength);
    } else {
      elm.focus();
    }
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
    //set btndel
    setBtnDel(todos.length > 0 ? true : false);
  }, [todos]);

  // Global
  useEffect(() => {
    setIsClient(true);
    setHeight(boxRef.current.getBoundingClientRect().height);
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

  const changeHandler = (event) => {
    let { value } = event.target;
    if (event.key == "Enter") {
      handleTodoSubmit();
      setTodo("");
    }
  };

  return (
    <>
      <Template title={"Create Note"}>
        <div className="h-[100vh] w-full bg-base-200" ref={boxRef}>
          <section className="min-h-screen px-4 py-18">
            <div className="flex items-center justify-between">
              <div className="join">
                <button
                  className={`btn btn-info join-item ${
                    btnDel ? "" : "btn-disabled"
                  }`}
                >
                  ลบทั้งหมด <Icon.Trash3Fill />
                </button>
                <button
                  className={`btn btn-info join-item ${
                    cntCheck > 0 ? "" : "btn-disabled"
                  }`}
                >
                  แชร์ <Icon.Share />
                </button>
              </div>
              <button
                className={`btn btn-info ${cntCheck > 0 ? "" : "btn-disabled"}`}
                onClick={() =>
                  document.getElementById("modalCreateNote").showModal()
                }
              >
                สร้างโน๊ต <Icon.ArchiveFill />
              </button>
            </div>
            <div className={`h-[73vh]`}>
              <div className={`card h-full overflow-hidden my-4`}>
                <div className="overflow-y-auto">
                  <table className="table bg-white rounded-box shadow-md">
                    <thead className="bg-black">
                      <tr>
                        <th colSpan={3} className="text-white">
                          รายการโน๊ต {height}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {isClient ? (
                        todos.length > 0 ? (
                          todos
                            .slice(0)
                            .reverse()
                            .map((item, index) => (
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
                                <td className="w-12 p-0 text-center">
                                  <button
                                    onClick={(e) =>
                                      handleComfirm("remove", item)
                                    }
                                    className="btn btn-circle btn-xs"
                                  >
                                    <Icon.Trash3 />
                                  </button>
                                </td>
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
            </div>
          </section>
          <footer className="fixed bottom-0 w-full bg-white flex items-center justify-between gap-2 px-4 pt-2 pb-8">
            <div className="bg-base-200 flex-1 h-[5vh] overflow-hidden rounded-full">
              <input
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                type="text"
                name="todo"
                id="noteText"
                className="input flex-1 border-0 focus:outline-0 w-full rounded-none scrollHide"
                placeholder="พิมพ์ข้อความ"
                onKeyDown={changeHandler}
              />
            </div>
            <div>
              <Icon.SendFill
                onClick={handleTodoSubmit}
                className="rotate-45 text-2xl text-blue-600"
              />
            </div>
          </footer>
        </div>
      </Template>

      {/* <div className="bg-info fixed">
        <div className="w-96 bg-amber-400">
          <div className="bg-error">
            <input
              type="text"
              name=""
              id=""
              className="input"
              placeholder="พิมพ์ข้อความ"
            />
          </div>
          <div>send</div>
        </div>
      </div> */}

      {/* //Modal Enter Title Note */}
      <dialog
        id="modalCreateNote"
        className="modal modal-bottom sm:modal-middle"
      >
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
export default createNotePage;
