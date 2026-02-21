// ImageGallery.jsx
import { useEffect, useRef } from "react";
import "./ImageGallery.css";

import img1 from "../sources/galery/1.jpg";
import img2 from "../sources/galery/2.jpg";
import img3 from "../sources/galery/3.png";
import img4 from "../sources/galery/4.png";
import img6 from "../sources/galery/6.png";
import img7 from "../sources/galery/7.png";
import img8 from "../sources/galery/11.jpg";

const images = [img1, img2, img3, img4, img6, img7, img8];


export default function ImageGallery() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    let scrollAmount = 0;

    const autoScroll = () => {
      if (!track) return;

      scrollAmount += 1;
      track.scrollLeft = scrollAmount;

      // Reinicio infinito
      if (scrollAmount >= track.scrollWidth / 2) {
        scrollAmount = 0;
      }
    };

    const interval = setInterval(autoScroll, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gallery-container">
      <div className="gallery-track" ref={trackRef}>
        {[...images, ...images].map((src, index) => (
          <div className="gallery-item" key={index}>
            <img src={src} alt={`gallery-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
