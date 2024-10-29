import { useState } from "react";
import Auth from "./components/Auth";
import PostList from "./components/PostList";
import SinglePost from "./components/SinglePost";
import NotificationList from "./components/NotificationList";
import Profile from "./components/Profile"; // Import Profile component
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [token, setToken] = useState(null);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/r.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: "4rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Darker overlay for better contrast
          zIndex: -1,
        }}
      />
      <BrowserRouter>
        {!token ? (
          <Auth setToken={setToken} />
        ) : (
          <div style={{ width: "100%", maxWidth: "800px", color: "#ffffff" }}> {/* Set text color to white */}
            <header
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
                Welcome to miniStackOverflow
              </h1>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Link
                  to="/notifications"
                  style={{
                    fontSize: "1.5rem",
                    color: "#ffffff", // Adjust link color
                    textDecoration: "none",
                    transition: "transform 0.2s ease, color 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.4)";
                    e.currentTarget.style.color = "#e86005"; // Change color on hover
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.color = "#ffffff"; // Reset color
                  }}
                >
                  <FontAwesomeIcon icon={faBell} />
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.25rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
            </header>
            <Routes>
              <Route path="/" element={<PostList token={token} />} />
              <Route path="/post/:postId" element={<SinglePost token={token} />} />
              <Route path="/notifications" element={<NotificationList token={token} />} />
              {/* <Route path="/profile" element={<Profile token={token} />} /> */}
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
