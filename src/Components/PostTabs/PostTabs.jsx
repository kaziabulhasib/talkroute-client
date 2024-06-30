import { useState, useEffect } from "react";
import { Tab, Tabs, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PostCard from "../PostCard/PostCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./styles.css";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const PostTabs = ({ searchQuery }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosPublic.get("/posts");
        setPosts(res.data);
        setFilteredPosts(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [axiosPublic]);

  useEffect(() => {
    const fetchFilteredPosts = async () => {
      if (!searchQuery) {
        setFilteredPosts(posts);
        return;
      }
      try {
        const res = await axiosPublic.get(`/posts/search?query=${searchQuery}`);
        setFilteredPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch filtered posts:", error);
      }
    };

    fetchFilteredPosts();
  }, [searchQuery, axiosPublic, posts]);

  const filterPosts = (tag) => {
    if (tag === "All") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.postTag === tag));
    }
  };

  const chunkedPosts = chunkArray(filteredPosts, 6);

  if (loading) {
    return <div>Loading...</div>;
  }

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  const sortByPopularity = () => {
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      const voteDifferenceA = a.upVote - a.downVote;
      const voteDifferenceB = b.upVote - b.downVote;
      return voteDifferenceB - voteDifferenceA;
    });
    setFilteredPosts(sortedPosts);
  };

  return (
    <div>
      <button
        onClick={sortByPopularity}
        className='btn btn-outline font-medium text-xl  mb-8 lg:ml-1 ml-4'>
        Sort by Popularity
      </button>
      <Tabs>
        <TabList>
          <Tab onClick={() => filterPosts("All")}>All</Tab>
          <Tab onClick={() => filterPosts("Tech")}>Tech</Tab>
          <Tab onClick={() => filterPosts("LifeStyle")}>LifeStyle</Tab>
          <Tab onClick={() => filterPosts("Sports")}>Sports</Tab>
          <Tab onClick={() => filterPosts("Politics")}>Politics</Tab>
          <Tab onClick={() => filterPosts("Miscellaneous")}>Miscellaneous</Tab>
        </TabList>
      </Tabs>
      <Swiper pagination={pagination} modules={[Pagination]} slidesPerView={1}>
        {chunkedPosts.map((chunk, index) => (
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

export default PostTabs;
