import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = Array.from({ length: 26 }, (_, i) => `/graphics/graphic ${i + 1}.png`);

const GraphicWindow = () => (
  <div>
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      loop
      className="w-full max-w-125 h-110"
    >
      {images.map((src, idx) => (
        <SwiperSlide key={idx}>
          <img
            src={src}
            alt={`Graphic ${idx + 1}`}
            className="object-contain w-full h-100 rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);
export default GraphicWindow;