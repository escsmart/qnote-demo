"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel();
  const backgroundGame =
    "https://www.prachachat.net/wp-content/uploads/2022/04/%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%97%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B3-728x485-1.jpg";
  const backgroundGame2 = "https://inwfile.com/s-cm/b7x1pt.jpg";
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div
          className="embla__slide h-36 rounded-xl shadow-xl overflow-hidden"
          style={{ backgroundImage: "url(" + backgroundGame + ")" }}
        >
          <div className="h-full text-white text-center flex flex-col justify-between">
            <div className="bg-black opacity-70 text-white p-1.5">
              <div>ทองคำหนัก 1 สลึง</div>
            </div>

            <div className="bg-black opacity-70 text-white flex justify-between p-1.5 rounded-2xl">
              <div>
                ฿100<span className="text-xs">/หน่วย.</span>
              </div>
              <div>
                <i className="bi bi-people"></i> 67%
              </div>
            </div>
          </div>
        </div>
        <div
          className="embla__slide h-36 rounded-xl shadow-xl overflow-hidden"
          style={{
            backgroundImage: "url(" + backgroundGame2 + ")",
            backgroundSize: "cover",
          }}
        >
          <div className="h-full text-white text-center flex flex-col justify-between">
            <div className="bg-black opacity-70 text-white p-1.5">
              <div>น้ำฟอง เสือ/ช้าง 1 ลัง</div>
            </div>

            <div className="bg-black opacity-70 text-white flex justify-between p-1.5 rounded-2xl">
              <div>
                ฿50
                <span className="text-xs">/หน่วย.</span>
              </div>
              <div>
                <i className="bi bi-people"></i> 52%
              </div>
            </div>
          </div>
        </div>
        <div className="embla__slide h-36 bg-info">Slide 2</div>
        <div className="embla__slide h-36 bg-warning">Slide 3</div>
        <div className="embla__slide h-36 bg-info">Slide 2</div>
      </div>
    </div>
  );
}
