"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import config from "@/app/config";
import Template from "@/components/Template";
import MenuBottom from "@/components/MenuBottom";
import PageLoading from "@/components/PageLoading";
import { useRouter } from "next/navigation";
import * as Icon from "react-bootstrap-icons";
import Image from "next/image";

const sharedToMePage = () => {
  const router = useRouter();
  const [pageOnLoad, setPageOnLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sharedList, setSharedList] = useState([]);
  const fetchData = async () => {
    await axios
      .get(config.apiServer + "/inote/sharedtome", config.headerAuth())
      .then((res) => {
        if (res.data.message === "success") {
          setPageOnLoad(true);
          setSharedList(res.data.results);
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
      <Template title={"แชร์กับฉัน"}>
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
                  <thead>
                    <tr>
                      <th>รายการ</th>
                      <th>เจ้าของ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sharedList.length > 0 ? (
                      sharedList
                        .slice(0)
                        .reverse()
                        .map((item, index) => (
                          <tr
                            key={index}
                            onClick={() =>
                              router.push("/inote-shared/" + item.id)
                            }
                          >
                            <td>{item.title}</td>
                            <td className="text-neutral-400 w-8 text-center">
                              <div className="avatar">
                                <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                                  <Image
                                    src={
                                      config.apiServer +
                                      "/images/" +
                                      item.user.profileImage
                                    }
                                    width={10}
                                    height={10}
                                    alt={item.user.name}
                                    priority
                                  />
                                </div>
                              </div>
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
      <MenuBottom />
    </>
  );
};
export default sharedToMePage;
