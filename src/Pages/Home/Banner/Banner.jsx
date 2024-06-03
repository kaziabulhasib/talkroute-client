import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import banner5 from "../../../assets/home/01.jpg";
import banner2 from "../../../assets/home/02.jpg";
import banner3 from "../../../assets/home/03.jpg";
import banner4 from "../../../assets/home/04.jpg";
import banner1 from "../../../assets/home/05.png";
import banner6 from "../../../assets/home/06.png";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Banner = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div>
      <div className='mb-4'>
        <label className='input max-w-sm input-bordered flex items-center gap-2'>
          <input
            type='text'
            className='grow'
            placeholder='Search'
            value={query}
            onChange={handleInputChange}
          />
          <FaMagnifyingGlass />
        </label>
      </div>
      <Carousel
        className='top-0 h-full'
        autoPlay={true}
        interval={2000}
        infiniteLoop={true}>
        <div>
          <img className='h-full' style={{ height: "100%" }} src={banner1} />
        </div>
        <div>
          <img src={banner2} />
        </div>
        <div>
          <img src={banner3} />
        </div>
        <div>
          <img src={banner4} />
        </div>
        <div>
          <img src={banner5} />
        </div>
        <div>
          <img src={banner6} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
