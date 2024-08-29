// import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import banner5 from "../../../assets/home/01.jpg";
import banner2 from "../../../assets/home/02.jpg";
import banner3 from "../../../assets/home/03.jpg";
import banner4 from "../../../assets/home/04.jpg";
import banner1 from "../../../assets/home/05.png";
import banner6 from "../../../assets/home/06.png";
// import { FaMagnifyingGlass } from "react-icons/fa6";

const Banner = ({ onSearch }) => {
  // const [query, setQuery] = useState("");

  // const handleInputChange = (e) => {
  //   setQuery(e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSearch(query);
  // };

  return (
    <div className='mb-8 mt-36'>
      {/* <div className='mb-4 mt-24'>
        <form
          onSubmit={handleSubmit}
          className=' relative flex justify-end gap-2 ml-4 lg:ml-1'>
          <input
            type='text'
            className='  input  input-bordered grow max-w-[250px] lg:max-w-sm'
            placeholder='Search by tag'
            value={query}
            onChange={handleInputChange}
          />
          <button className='absolute top-4 right-4' type='submit'>
            <FaMagnifyingGlass />
          </button>
        </form>
      </div> */}
      <Carousel
        className='top-0 h-full'
        autoPlay={true}
        interval={2000}
        infiniteLoop={true}>
        <div className='h-[90%]'>
          <img className='h-full' src={banner1} alt='banner1' />
        </div>
        <div className='h-[90%]'>
          <img className='h-full' src={banner2} alt='banner2' />
        </div>
        <div className='h-[90%]'>
          <img className='h-full' src={banner3} alt='banner3' />
        </div>
        <div className='h-[90%]'>
          <img className='h-full' src={banner4} alt='banner4' />
        </div>
        <div className='h-[90%]'>
          <img className='h-full' src={banner5} alt='banner5' />
        </div>
        <div className='h-[90%]'>
          <img className='h-full' src={banner6} alt='banner6' />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
