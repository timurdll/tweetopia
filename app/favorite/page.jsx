// "use client";
// import { useState, useEffect, useRef } from "react";
// import TweetCard from "@components/TweetCard";
// import { useSession } from "next-auth/react";
// import { useGetTweetsQuery } from "@redux/tweetopiaApi";

// const TweetCardList = ({ data, likedTweets }) => {
//   if (data.length === 0 && likedTweets.length !== 0) {
//     return <p className="mt-16">Loading...</p>;
//   }

//   if (likedTweets.length === 0 && data.length === 0) {
//     return <p className="mt-16">You haven't liked anything yet</p>;
//   }

//   return (
//     <div className="mt-16 prompt_layout">
//       {data.map((post) => (
//         <TweetCard key={post._id} post={post} />
//       ))}
//     </div>
//   );
// };

// const Favorite = () => {
//   const { data: session } = useSession();
//   const likedTweets = session?.user.likedTweets || [];
//   const [page, setPage] = useState(1);

//   const { data = [], isLoading } = useGetTweetsQuery({ limit: 6, page });
//   const [posts, setPosts] = useState(data);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const likedPosts = data.filter((post) => likedTweets.includes(post._id));
//       setPosts(likedPosts);
//       console.log(likedPosts);
//       console.log("call");
//     };

//     fetchPosts();
//   }, [data]);

//   return (
//     <section className="feed">
//       <TweetCardList data={posts} likedTweets={likedTweets} />
//       <div className="w-full flex justify-between pb-4">
//         <button onClick={() => handlePageChange(page - 1)}>Previous</button>
//         <button onClick={() => handlePageChange(page + 1)}>Next</button>
//       </div>
//     </section>
//   );
// };

// export default Favorite;
