import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../post/Post";
import "./home.css";
import { NavLink } from "react-router-dom";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://reportforisrael.onrender.com/api/posts");
        const shuffledPosts = shuffleArray(response.data);
        setPosts(shuffledPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  const goToNextPost = () => {
    setCurrentPostIndex((prevIndex) =>
      prevIndex + 1 < posts.length ? prevIndex + 1 : prevIndex
    );
  };

  const goToPreviousPost = () => {
    setCurrentPostIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : prevIndex
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white rounded-lg shadow-lg my-10 font-inter">
      <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">
        Does this Post look Antisemitic, or contains hate content?{" "}
        <a
          href={posts[currentPostIndex]?.postLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
        >
          Report this post on Facebook
        </a>
      </h2>
      <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">
        Don't know how?{" "}
        <NavLink
          to='/howto'
          className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
        >
          Head to our guide
        </NavLink>
      </h2>
      {posts.length > 0 && currentPostIndex < posts.length && (
        <div className="flex flex-col items-center">
          <div className="flex mb-4 w-full justify-evenly">
            <button
              disabled={currentPostIndex <= 0}
              onClick={goToPreviousPost}
              className="btn btn-prev disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous Post
            </button>
            <button
              disabled={currentPostIndex >= posts.length - 1}
              onClick={goToNextPost}
              className="btn btn-next disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Post
            </button>
          </div>
          <div className="post-container w-full h-auto flex justify-center items-center">
            <Post {...posts[currentPostIndex]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
