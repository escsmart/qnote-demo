import Template from "@/components/Template";

const videoPage = () => {
  return (
    <>
      <Template title="Video Hub">
        <div className="min-h-screen w-full">
          <section className="min-h-screen px-4 py-18 mb-10">
            <div className="flex items-center justify-start gap-4">
              <div className="text-secondary">
                <div className="avatar avatar-online">
                  <div className="w-16 rounded-full">
                    <img src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp" />
                  </div>
                </div>
              </div>
              <div>
                <div className="stat-value">246588</div>
                <div className="stat-title font-bold">
                  PAKIN AKRAVEJTHAYAKUL
                </div>
                <div className="stat-desc text-neutral-500">
                  สมาชิกระดับ : BASIC
                </div>
              </div>
            </div>

            <div className="divider divider-start">ข้อมูลส่วนตัว</div>
            <div className="card bg-base-300 text-center">
              <div className="card-body text-gray-500">
                <i className="bi bi-plus-circle-dotted text-3xl"></i>
                เพิ่มบัญชีธนาคาร
              </div>
            </div>

            <div className="divider divider-start">ข้อมูลติดต่อ</div>
            <div className="card bg-base-300 text-center">
              <div className="card-body text-gray-500">
                <i className="bi bi-plus-circle-dotted text-3xl"></i>
                เพิ่มบัญชีธนาคาร
              </div>
            </div>

            <div className="divider divider-start">บัญชีธนาคาร</div>
            <div className="card bg-base-300 text-center">
              <div className="card-body text-gray-500">
                <i className="bi bi-plus-circle-dotted text-3xl"></i>
                เพิ่มบัญชีธนาคาร
              </div>
            </div>

            <div className="divider divider-start">ที่ทำงาน</div>
            <div className="card bg-base-300 text-center">
              <div className="card-body text-gray-500">
                <i className="bi bi-plus-circle-dotted text-3xl"></i>
                เพิ่มบัญชีธนาคาร
              </div>
            </div>
          </section>

          {/* <section className="min-h-screen w-full bg-slate-900 flex items-center justify-center">
            <h1 className="text-7xl font-semibold">SECTION 2</h1>
          </section>
          <section className="min-h-screen w-full bg-gray-800 flex items-center justify-center">
            <h1 className="text-7xl font-semibold">SECTION 3</h1>
          </section> */}
        </div>
      </Template>
    </>
  );
};
export default videoPage;
