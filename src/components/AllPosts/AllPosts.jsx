import React, { useContext, useState, useEffect } from "react";
import { postContext } from "../../context/PostContextProvider"; 
import { Link } from "react-router-dom"; 
import { motion } from "framer-motion";

export default function AllPosts() {
  const { getAllPosts } = useContext(postContext);  
  const [posts, setPosts] = useState([]);
  const [copyPosts, setCopyPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    async function fetchPosts() {
      const postsData = await getAllPosts();
      if (postsData.error) {
        console.error(postsData.message);
      } else {
        setPosts(postsData);
        setCopyPosts(postsData);
        setTotalPosts(postsData.length);
      }
    }
    fetchPosts();
  }, [getAllPosts]);

  function filterByTitle(x) {
    if (!x) {
      setCopyPosts(posts);
      setTotalPosts(posts.length);
      return;
    }
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(x.toLowerCase())
    );
    setCopyPosts(filteredPosts);
    setTotalPosts(filteredPosts.length);
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = copyPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="search-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search posts by title"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            filterByTitle(e.target.value);
          }}
        />
      </div>

      <div className="posts">
        {currentPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <div className="post-preview">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            
              <Link to={`/post/${post.id}`}>Read More</Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}
