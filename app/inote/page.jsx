"use client";
import Template from "@/components/Template";
// import Link from "next/link";
import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

const inotePage = () => {
  const [isClient, setIsClient] = useState(false);
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
  }, [todos]);

  const [todo, setTodo] = useState("");

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
    let newItem = {
      id: item.id,
      text: item.text,
      checked: !item.checked,
    };
    const editItem = todos.map((items) => {
      return items.id == item.id ? newItem : items;
    });
    setTodos(editItem);
  };

  return (
    <>
      <Template title={"i Note"}>
        <div className="min-h-screen w-full bg-base-200">
          <section className="min-h-screen px-4 py-18 mb-10">
            <div className="w-full">
              <div className="card bg-amber-100 my-2 shadow-md">
                <textarea
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  name="todo"
                  id=""
                  rows="4"
                  className="p-2"
                  placeholder="Enter Note heer.."
                ></textarea>
              </div>
              <div className="w-full flex items-center justify-between gap-3 my-4">
                <button className="btn rounded-2xl btn-info">บันทึกร่าง</button>
                <button
                  onClick={handleTodoSubmit}
                  className="btn rounded-2xl btn-success text-white flex-1"
                >
                  บันทึกข้อความ
                </button>
              </div>
            </div>

            <div className="divider divider-start">รายการโน๊ต</div>

            <div className="card h-[40vh] overflow-hidden shadow-md my-4 p-2">
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
                              <td>
                                <div className="flex items-center gap-3">
                                  <div>
                                    <div className="text-sm opacity-50">
                                      {item.text}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <th className="w-10">
                                <Icon.Trash3
                                  onClick={() => handleRemove(item.id)}
                                  className="text-[1.4em]"
                                />
                              </th>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td
                            colSpan={3}
                            className="text-center text-neutral-600"
                          >
                            สร้างบันทึกอย่างรวดเร็ว
                          </td>
                        </tr>
                      )
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
            <button className="btn btn-lg btn-block btn-success text-white">
              สร้าง Note
            </button>
          </section>
        </div>
      </Template>
    </>
  );
};
export default inotePage;
