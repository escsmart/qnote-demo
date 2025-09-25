"use client";
import config from "@/app/config";
import MenuBottom from "@/components/MenuBottom";
import PageLoading from "@/components/PageLoading";
import RenewToken from "@/components/RenewToken";
import Template from "@/components/Template";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";

const inotePage = () => {
  const router = useRouter();
  const [pageOnLoad, setPageOnLoad] = useState(false);
  const [loadSuccess, setLoadSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState([]);

  const fetchData = async () => {
    await axios
      .get(config.apiServer + "/inote/list", config.headerAuth())
      .then((res) => {
        if (res.data.message === "success") {
          setNotes(res.data.data);
          setLoadSuccess(true);
          setPageOnLoad(true);
        } else if (res.data.message === "Tokens Invalid") {
          const renewToken = RenewToken();
          if (renewToken.message == "success") {
            window.location.reload();
          }
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
      <Template title={"รายการโน๊ต"}>
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
              <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white mt-2">
                <table className="table">
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
              <div className="mt-4">
                <button
                  onClick={() => router.push("/inote-create")}
                  className="btn btn-block btn-info"
                >
                  <Icon.PencilFill className="text-xl" /> เขียนโน๊ตอย่างรวดเร็ว{" "}
                </button>
              </div>
            </section>
          ) : (
            <PageLoading />
          )}
        </div>
      </Template>
      <MenuBottom secure={true} />
    </>
  );
};
export default inotePage;
