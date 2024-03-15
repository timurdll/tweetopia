"use client";
import { useState, useEffect, useRef } from "react";
import TweetCard from "./TweetCard";
import { motion } from "framer-motion";
import { useGetTweetsQuery } from "@redux/tweetopiaApi";

const TweetCardList = ({ data, handleTagClick, filter }) => {
  const cardVariants = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
    hidden: {
      y: 20,
      opacity: 0,
    },
  };

  return (
    <div className="mt-16 tweet_layout">
      {data.map((post, i) => (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={i}
          key={post._id}
        >
          <TweetCard post={post} handleTagClick={handleTagClick} />
        </motion.div>
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const inputRef = useRef(null);
  const { data = [], isLoading } = useGetTweetsQuery();

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(posts)) {
      setPosts([...posts, ...data].reverse());
      setFilteredPosts([...posts, ...data].reverse());
      console.log("Call");
    }
  }, [data]);

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);

    const filtered = posts.filter((post) => {
      if (typeof post.tag === "string") {
        return (
          post.tag.includes(text) ||
          post.creator.username.includes(text) ||
          post.tweet.includes(text)
        );
      }
      return false;
    });

    setFilteredPosts(filtered);
  };

  const handleTagClick = (tag) => {
    if (inputRef.current) {
      inputRef.current.focus();
      setSearchText(tag);
      handleSearchChange({ target: { value: tag } });
    }
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
          ref={inputRef}
        />
      </form>
      <TweetCardList
        data={filteredPosts.length > 0 ? filteredPosts : posts}
        filter={filteredPosts}
        handleTagClick={handleTagClick}
      />
      <div className="absolute bottom-0">
        {isLoading ? (
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default Feed;
