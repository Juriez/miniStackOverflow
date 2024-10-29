import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function PostList({ token }) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [showingUserPosts, setShowingUserPosts] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const fetchPosts = async () => {
    const res = await fetch(`http://localhost:8000/post`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPosts(data);
    setShowingUserPosts(false);
  };

  const fetchUserPosts = async () => {
    const res = await fetch(`http://localhost:8000/mypost`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPosts(data);
    setShowingUserPosts(true);
  };

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (file) {
      formData.append('codeSnippet', file);
    }

    const res = await fetch(`http://localhost:8000/post`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      setTitle('');
      setContent('');
      setFile(null);
      alert("Post created successfully");
      fetchPosts();
    } else {
      alert('Error creating post');
    }
  };

  return (
    <div style={{ backgroundColor: "#1a1a1a", color: "#f5f5f5", padding: "16px", borderRadius: "5px" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Create a Post</h2>
        <button
          onClick={showingUserPosts ? fetchPosts : fetchUserPosts}
          style={{ backgroundColor: '#007bff', color: '#fff', padding: '8px 16px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
        >
          {showingUserPosts ? "View Posts by Others" : "View My Posts"}
        </button>
      </div>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        style={{ width: "100%", padding: "10px", marginBottom: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Content"
        style={{ width: "100%", padding: "10px", marginBottom: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
        style={{ width: "100%", padding: "10px", marginBottom: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <button
        onClick={handleCreatePost}
        style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
      >
        Create Post
      </button>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginTop: '24px' }}>
        {showingUserPosts ? "My Posts" : "Posts by Others"}
      </h2>
      {posts.length ? (
        posts.map(post => (
          <div key={post._id} style={{ padding: "16px", marginBottom: "16px", backgroundColor: "#2c2c2c", borderRadius: "5px" }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff' }}>{post.title}</h3>
            <p style={{ color: '#ccc' }}>{post.content}</p>
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
        ))
      ) : (
        <p style={{ color: '#fff' }}>No posts available.</p>
      )}
    </div>
  );
}

PostList.propTypes = {
  token: PropTypes.string.isRequired,
};

export default PostList;
