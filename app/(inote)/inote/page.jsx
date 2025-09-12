"use client";
import config from "@/app/config";
import MenuBottom from "@/components/MenuBottom";
import Template from "@/components/Template";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import Swal from "sweetalert2";

const inotePage = () => {
  const router = useRouter();
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
                <thead className="bg-black">
                  <tr>
                    <th colSpan={2} className="text-white">
                      รายการโน๊ต
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loadSuccess ? (
                    notes.length > 0 ? (
                      notes
                        .slice(0)
                        .reverse()
                        .map((item, index) => (
                          <tr
                            key={index}
                            onClick={() => router.push("/inote/" + item.id)}
                          >
                            <td>{item.title}</td>
                            <td className="text-neutral-400 text-xs w-10">
                              {moment(item.createdAt).format("DD/MM/YYYY")}
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
                            ไม่พบข้อมูล สร้างโน๊ตเลย
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
          </section>
        </div>
      </Template>
      <MenuBottom />
    </>
  );
};
export default inotePage;
