import { useState, useEffect } from "react";
import { Tab, Tabs, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PostCard from "../PostCard/PostCard";

const PostTabs = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosPublic.get("/posts");
        setPosts(res.data);
        setFilteredPosts(res.data); // Initially show all posts
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [axiosPublic]);

  const filterPosts = async (tag) => {
    try {
      let filteredData = [];
      if (tag === "All") {
        // If "All" is selected, include posts from all tags
        filteredData = posts;
      } else {
        const res = await axiosPublic.get(`/posts?tag=${tag}`);
        filteredData = res.data;
      }
      setFilteredPosts(filteredData);
    } catch (error) {
      console.error("Failed to fetch filtered posts:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
      <div className='grid md:grid-cols-3 grid-cols-1 gap-4 mt-6 mb-16 border text-center p-6 mx-auto'>
        {filteredPosts.map((post) => (
          <PostCard key={post._id} post={post}></PostCard>
        ))}
      </div>
    </div>
  );
};

export default PostTabs;
