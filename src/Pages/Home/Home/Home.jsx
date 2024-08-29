import { useState } from "react";
import Banner from "../Banner/Banner";
import { Helmet } from "react-helmet-async";
import PostTabs from "../../../Components/PostTabs/PostTabs";
import Announcements from "../Announcements/Announcements";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Helmet>
        <title>TalkRoute | Home</title>
      </Helmet>
      <div className='space-y-16 mt-16'>
        <Banner onSearch={handleSearch} />
        {/* <Announcements /> */}
        <PostTabs searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Home;
