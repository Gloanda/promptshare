"use client";

import { useDebouncedCallback } from "use-debounce";

import { useEffect, useState } from "react";

import PromptCard from "@/components/prompt-cardt";

function PromptCardList({ data, handleTagClick }) {
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
}

function Feed() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  async function fetchPosts() {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setPosts(data);
    setFilteredPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    const filteredPosts = posts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    );
    return filteredPosts;
  };

  const handleSearchChange = useDebouncedCallback((text: string) => {
    const searchResult = filterPrompts(text);
    setFilteredPosts(searchResult);
  }, 500);

  const handleTagClick = (e) => {};

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or username"
          onChange={(e) => {
            handleSearchChange(e.target.value);
          }}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={filteredPosts}
        handleTagClick={handleTagClick}
      ></PromptCardList>
    </section>
  );
}

export default Feed;
