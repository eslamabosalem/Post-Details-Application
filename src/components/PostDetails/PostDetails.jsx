import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { postContext } from "../../context/PostContextProvider";


export default function PostDetails() {
  const { id } = useParams();  
  const { getPostDetails, getAllComments } = useContext(postContext);  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [specificComments, setSpecificComments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();  

  useEffect(() => {
    async function fetchPostData() {
      const postData = await getPostDetails(id);
      if (postData.error) {
        console.error(postData.message);
      } else {
        setPost(postData);
      }
    }
    async function fetchComments() {
      const commentsData = await getAllComments();
      // تحقق من نوع البيانات التي تم جلبها
      if (Array.isArray(commentsData)) {
        setComments(commentsData);
      } else {
        console.error("Received comments data is not an array:", commentsData);
      }
    }
    fetchPostData();
    fetchComments();
  }, [id, getPostDetails, getAllComments]);

 
  function filterByTitle(x) {
    if (!x) {
      setSpecificComments(comments);
      return;
    }
    const filteredComments = comments.filter((comment) =>
      comment.body.toLowerCase().includes(x.toLowerCase())
    );
    setSpecificComments(filteredComments);
  }

  useEffect(() => {
    // تحقق من أن `comments` هو مصفوفة قبل تصفيتها
    if (Array.isArray(comments)) {
      setSpecificComments(comments.filter((comment) => comment.postId === Number(id))); 
    }
  }, [id, comments]); 

  if (!post) return <div>Loading...</div>; 

  return (
    <div className="post-details">
      <h2>{post.title}</h2>
      <p>{post.body}</p>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search comments..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            filterByTitle(e.target.value);
          }}
        />
      </div>

      <button onClick={() => navigate(-1)}>Back</button>

      {specificComments.length > 0 && specificComments.map((comment) => (
        <div key={comment.id}>
          <h3>{comment.email}</h3>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
}
