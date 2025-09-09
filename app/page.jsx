import Template from "@/components/Template";
import * as Icon from "react-bootstrap-icons";

export default function Home() {
  return (
    <>
      <Template title="Quick Note">
        <div className="min-h-screen w-full bg-base-200">
          <section className="min-h-screen flex flex-col gap-6 w-full px-4 py-18 mb-10">
            <div
              className="card h-36 rounded-3xl mt-2"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #00000080, #0000ff80), url(https://www.psychologicalscience.org/redesign/wp-content/uploads/2013/03/PAFF_051217_mindfulnesstestscores-1024x585.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom center",
                backgroundSize: "cover",
              }}
            >
              <div className="card-body text-xl text-white">
                <h1 className="font-bold">Quick Note</h1>
                <p className="font-extralight text-sm">
                  ทำให้การบันทึกความจำ..เป็นเรื่องง่าย
                </p>
              </div>
            </div>

            <div className="card bg-white inset-ring-accent rounded-3xl flex flex-col items-center justify-around gap-6 p-4">
              <div className="text-center">
                <div className="text-sm text-green-600">THE FUTURE IS NOW</div>
                <h1 className="text-2xl font-bold">Powerful Features</h1>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Error, eius!
                </p>
              </div>
              <div className="w-full grid grid-cols-6 h-52 rounded-2xl overflow-hidden text-white">
                <div
                  className="col-span-3 flex flex-col items-center justify-center h-full cursor-pointer text-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #00000080, #0000ff80), url('./bg/qnote-bg.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "bottom center",
                    backgroundSize: "cover",
                  }}
                >
                  <i className="bi bi-arrow-up-right"></i>
                  <p>QNote</p>
                </div>
                <div
                  className="col-span-3 flex flex-col items-center justify-center h-full cursor-pointer"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #FF000080, #0000ff80), url('./bg/video-bg.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "bottom center",
                    backgroundSize: "cover",
                  }}
                >
                  <i className="bi bi-qr-code"></i>
                  <p>iVideo</p>
                </div>
                <div
                  className="col-span-3 flex flex-col items-center justify-center h-full cursor-pointer text-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #FF000080, #0000ff80), url('./bg/inote-bg.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "bottom center",
                    backgroundSize: "cover",
                  }}
                >
                  <i className="bi bi-arrow-up-right"></i>
                  <p>iNote</p>
                </div>
                <div
                  className="col-span-3 flex flex-col items-center justify-center h-full cursor-pointer text-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #00000080, #0000ff80), url('./bg/invester-bg.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "bottom center",
                    backgroundSize: "cover",
                  }}
                >
                  <i className="bi bi-plus-lg"></i>
                  <p>หุ้น QNote</p>
                </div>
              </div>
            </div>

            <div className="card bg-white inset-ring-accent rounded-3xl flex flex-col items-center justify-around gap-6 p-4">
              <div className="grid grid-cols-12 gap-4 w-full text-center">
                <div className="col-span-6 flex flex-col items-center justify-center gap-1 p-3">
                  <Icon.LightningCharge className="text-4xl text-warning" />
                  <h2 className="font-semibold mt-2">Lightning Fast</h2>
                  <p className="text-gray-400">Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="col-span-6 flex flex-col items-center justify-center gap-1 p-3">
                  <Icon.Award className="text-4xl text-red-400" />
                  <h2 className="font-semibold mt-2">Best Support</h2>
                  <p className="text-gray-400">Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="col-span-6 flex flex-col items-center justify-center gap-1 p-3">
                  <Icon.Phone className="text-4xl text-neutral-500" />
                  <h2 className="font-semibold mt-2">PWA Ready</h2>
                  <p className="text-gray-400">Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="col-span-6 flex flex-col items-center justify-center gap-1 p-3">
                  <Icon.CodeSlash className="text-4xl text-success" />
                  <h2 className="font-semibold mt-2">Tailwind CSS</h2>
                  <p className="text-gray-400">Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Template>
    </>
  );
}
