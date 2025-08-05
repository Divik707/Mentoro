import Hero from "../assets/hero.png";
import Img1 from "../assets/Img1.png";
import Img2 from "../assets/Img2.png";
import Img3 from "../assets/Img3.png";
import Img4 from "../assets/Img4.png";

const images = [Hero, Img1, Img2, Img3, Img4];

export const Prototype = () => {
  return (
   <div className="flex justify-center flex-col">
     <div className="min-h-screen bg-neutral-600 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-full overflow-hidden">
        <div className="flex gap-10 animate-scroll whitespace-nowrap">
          {images.concat(images).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`carousel-${index}`}
              className="w-[300px] h-[200px] object-cover rounded-xl shadow-lg inline-block"
            />
          ))}
        </div>
      </div>
    </div>
   </div>
  );
};
