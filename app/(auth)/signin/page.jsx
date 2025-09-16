"use client";
import config from "@/app/config";
import MenuBottom from "@/components/MenuBottom";
import Template from "@/components/Template";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

const signInPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const handleSignIn = async () => {
    setIsLoading(true);
    const usrData = await axios
      .post(config.apiServer + "/signin", formData)
      .then((res) => {
        if (res.data.token !== undefined) {
          localStorage.setItem("tokenSignin", res.data.token);
          // user
          localStorage.setItem("uId", res.data.result.uId);
          localStorage.setItem("uName", res.data.result.uName);
          localStorage.setItem("uLevel", res.data.result.uLevel);
          localStorage.setItem("uPic", res.data.result.uImg);
          // theme
          setTimeout(() => {
            router.push("/");
          }, 3000);
        }
      });
  };

  return (
    <>
      <Template title={"Back to Pages"}>
        <div className="min-h-screen w-full bg-base-200">
          <section className="min-h-screen flex flex-col gap-6 w-full px-4 pt-18 pb-28">
            <div className="flex flex-col items-center justify-center bg-white rounded-3xl mt-2 p-5">
              <h1 className="text-4xl font-semibold">Sign In</h1>
              <p className="text-sm text-slate-500">Enter your Credentials</p>
              {isLoading ? (
                <div className="text-center my-6">
                  <span
                    className={`loading loading-xl loading-spinner text-info`}
                  ></span>
                </div>
              ) : (
                <div className="my-4">
                  <label className="input floating-label w-full border-[1px] rounded-xl h-12 my-4 bg-white">
                    <Icon.Phone className="text-xl opacity-65" />
                    <span>PHONE</span>
                    <input
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      type="text"
                      className="grow border-0 focus:outline-0"
                      placeholder="Phone Number"
                    />
                    <div className="text-slate-400 text-xs">(required)</div>
                  </label>
                  <label className="input floating-label w-full border-[1px] rounded-xl h-12 bg-white">
                    <Icon.Key className="text-xl rotate-45" />
                    <span>PASSWORD</span>
                    <input
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      type="password"
                      className="grow border-0 focus:outline-0"
                      placeholder="Password"
                    />
                    <div className="text-slate-400 text-xs">(required)</div>
                  </label>
                </div>
              )}

              <button
                onClick={() => {
                  handleSignIn();
                }}
                className={`btn btn-block btn-info rounded-xl mt-2 ${
                  isLoading ? "btn-disabled" : ""
                }`}
              >
                SIGN IN
              </button>
              <div className="flex items-center justify-between w-full my-4 text-sm text-slate-500">
                <Link href={"/forget"}>ลืมรหัสผ่าน</Link>
                <Link href={"/signup"}>สร้างบัญชี</Link>
              </div>
            </div>

            <div className="card bg-white inset-ring-accent rounded-3xl flex flex-col items-center justify-around gap-6 p-8 py-12">
              <div className="text-center">
                <div className="text-info">Quick Note</div>
                <h1 className="text-2xl font-bold mt-2">
                  แอพฯ ที่ใช้พื้นที่..น้อยที่สุด
                </h1>
                <p className="text-gray-400 text-sm">
                  Start your next project with Esy and enjoy the power of a
                  Progressive Web App.
                </p>
              </div>
              <button className="btn rounded-xl btn-info px-8">
                ติดตั้งเลย
              </button>
              <div className="flex gap-2 text-md">
                <Icon.GooglePlay />
                <Icon.Apple />
                <Icon.BrowserChrome />
                <Icon.Windows />
              </div>
            </div>
          </section>
        </div>
      </Template>
      <MenuBottom />
    </>
  );
};
export default signInPage;
