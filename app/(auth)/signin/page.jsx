import MenuBottom from "@/components/MenuBottom";
import Template from "@/components/Template";
import Link from "next/link";
import * as Icon from "react-bootstrap-icons";

const signInPage = () => {
  return (
    <>
      <Template title={"Back to Pages"}>
        <div className="min-h-screen w-full bg-base-200">
          <section className="min-h-screen flex flex-col gap-6 w-full px-4 pt-18 pb-28">
            <div className="flex flex-col items-center justify-center bg-white rounded-3xl mt-2 p-5">
              <h1 className="text-4xl font-semibold">Sign In</h1>
              <p className="text-sm text-slate-500">Enter your Credentials</p>
              <label className="input floating-label w-full border-[1px] rounded-xl h-12 my-4 mt-4 bg-white">
                <Icon.PersonCircle className="text-xl text-slate-500" />
                <span>USERNAME</span>
                <input
                  type="text"
                  className="grow border-0"
                  placeholder="Username"
                />
                <div className="text-slate-400 text-xs">(required)</div>
              </label>
              {/* m */}
              {/* m */}
              {/* m */}
              <label className="input floating-label w-full border-[1px] rounded-xl h-12 bg-white">
                <Icon.Key className="text-xl rotate-45" />
                <span>PASSWORD</span>
                <input
                  type="text"
                  className="grow border-0"
                  placeholder="Password"
                />
                <div className="text-slate-400 text-xs">(required)</div>
              </label>
              {/* m */}
              {/* m */}
              {/* m */}
              <button className="btn btn-block btn-info rounded-xl mt-6">
                SIGN IN
              </button>
              <div className="flex items-center justify-between w-full my-4 text-sm text-slate-500">
                <Link href={"/forget"}>ลืมรหัสผ่าน</Link>
                <Link href={"/signup"}>สร้างบัญชี</Link>
              </div>
            </div>

            <div className="card bg-white inset-ring-accent rounded-3xl flex flex-col items-center justify-around gap-6 p-8 py-12">
              <div className="text-center">
                <div className="text-sm text-info">TIME TO GO MOBILE</div>
                <h1 className="text-2xl font-bold">Get Esy Mobile Today</h1>
                <p className="text-gray-400 text-sm">
                  Start your next project with Esy and enjoy the power of a
                  Progressive Web App.
                </p>
              </div>
              <button className="btn rounded-xl btn-info px-8">
                Get Esy App
              </button>
            </div>
          </section>
        </div>
      </Template>
      <MenuBottom />
    </>
  );
};
export default signInPage;
