import React, { useEffect, useRef } from "react";
import style from "./Carousel.module.css";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { data } from "../testImage";
const DATA_LENGTH = data.length;
function ImageCarusel() {
  const timerRef = useRef(null);
  const [index, setindex] = useState(0);
  const handleNext = () => {
    setindex((prev) => (prev === DATA_LENGTH - 1 ? 0 : prev + 1));
  };
  const handlePrev = () => {
    if (index === 0) {
      setindex(DATA_LENGTH - 1);
    } else {
      setindex(index - 1);
    }
  };
  useEffect(() => {
    timerRef.current = setInterval(handleNext, 3000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <>
      <div
        onMouseEnter={() => clearInterval(timerRef.current)}
        onMouseLeave={() => (timerRef.current = setInterval(handleNext, 1000))}
        className={style.carouselContainer}
      >
        <div className={style.imageContainer}>
          <div className={style.carouselImage}>
            <img src={data[index].imageUrl} alt="" />
          </div>
          <div className={style.btns}>
            <button onClick={handlePrev} className={style.back}>
              <ChevronLeft />
            </button>
            <button onClick={handleNext} className={style.next}>
              <ChevronRight />
            </button>
          </div>
            <div className={style.stepper}>
          {data.map((img, idx) => (
            <div
              key={img.id}
              className={`${style.dot} ${index === idx ? style.active : ""}`}
            ></div>
          ))}
        </div>
        </div>
      
      </div>
    </>
  );
}

export default ImageCarusel;
