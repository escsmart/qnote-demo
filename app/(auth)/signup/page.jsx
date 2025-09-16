"use client";
import config from "@/app/config";
import MenuBottom from "@/components/MenuBottom";
import Template from "@/components/Template";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

const signUpPage = () => {
  const router = useRouter();
  const [stepUp, setStepUp] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: 3,
    name: "khun",
    phone: "0989499969",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [otpKeypress, setOtpKeypress] = useState("");
  const [otpAlert, setOtpAlert] = useState({
    status: true,
    text: "",
  });

  const step1Send = async () => {
    if (formData.phone.length == 10) {
      await axios
        .post(config.apiServer + "/auth/send-otp", formData)
        .then((res) => {
          if (res.data.message == "success") {
            setIsLoading(false);
            setOtpAlert((prevState) => ({
              ...prevState,
              text: `Ref.${res.data.ref}`,
            }));
            setFormData((prevState) => ({
              ...prevState,
              id: res.data.uId,
            }));
            setOtp(res.data.otp);
            setStepUp(2);
          }
        });
    }
  };

  const otpVerify = (otpkey) => {
    console.log(otp, otpkey);
    if (otp == otpkey) {
      setTimeout(() => {
        setIsLoading(false);
        setStepUp(3);
      }, 1500);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setOtpKeypress("");
        setOtpAlert((prevState) => ({
          ...prevState,
          status: false,
          text: `ยืนยันรหัสผิด กรุณาตรวจสอบ`,
        }));
      }, 1500);
    }
  };

  const handleOtp = (e) => {
    let otpkey = otpKeypress;
    const { name, id, value } = e.target;
    otpkey += value;
    const idNext = `ip${parseInt(name) + 1}`;
    if (id == "ip6") {
      setOtpKeypress(otpkey);
      setIsLoading(true);
      otpVerify(otpkey);
    } else {
      setOtpKeypress(otpkey);
      document.getElementById(idNext).focus();
    }
  };

  const [pwdMatch, setPwdMatch] = useState(false);

  const matchPwd = (e) => {
    const { value } = e.target;
    if (formData.password == value) {
      setPwdMatch(true);
    }
  };

  const handleSaveSignUp = async () => {
    await axios
      .put(config.apiServer + "/auth/register", formData)
      .then((res) => {
        if (res.data.message === "success") {
          router.push("/signin");
        }
      });
  };

  return (
    <>
      <Template title={"Back to Pages"}>
        <div className="min-h-screen w-full bg-base-200">
          <section className="min-h-screen flex flex-col gap-6 w-full px-4 pt-18 pb-28">
            {/* step 1 send OTP */}
            <div
              id="step1"
              className={`${
                stepUp == 1 ? "flex" : "hidden"
              } flex-col items-center justify-center bg-white rounded-3xl mt-2 p-5`}
            >
              <h1 className="text-4xl font-semibold">Sign Up</h1>
              <p className="text-sm text-slate-500 mt-3">
                ป้อนเบอร์โทรศัพท์ เพื่อรับรหัสยืนยัน
              </p>
              <div>
                <label className="input floating-label w-full border-[1px] rounded-xl h-12 mt-4 bg-white">
                  <Icon.Phone className="text-xl text-slate-500" />
                  <span>PHONE</span>
                  <input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    type="text"
                    pattern="[0-9]"
                    inputMode="numeric"
                    className="grow border-0"
                    placeholder="Phone Number"
                  />
                  <div className="text-slate-400 text-xs">(required)</div>
                </label>
                <button
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      step1Send();
                    }, 1500);
                  }}
                  className="btn btn-block btn-info rounded-xl mt-6"
                >
                  SEND OTP
                  <span
                    className={`${
                      isLoading ? "loading" : "hidden"
                    } loading loading-sm loading-spinner text-white`}
                  ></span>
                </button>
              </div>
              <div className="flex items-center justify-between w-full my-4 text-sm text-slate-500">
                <Link href={"/signin"}>ไปหน้า SignIn</Link>
                <Link href={"/inote-create"}>สร้างโน๊ตไม่ SignIn</Link>
              </div>
            </div>

            {/* step 2 OTP Verify */}
            <div
              id="step2"
              className={`${
                stepUp == 2 ? "flex" : "hidden"
              } flex-col items-center justify-center bg-white rounded-3xl mt-2 p-5`}
            >
              <h1 className="text-4xl font-semibold">ยืนยันรหัส OTP</h1>
              <p className="text-sm text-slate-500 my-4">
                กรอกรหัส OTP ที่ส่งไปยังเบอร์ของคุณ
              </p>
              {isLoading ? (
                <div className="text-center mb-6">
                  <span
                    className={`loading loading-xl loading-spinner text-info`}
                  ></span>
                </div>
              ) : (
                <div className="flex justify-between gap-2 mb-6">
                  <input
                    onChange={(e) => handleOtp(e)}
                    type="number"
                    pattern="[0-9]"
                    inputMode="numeric"
                    name="1"
                    id="ip1"
                    max={1}
                    className="w-10 h-12 text-center text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                    placeholder="●"
                  />
                  <input
                    onChange={(e) => handleOtp(e)}
                    type="number"
                    pattern="[0-9]"
                    inputMode="numeric"
                    name="2"
                    id="ip2"
                    max={1}
                    className="w-10 h-12 text-center text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                    placeholder="●"
                  />
                  <input
                    onChange={(e) => handleOtp(e)}
                    type="number"
                    pattern="[0-9]"
                    inputMode="numeric"
                    name="3"
                    id="ip3"
                    max={1}
                    className="w-10 h-12 text-center text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                    placeholder="●"
                  />
                  <input
                    onChange={(e) => handleOtp(e)}
                    type="number"
                    pattern="[0-9]"
                    inputMode="numeric"
                    name="4"
                    id="ip4"
                    max={1}
                    className="w-10 h-12 text-center text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                    placeholder="●"
                  />
                  <input
                    onChange={(e) => handleOtp(e)}
                    type="number"
                    pattern="[0-9]"
                    inputMode="numeric"
                    name="5"
                    id="ip5"
                    max={1}
                    className="w-10 h-12 text-center text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                    placeholder="●"
                  />
                  <input
                    onChange={(e) => handleOtp(e)}
                    type="number"
                    pattern="[0-9]"
                    inputMode="numeric"
                    name="6"
                    id="ip6"
                    max={1}
                    className="w-10 h-12 text-center text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                    placeholder="●"
                  />
                </div>
              )}

              <div
                role="alert"
                className={`alert ${
                  otpAlert.status ? "alert-info" : "alert-error"
                } alert-outline py-1`}
              >
                <Icon.ExclamationCircle />
                <span>{otpAlert.text}</span>
              </div>

              <p className="text-xs text-center text-gray-500 mt-4">
                ยังไม่ได้รับรหัส?{" "}
                <a href="#" className="text-info">
                  ส่งใหม่
                </a>
              </p>
            </div>

            {/* Step 3 set User Data */}
            <div
              id="step3"
              className={`${
                stepUp == 3 ? "flex" : "hidden"
              } flex-col items-center justify-center bg-white rounded-3xl mt-2 p-5`}
            >
              <h1 className="text-4xl font-semibold">ข้อมูลสมาชิก</h1>
              <p className="text-sm text-slate-500 my-4">
                {`<ขั้นตอนสุดท้าย> ป้อนข้อมูลผู้ใช้`}
              </p>

              {isLoading ? (
                <div className="text-center my-4">
                  <span
                    className={`loading loading-xl loading-spinner text-info`}
                  ></span>
                </div>
              ) : (
                <div>
                  <label className="input floating-label w-full border-[1px] rounded-xl h-12 my-4 bg-white">
                    <Icon.PersonCircle className="text-xl opacity-60" />
                    <span>NAME</span>
                    <input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      type="text"
                      className="grow border-0"
                      placeholder="Name"
                    />
                    <div className="text-slate-400 text-xs">(required)</div>
                  </label>
                  {/* m */}
                  <label className="input floating-label w-full border-[1px] rounded-xl h-12 bg-white">
                    <Icon.Key className="text-xl rotate-45" />
                    <span>PASSWORD</span>
                    <input
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      type="password"
                      className="grow border-0"
                      placeholder="Password"
                    />
                    <div className="text-slate-400 text-xs">(required)</div>
                  </label>
                  {/* m */}
                  <label className="input floating-label w-full border-[1px] rounded-xl h-12 mt-4 bg-white">
                    <Icon.Key className="text-xl rotate-45" />
                    <span>PASSWORD</span>
                    <input
                      onChange={(e) => matchPwd(e)}
                      type="password"
                      className="grow border-0"
                      placeholder="Confirm Password"
                    />
                    <div className="text-slate-400 text-xs">(required)</div>
                  </label>
                  {/* m */}
                </div>
              )}

              <button
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    handleSaveSignUp();
                  }, 1500);
                }}
                className={`btn btn-block btn-info rounded-xl mt-6 ${
                  pwdMatch ? "" : "btn-disabled"
                }`}
              >
                CREATE ACCOUNT
              </button>
            </div>

            {/* // Card APP */}
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
export default signUpPage;
