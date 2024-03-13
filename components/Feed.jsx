"use client";
import { useState, useEffect, useRef } from "react";
import TweetCard from "./TweetCard";
import { useGetTweetsQuery } from "@redux/tweetopiaApi";

const TweetCardList = ({ data, handleTagClick, filter }) => {
  // if (data.length === 0) {
  //   return <p className="mt-16">Loading...</p>;
  // }

  // if (filter.length === 0) {
  //   return <p className="mt-16">No results found.</p>;
  // }

  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <TweetCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [page, setPage] = useState(1); // Default page to 1
  const lastElement = useRef();
  const observer = useRef();

  const {
    data = [],
    isLoading,
    isFetching,
    currentData,
  } = useGetTweetsQuery({ limit: 6, page });

  if (isLoading) console.log("Loading...");

  const inputRef = useRef(null);

  useEffect(() => {
    const callback = function (entries) {
      if (entries[0].isIntersecting && !isFetching && data.length === 6) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    observer.current = new IntersectionObserver(callback, { threshold: 1 });
    observer.current.observe(lastElement.current);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isFetching, data]);

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(posts)) {
      setPosts((prevPosts) => [...prevPosts, ...data]);
      setFilteredPosts((prevPosts) => [...prevPosts, ...data]);
      console.log("Call");
      console.log(page);
    }
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

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
      <div className="absolute bottom-0">{currentData ? "" : "loading..."}</div>
      <div ref={lastElement} className="h-5" />

      {/* <div className="w-full flex justify-between pb-4">
        <button onClick={() => handlePageChange(page - 1)}>Previous</button>
        <button onClick={() => handlePageChange(page + 1)}>Next</button>
      </div> */}
    </section>
  );
};

export default Feed;
