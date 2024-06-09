import { useState, useEffect } from "react";
import PostCard from "../../../Components/PostCard/PostCard";
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

const Posts = ({ searchQuery }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/posts");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setPosts(data);
        setFilteredPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchFilteredPosts = async () => {
      if (searchQuery) {
        try {
          const res = await fetch(
            `http://localhost:5000/posts/search?query=${searchQuery}`
          );
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await res.json();
          setFilteredPosts(data);
        } catch (error) {
          console.error("Failed to fetch filtered posts:", error);
        }
      } else {
        setFilteredPosts(posts);
      }
    };

    fetchFilteredPosts();
  }, [searchQuery, posts]);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  const chunkedItems = chunkArray(filteredPosts, 5);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <h1 className='text-3xl text-center'>All Posts</h1> */}
      <Swiper pagination={pagination} modules={[Pagination]} slidesPerView={1}>
        {chunkedItems.map((chunk, index) => (
          <SwiperSlide key={index}>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-4 mt-6 mb-16 border text-center p-6 mx-auto'>
              {chunk.map((post) => (
                <PostCard key={post._id} post={post}></PostCard>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Posts;
