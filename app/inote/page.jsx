import Template from "@/components/Template";
import Link from "next/link";

const inotePage = () => {
  return (
    <>
      <Template title={"i Note"}>
        <div className="min-h-screen w-full">
          <section className="min-h-screen px-4 py-18 mb-10">
            <div className="w-full">
              <div className="font-bold">กระเป๋าเงิน (ESYPAY)</div>
              <div className="stat-value">฿1,400.00</div>
              <div className="stat-desc">
                เปิดโหมดตัดยอดอัตโนมัติ เพื่อรักษาประวัติบัญชี{" "}
                <Link href={"/"} className="text-info font-bold">
                  คลิกที่นี่
                </Link>
              </div>
            </div>

            <div className="divider divider-start">เมนูด่วน</div>

            <div className="grid grid-cols-6 h-52 rounded-2xl overflow-hidden">
              <div className="col-span-3 bg-info flex flex-col items-center justify-center h-full cursor-pointer text-white">
                <i className="bi bi-arrow-up-right"></i>
                <p>จ่ายเงิน</p>
              </div>
              <div className="col-span-3 bg-primary flex flex-col items-center justify-center h-full cursor-pointer">
                <i className="bi bi-qr-code"></i>
                <p>รับเงิน</p>
              </div>
              <div className="col-span-3 bg-success flex flex-col items-center justify-center h-full cursor-pointer">
                <i className="bi bi-exclude"></i>
                <p>ชำระสินเชื่อ</p>
              </div>
              <div className="col-span-3 bg-neutral-700 flex flex-col items-center justify-center h-full cursor-pointer text-white">
                <i className="bi bi-plus-lg"></i>
                <p>เพิ่มวงเงิน</p>
              </div>
            </div>

            <div className="divider divider-start">ธุรกรรม</div>

            <div
              className="card bg-base-300 mt-6 h-36"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #00000080, #0000ff80), url(https://www.pier.or.th/static/24d22d66dee35a0b9189db723ecc40cc/b0b43/cover.png)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom center",
                backgroundSize: "cover",
              }}
            >
              <div className="card-body text-xl text-white font-black">
                ฝากเงิน
              </div>
            </div>

            <div
              className="card bg-base-300 mt-4 h-36"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #ff000080, #0000ff00), url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwnbzsehuLUSAgFxUmEgQWOIWfaFeKRmmDW9NSq28ea1xJ7oJdK9JJygrlAwvYOogV7Kg&usqp=CAU)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom center",
                backgroundSize: "cover",
              }}
            >
              <div className="card-body text-xl text-white font-black">
                ถอนเงิน
              </div>
            </div>

            <div
              className="card bg-base-300 mt-4 h-36"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #00000080, #0000ff88), url(https://thaiforexreview.com//storage/blogs/ba45380a78ef6ea3f068d4cc97c3cd2e.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom center",
                backgroundSize: "cover",
              }}
            >
              <div className="card-body text-xl text-white font-black">
                การลงทุน
              </div>
            </div>
          </section>
        </div>
      </Template>
    </>
  );
};
export default inotePage;
