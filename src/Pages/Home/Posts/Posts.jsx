// import { useState, useEffect } from "react";
// import PostCard from "../../../Components/PostCard/PostCard";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "./styles.css";
// import { Pagination } from "swiper/modules";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";

// const chunkArray = (array, size) => {
//   const result = [];
//   for (let i = 0; i < array.length; i += size) {
//     result.push(array.slice(i, i + size));
//   }
//   return result;
// };

// const Posts = ({ searchQuery }) => {
//   const [posts, setPosts] = useState([]);
//   const [filteredPosts, setFilteredPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const axiosPublic = useAxiosPublic();

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await axiosPublic.get("/posts");
//         setPosts(res.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch posts:", error);
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [axiosPublic]);

//   useEffect(() => {
//     const filterPosts = async () => {
//       try {
//         let filteredData = [];
//         if (searchQuery && searchQuery !== "All") {
//           const res = await axiosPublic.get(`/posts?tag=${searchQuery}`);
//           filteredData = res.data;
//         } else {
//           // If "All" is selected, include posts from all tags
//           filteredData = posts;
//         }
//         setFilteredPosts(filteredData);
//       } catch (error) {
//         console.error("Failed to filter posts:", error);
//       }
//     };

//     filterPosts();
//   }, [searchQuery, posts, axiosPublic]);

//   const pagination = {
//     clickable: true,
//     renderBullet: function (index, className) {
//       return '<span class="' + className + '">' + (index + 1) + "</span>";
//     },
//   };

//   const chunkedItems = chunkArray(filteredPosts, 5);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <Swiper pagination={pagination} modules={[Pagination]} slidesPerView={1}>
//         {chunkedItems.map((chunk, index) => (
//           <SwiperSlide key={index}>
//             <div className='grid md:grid-cols-3 grid-cols-1 gap-4 mt-6 mb-16 border text-center p-6 mx-auto'>
//               {chunk.map((post) => (
//                 <PostCard key={post._id} post={post}></PostCard>
//               ))}
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default Posts;
