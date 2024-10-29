import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function NotificationList({ token }) {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, [token]);

  const fetchNotifications = async () => {
    const res = await fetch(`http://localhost:8000/notification`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setNotifications(data);
  };

  const viewPost = (id) => {
    navigate(`/post/${id}`);
  };

  const goToHome = () => {
    navigate(`/`);
  };

  return (
    <div style={{ backgroundColor: "#2c2c2c", padding: "16px", borderRadius: "5px" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px", color: "#fff" }}>Notifications</h2>
      {notifications.length ? (
        notifications.map((notification) => (
          <div key={notification._id} style={{ padding: "16px", marginBottom: "16px", backgroundColor: "#3c3c3c", borderRadius: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ color: "#fff" }}>{notification.message}</p>
            <button
              onClick={() => viewPost(notification.postId)}
              style={{ backgroundColor: "#007bff", color: "#fff", padding: "8px 16px", borderRadius: "5px", border: "none", cursor: "pointer" }}
            >
              View Post
            </button>
          </div>
        ))
      ) : (
        <p style={{ color: "#fff" }}>There are no notifications.</p>
      )}

      <button
        onClick={goToHome}
        style={{ marginTop: "16px", backgroundColor: "#28a745", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer" }}
      >
        Back to Home
      </button>
    </div>
  );
}

NotificationList.propTypes = {
  token: PropTypes.string.isRequired,
};

export default NotificationList;
