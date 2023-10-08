"use client";
import { useState, useEffect, useRef } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick, filter }) => {
  if (data.length === 0) {
    return <p className="mt-16">Loading...</p>;
  }

  if (filter.length === 0) {
    return <p className="mt-16">No results found.</p>;
  }

  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setFilteredPosts(data);
      setPosts(data);
    };
    fetchPosts();
  }, []);

  console.log(posts);

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);

    const filtered = posts.filter((post) => {
      if (typeof post.tag === "string") {
        return (
          post.tag.includes(text) ||
          post.creator.username.includes(text) ||
          post.prompt.includes(text)
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
      <PromptCardList
        data={filteredPosts.length > 0 ? filteredPosts : posts}
        filter={filteredPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
