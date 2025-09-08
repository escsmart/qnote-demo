import Template from "@/components/Template";
import Link from "next/link";

const inotePage = () => {
  return (
    <>
      <Template title={"i Note"}>
        <div className="min-h-screen w-full">
          <section className="min-h-screen px-4 py-18 mb-10">
            <div className="w-full">
              <div className="card bg-amber-100 my-2">
                <textarea
                  name=""
                  id=""
                  rows="4"
                  className="p-2"
                  placeholder="Enter Note hear.."
                ></textarea>
              </div>
              <div className="w-full flex items-center justify-between gap-4 my-4">
                <button className="btn rounded-2xl">บันทึกร่าง</button>
                <button className="btn rounded-2xl flex-1">
                  บันทึกข้อความ
                </button>
              </div>
            </div>

            <div className="divider divider-start">รายการโน๊ต</div>

            <div className="overflow-x-auto">
              <table className="table">
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-sm opacity-50">
                            Zemlak, Daniel and Leannon
                          </div>
                        </div>
                      </div>
                    </td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                  {/* //2 */}
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-sm opacity-50">
                            Zemlak, Daniel and Leannon
                          </div>
                        </div>
                      </div>
                    </td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                  {/* //3 */}
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-sm opacity-50">
                            Zemlak, Daniel and Leannon
                          </div>
                        </div>
                      </div>
                    </td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                  {/* //4 */}
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-sm opacity-50">
                            Zemlak, Daniel and Leannon
                          </div>
                        </div>
                      </div>
                    </td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
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
