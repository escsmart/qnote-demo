import Template from "@/components/Template";

const myListPage = () => {
  return (
    <>
      <Template title={"รายการ"}>
        <div className="min-h-screen w-full">
          <section className="min-h-screen px-4 py-18 mb-10">
            <table className="table table-xs table-pin-rows table-pin-cols">
              <thead>
                <tr className="bg-prim text-white">
                  <td className="w-20">วันที่</td>
                  <td>เข้า</td>
                  <td>ออก</td>
                  <td>รายการ</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01-01-2025</td>
                  <td> 12,000.00</td>
                  <td>-</td>
                  <td>ยอดอนุมัติ</td>
                </tr>
                <tr>
                  <td>01-01-2025</td>
                  <td>-</td>
                  <td>-</td>
                  <td>ดีลชำระทุกวันที่ 15</td>
                </tr>
                <tr>
                  <td>02-01-2025</td>
                  <td>-</td>
                  <td> 5,000.00</td>
                  <td>เบิกถอน #00012145</td>
                </tr>
                <tr>
                  <td>08-01-2025</td>
                  <td>-</td>
                  <td> 2,000.00</td>
                  <td>เบิกถอน #00012732</td>
                </tr>
                <tr>
                  <td>15-01-2025</td>
                  <td>-</td>
                  <td>-</td>
                  <td>ชำระเงินต้น</td>
                </tr>
                <tr>
                  <td>15-01-2025</td>
                  <td> 253.33</td>
                  <td>-</td>
                  <td>ชำระดอกเบี้ย</td>
                </tr>
                <tr>
                  <td>15-01-2025</td>
                  <td>7,000.00</td>
                  <td>-</td>
                  <td>INCNO 00012145, 00012732</td>
                </tr>
                <tr>
                  <td>15-01-2025</td>
                  <td>-</td>
                  <td>7,000.00</td>
                  <td>EXCNO #00015322</td>
                </tr>
                <tr>
                  <td>15-02-2025</td>
                  <td>700.00</td>
                  <td>-</td>
                  <td>ชำระดอกเบี้ย</td>
                </tr>
                <tr>
                  <td>15-03-2025</td>
                  <td>-</td>
                  <td>-</td>
                  <td>ชำระเงินต้น</td>
                </tr>
                <tr>
                  <td>15-03-2025</td>
                  <td>500.00</td>
                  <td>-</td>
                  <td>ชำระดอกเบี้ย</td>
                </tr>
                <tr>
                  <td>15-03-2025</td>
                  <td>16.67</td>
                  <td>-</td>
                  <td>ค่าปรับ</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </Template>
    </>
  );
};
export default myListPage;
