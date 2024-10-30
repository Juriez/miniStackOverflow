import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const SinglePost = ({ token }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [codeContent, setCodeContent] = useState(null);
  const [visibleCodeSnippet, setVisibleCodeSnippet] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`http://localhost:8000/post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch the post');
      }

      const data = await res.json();
      setPost(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleViewCodeSnippet = async () => {
    if (post && post.codeSnippetUrl) {
      const objectName = post.codeSnippetUrl.split('/').pop();
      try {
        const res = await fetch(`http://localhost:8000/post/code/${objectName}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch the code snippet');
        }

        const code = await res.text();
        setCodeContent(code);
        setVisibleCodeSnippet(!visibleCodeSnippet);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  const formattedDate = new Date(post.createdAt).toLocaleString();

  return (
    <div className="p-4 bg-black rounded shadow">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="mt-2">{post.content}</p>

      {post.codeSnippetUrl && (
        <button
          onClick={handleViewCodeSnippet}
          className="text-blue-500 bg-transparent hover:bg-blue-200 hover:text-blue-700 transition duration-200 ease-in-out py-1 px-2 rounded shadow hover:shadow-lg"
        >
          {visibleCodeSnippet ? "Hide Code Snippet" : "View Code Snippet"}
        </button>
      )}

      {visibleCodeSnippet && codeContent && (
        <pre className="mt-4 p-2 bg-gray-200 border rounded">
          {codeContent}
        </pre>
      )}

      {post.email && (
        <p className="text-green-600 mt-2">Post author: {post.email}</p>
      )}

      <p className="text-blue-600 mt-2">Arrival time: {formattedDate}</p>

      {/* Go to Home button */}
      <button
        onClick={() => navigate('/')}
        className="mt-4 text-white bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out py-2 px-4 rounded shadow hover:shadow-lg"
      >
        Go to Home
      </button>
    </div>
  );
};

SinglePost.propTypes = {
  token: PropTypes.string.isRequired,
};

export default SinglePost;
