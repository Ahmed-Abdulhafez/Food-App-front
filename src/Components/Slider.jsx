import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";

const Slider = () => {
  const [project, setProject] = useState([]);

  useEffect(() => {
    axios.get("data.json").then((res) => {
      setProject(res.data.project);
    });
  }, []);

  return (
    <>
      <div className="slider h-vh100 py-30" id="slider">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {project.map((project) => (
            <SwiperSlide key={project.id}>
              <div class="flex flex-col bg-white shadow-md w-100">
                <img
                  class="w-72 h-88 object-cover"
                  src={project.image}
                  alt="image"
                />
                <div class="p-4 text-sm">
                  <p class="text-slate-600">$ 29.00</p>
                  <p class="text-slate-800 text-base font-medium my-1.5">
                    Chris Jordan
                  </p>
                  <p class="text-slate-500">
                    Looks amazing out of the box. I barely had to customize
                    anything.
                  </p>
                  <div class="grid grid-cols-2 gap-2 mt-3">
                    <button class="bg-slate-100 text-slate-600 py-2">
                      Add to cart
                    </button>
                    <button class="bg-slate-800 text-white py-2">
                      Buy now
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
