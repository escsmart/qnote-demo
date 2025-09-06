"use client";
import MenuBottom from "@/components/MenuBottom";
import Navbar from "@/components/Navbar";
import Template from "@/components/Template";
import { useEffect, useState } from "react";

const gameNumberPage = () => {
  const [gameData, setGameData] = useState({
    answer: null,
    secert: null,
  });
  const [unitAmount, setUnitAmount] = useState(40);
  const [playingPercen, setPlayingPercen] = useState(0);
  const [playerId, setPlayerId] = useState(2);
  const [gameColumn, setGameColumn] = useState([
    { id: 1, number: 1, playerId: 2, secret: 6, saler: true, isBot: false },
    {
      id: 2,
      number: 2,
      playerId: 0,
      secret: null,
      saler: false,
      isBot: false,
    },
    { id: 3, number: 3, playerId: 2, secret: 1, saler: true, isBot: false },
    {
      id: 4,
      number: 4,
      playerId: 0,
      secret: null,
      saler: false,
      isBot: false,
    },
    {
      id: 5,
      number: 5,
      playerId: 99,
      secret: 3,
      saler: true,
      isBot: true,
    },
    { id: 6, number: 6, playerId: 1, secret: 9, saler: true, isBot: false },
    {
      id: 7,
      number: 7,
      playerId: 99,
      secret: 0,
      saler: true,
      isBot: true,
    },
    { id: 8, number: 8, playerId: 2, secret: 6, saler: true, isBot: false },
    { id: 9, number: 9, playerId: 0, secret: 3, saler: true, isBot: false },
  ]);
  let rows = [];
  for (let i = 0; i < 9; i++) {
    if (i + 1 == playerId) {
      rows.push(
        <div
          className="col-span-4 bg-gray-300 h-28 text-center"
          key={i}
          onClick={() => {
            document.getElementById("my_modal_5").showModal();
            setGameData({ ...gameData, answer: i + 1 });
          }}
        >
          <p className="h-full flex items-center justify-center">{i + 1}</p>
        </div>
      );
    } else {
      rows.push(
        <div
          className="col-span-4 bg-base-200 h-28 text-center"
          key={i}
          onClick={() => {
            document.getElementById("my_modal_5").showModal();
            setGameData({ ...gameData, answer: i + 1 });
          }}
        >
          <p className="h-full flex items-center justify-center">{i + 1}</p>
        </div>
      );
    }
  }

  const [secretBlock, setSecretBlock] = useState([]);
  const fetchSecret = () => {
    let datas = [];
    for (let i = 0; i <= 9; i++) {
      datas.push({
        id: i,
        number: i,
      });
    }
    setSecretBlock(datas);
  };

  const orderTime = (item) => {
    if (item.saler == true) {
      alert("รายการนี้ถูกขายแล้ว ไม่สามารถออเดอร์ได้");
    } else {
      fetchSecret();
      document.getElementById("my_modal_5").showModal();
      setGameData({ ...gameData, answer: item.number });
    }
  };

  const setData = (item) => {
    if (gameData.secert != null) {
      document
        .getElementById(`secretNo${gameData.secert}`)
        .classList.toggle("bg-success");
    }
    document
      .getElementById(`secretNo${item.id}`)
      .classList.toggle("bg-success");
    setGameData({ ...gameData, secert: item.id });
  };

  const cancelAction = () => {
    setSecretBlock([]);
    setGameData((prevState) => ({
      ...prevState,
      answer: null,
      secert: null,
    }));
  };

  const gameAction = () => {
    setSecretBlock([]);
    console.log(gameData);
  };

  const formatterPrice = (req) => {
    const formatter = new Intl.NumberFormat("th-TH", {
      minimumFractionDigits: 2,
    });
    return formatter.format(req);
  };

  let percen = (7 / 9) * 100;
  useEffect(() => {
    setPlayingPercen(percen);
    if (percen > 80) {
      alert("End Game");
    }
  }, []);

  return (
    <>
      <Template title={"Game Bonus"}>
        <div className="min-h-screen w-full">
          <section className="min-h-screen px-4 py-18 mb-10">
            <div
              className="card bg-base-300 h-36"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #FF000080, #0000ff80), url(https://images.sigma.world/How-to-Play-Backgammon.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom center",
                backgroundSize: "cover",
              }}
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              <div className="card-body text-xl text-white font-black">
                กติกา / การเล่นเกม
              </div>
            </div>

            <button className="btn btn-lg btn-block bg-prim text-white font-normal mt-4">
              {formatterPrice(unitAmount)} / หน่วย
            </button>

            <div className="grid grid-cols-12 gap-1 mt-4 rounded-2xl overflow-hidden">
              {gameColumn.map((item, index) => (
                <div
                  className={`col-span-4 h-28 text-center relative ${
                    item.playerId == playerId
                      ? "bg-success"
                      : item.saler == true
                      ? "bg-secondary"
                      : "bg-base-300 skeleton "
                  }`}
                  key={index}
                  onClick={() => {
                    orderTime(item);
                  }}
                >
                  <div className="h-full flex items-center justify-center font-black">
                    {item.saler == true ? (
                      <i
                        className={`absolute top-2 left-2 text-2xl opacity-55 ${
                          item.isBot == true
                            ? "bi bi-robot"
                            : item.playerId == playerId
                            ? "bi bi-check-circle-fill"
                            : "bi bi-person-circle"
                        }`}
                      ></i>
                    ) : null}
                    {item.playerId == playerId ? (
                      <div
                        className="bg-error absolute bottom-0 right-0 w-12 h-12 text-white text-end pe-2 pt-5"
                        style={{
                          clipPath: "polygon(100% 0,100% 100%,0 100%)",
                        }}
                      >
                        {item.secret}
                      </div>
                    ) : null}
                    {item.number}
                  </div>
                </div>
              ))}
            </div>

            <div className="join join-vertical bg-base-100 mt-4">
              <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="checkbox" name="my-accordion-4" defaultChecked />
                <div className="collapse-title font-semibold">
                  การรับรอง/ของรางวัล
                </div>
                <div className="collapse-content text-sm">
                  <ol>
                    <li>1. การันตีของรางวัลโดย ESY-AGENCY</li>
                    <li>
                      2. เกมนี้มีของรางวัลมูลค่า ฿
                      {formatterPrice(unitAmount * 6)}
                    </li>
                    <li>3. เกมสิ้นสุดเมื่อ ผู้เล่น</li>
                    <li>
                      3. เงินรางวัลจะเข้ากระเป๋าเงินผู้ชนะ ภายใน 5 นาที
                      หลังจากประกาศผล
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
        </div>

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">
                กรุณาเลือกเลขโจทย์เพื่อให้ได้ผลลัพท์
              </h3>
              <h3 className="text-lg text-pink-600">
                <div
                  className="radial-progress"
                  style={{
                    "--value": 100,
                    "--size": "2rem",
                    "--thickness": "4px",
                  }}
                  aria-valuenow={100}
                  role="progressbar"
                >
                  {gameData.answer}
                </div>
              </h3>
            </div>
            <div className="grid grid-cols-10 gap-1 mt-4 rounded-2xl overflow-hidden">
              {secretBlock.length > 0
                ? secretBlock.map((item, index) => (
                    <div
                      className="col-span-2 bg-base-200 h-16 text-center secret-block"
                      key={index}
                      id={`secretNo${item.id}`}
                      onClick={() => setData(item)}
                    >
                      <p className="h-full flex items-center justify-center">
                        {item.id}
                      </p>
                    </div>
                  ))
                : null}
            </div>
            <div className="modal-action">
              <form method="dialog" className="w-full flex gap-2">
                <button
                  className="btn w-3/12 btn-error text-white"
                  onClick={cancelAction}
                >
                  X
                </button>
                <button
                  className="btn w-9/12 btn-success text-white"
                  onClick={gameAction}
                >
                  ยอมรับ/ยืนยัน
                </button>
              </form>
            </div>
          </div>
        </dialog>

        <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">กติกา / การเล่นเกม</h3>
            <ul className="text-sm">
              <li>
                - เติมเครดิตให้เพียงพอต่อหน่วยการเล่น (ขั้นต่ำ ฿
                {formatterPrice(unitAmount)})
              </li>
              <li>- ผู้เล่นเลือกหมายเลขที่คาดว่าผลลัพท์จะออก</li>
              <li>- ระบบจะให้ผู้เล่นเลือกเลขโจทย์ 1 เลข (0-9)</li>
              <li>- กดยืนยันจะเป็นการเลือกเลขผลลัพท์สำเร็จ</li>
              <li>- เมื่อมีผู้เล่นครบ ระบบจะเริ่มคำนวนผลลัพท์</li>
              <li className="font-bold mt-4">การคำนวน</li>
              <li>จะนำเอาตัวเลขโจทย์ของผู้เล่นทุกรายมาบวกกัน</li>
              <li>เพื่อให้ได้ผลลัพท์ 1 หลัก เช่น</li>
              <li>9+6+2+8+5+3+8+4+9+5 = 59</li>
              <li>5+9 = 14</li>
              <li>1+4 = 5</li>
              <li>ผลลัพท์ 1 หลักคือ 5</li>
            </ul>
            <div className="modal-action">
              <form method="dialog" className="w-full flex gap-2">
                <button className="btn w-12/12 btn-success text-white">
                  OK
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </Template>
    </>
  );
};
export default gameNumberPage;
