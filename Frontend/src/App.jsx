import { useState } from "react";
import Auth from "./components/Auth";
import PostList from "./components/PostList";
import SinglePost from "./components/SinglePost";
import NotificationList from "./components/NotificationList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  const [token, setToken] = useState(null); // Token for authenticated user

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1a1a1a", color: "#f5f5f5", padding: "16px" }}>
      <BrowserRouter>
        {!token ? (
          <Auth setToken={setToken} />
        ) : (
          <div style={{ margin: "0 auto", maxWidth: "800px" }}>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Welcome to the Mini StackOverflow</h1>
              <div style={{ display: "flex", gap: "8px" }}>
                <Link style={{ fontWeight: "bold", backgroundColor: "#000", color: "#fff", borderRadius: "5px", padding: "8px" }} to="/notifications">
                  Notification
                </Link>
                <button
                  onClick={handleLogout}
                  style={{ backgroundColor: "#e63946", color: "#fff", padding: "8px 16px", borderRadius: "5px", border: "none", cursor: "pointer" }}
                >
                  Logout
                </button>
              </div>
            </header>
            <Routes>
              <Route path="/" element={<PostList token={token} />} />
              <Route path="/post/:postId" element={<SinglePost token={token} />} />
              <Route path="/notifications" element={<NotificationList token={token} />} />
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
