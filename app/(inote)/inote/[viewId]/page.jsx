"use client";
import config from "@/app/config";
import Template from "@/components/Template";
import axios from "axios";
import moment from "moment";
import * as Icon from "react-bootstrap-icons";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const viewNotePage = () => {
  const router = useRouter();
  const { viewId } = useParams();
  const [loadSuccess, setLoadSuccess] = useState(false);
  const [noteTitle, setNoteTitle] = useState("รายการ");
  const [noteList, setNoteList] = useState([]);
  const [countList, setCountList] = useState(0);

  const fetchData = async () => {
    await axios.get(config.apiServer + "/inote/view/" + viewId).then((res) => {
      if (res.data.message === "success") {
        setCountList(res.data.count);
        setLoadSuccess(true);
        setNoteList(res.data.data);
        setNoteTitle(res.data.title);
      }
    });
  };

  const handleSelect = () => {};

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

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Template title={noteTitle}>
        <div className="min-h-screen w-full bg-base-200">
          <section className="min-h-screen px-4 py-18 mb-10">
            <div className="overflow-x-auto bg-white rounded-box shadow-md">
              <table className="table">
                <tbody>
                  {loadSuccess ? (
                    noteList.length > 0 ? (
                      noteList.map((item, index) => (
                        <tr key={index}>
                          <th className="w-10">
                            <label>
                              <input type="checkbox" className="checkbox" />
                            </label>
                          </th>
                          <td
                            onClick={(e) => handleSelect(item)}
                            className="p-0"
                          >
                            {item.text}
                          </td>
                          <td className="w-16 p-0">
                            <div className="flex gap-1.5">
                              <button className="btn btn-square btn-xs">
                                <Icon.Pencil />
                              </button>
                              <button
                                onClick={(e) => handleComfirm("remove", item)}
                                className="btn btn-circle btn-xs"
                              >
                                <Icon.Trash3 />
                              </button>
                            </div>
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
                      <td colSpan={2} className="text-center p-4">
                        <span className="loading loading-spinner text-info"></span>
                        <p className="text-neutral-500 mt-2">Loading</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-3">
              <button
                onClick={() => handleComfirm("complete", "")}
                className="btn btn-block btn-info"
              >
                ทำเครื่องหมายเสร็จแล้ว
              </button>
            </div>
          </section>
        </div>
      </Template>
    </>
  );
};
export default viewNotePage;
