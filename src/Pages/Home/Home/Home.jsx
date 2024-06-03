import { useState } from "react";
import Banner from "../Banner/Banner";
import Posts from "../Posts/Posts";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className='space-y-16 mt-16'>
      <Banner onSearch={handleSearch} />
      <Posts searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
