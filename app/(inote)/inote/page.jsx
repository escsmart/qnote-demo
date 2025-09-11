"use client";
import config from "@/app/config";
import Template from "@/components/Template";
import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import Swal from "sweetalert2";

const inotePage = () => {
  const [loadSuccess, setLoadSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState([]);

  const fetchData = async () => {
    await axios.get(config.apiServer + "/inote/list").then((res) => {
      if (res.data.message === "success") {
        setNotes(res.data.data);
        setLoadSuccess(true);
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
      <Template title={"i Note"}>
        <div className="min-h-screen w-full bg-base-200">
          <div className={`h-8 flex items-center justify-center`}>
            <span
              className={`loading loading-xl loading-spinner text-info ${
                isLoading ? "block" : "hidden"
              }`}
            ></span>
          </div>
          <section className="min-h-screen px-4 pt-10 pb-18 mb-10">
            <div className="w-full">
              <Link
                href={"/inote-create"}
                className="card h-32 my-2 shadow-md"
                style={{
                  backgroundImage: "url('./bg/note-text-bg.jpg')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                }}
              >
                <p className="py-4 px-8">เขียนโน๊ตอย่างรวดเร็ว</p>
              </Link>
            </div>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white mt-4">
              <table className="table">
                <thead>
                  <tr>
                    <th>รายการโน๊ต</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {loadSuccess ? (
                    notes.length > 0 ? (
                      notes.map((item, index) => (
                        <tr key={index}>
                          <td>{item.title}</td>
                          <td className="text-center">
                            <button className="btn btn-xs btn-circle">
                              <Icon.EyeFill />
                            </button>
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
          </section>
        </div>
      </Template>
    </>
  );
};
export default inotePage;
