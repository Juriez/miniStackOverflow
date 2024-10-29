import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const SinglePost = ({ token }) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    const res = await fetch(`http://localhost:8000/post/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPost(data);
  };

  if (!post) {
    return <p style={{ color: "#fff" }}>Loading...</p>;
  }

  return (
    <div style={{ padding: "16px", backgroundColor: "#2c2c2c", borderRadius: "5px" }}>
      <h2 style={{ color: "#fff", padding: "8px 0" }}>{post.title}</h2>
      <p style={{ marginTop: "8px", color: "#ccc" }}>{post.content}</p>
      {post.codeSnippetUrl && (
        <a
          href={post.codeSnippetUrl}
          style={{ color: "#007bff", textDecoration: "none" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Code Snippet
        </a>
      )}
    </div>
  );
}

SinglePost.propTypes = {
  token: PropTypes.string.isRequired,
};

export default SinglePost;
