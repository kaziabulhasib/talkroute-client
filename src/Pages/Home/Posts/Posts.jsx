import PostCard from "../../../Components/PostCard/PostCard";
import usePost from "../../../hooks/usePost";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination } from "swiper/modules";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const Posts = () => {
  const [posts] = usePost();
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  const chunkedItems = chunkArray(posts, 5);
  //   console.log(post);
  return (
    <div>
      <h1 className='text-3xl text-center'>All Posts</h1>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        // className='h-auto'
        slidesPerView={1}>
        <div>
          {chunkedItems.map((chunk, index) => (
            <SwiperSlide key={index}>
              <div className=' grid md:grid-cols-3 grid-cols-1 gap-4 mt-6 mb-16  border text-center p-6  mx-auto '>
                {chunk.map((post) => (
                  <PostCard key={post._id} post={post}></PostCard>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Posts;
