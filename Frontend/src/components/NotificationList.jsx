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
    const res = await fetch('http://localhost:8000/notification', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setNotifications(data);
  };

  const viewPost = (id) => {
    navigate(`/post/${id}`);
  };

  // Sort notifications by 'createdAt' to show recent notifications first
  const sortedNotifications = notifications
    .slice() // Create a shallow copy to avoid mutating the original array
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Most recent first

  const notificationContainerStyle = {
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#f2f4d0', // White background
    borderRadius: '0.5rem', // Rounded corners
    boxShadow: '0 2px 5px rgba(46, 46, 46, 0.1)', // Shadow effect
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background-color 0.3s',
  };

  const notificationButtonStyle = {
    backgroundColor: '#402ad1', // Tailwind's blue-500
    color: '#ffffff', // White text
    padding: '0.5rem 1rem', // Padding
    borderRadius: '0.25rem', // Rounded corners
    cursor: 'pointer',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  };

  const hoverButtonStyle = {
    ...notificationButtonStyle,
    backgroundColor: '#6693f4', // Tailwind's blue-600
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Shadow effect on hover
  };

  const goToHomeButtonStyle = {
    ...notificationButtonStyle,
    marginTop: '1rem',
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {sortedNotifications.length ? (
        sortedNotifications.map(notification => (
          <div
            key={notification._id}
            style={notificationContainerStyle}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')} // Gray-100 on hover
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f2f4d0')} // Reset background
          >
            <p style={{ marginRight: '1rem' }}>{notification.message}</p>
            <p style={{ marginRight: '1rem', color: 'rgb(157, 135, 157)' }}>
              <i>Post author: {notification.email}</i>
            </p>
            <p style={{ marginRight: '1rem', color: 'rgb(157, 135, 157)' }}>
              <i>Arrival time: {notification.createdAt}</i>
            </p>
            <button
              onClick={() => viewPost(notification.postId)} // Redirect to the post
              style={notificationButtonStyle}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverButtonStyle.backgroundColor)} // Change color on hover
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = notificationButtonStyle.backgroundColor)} // Reset color
            >
              View Post
            </button>
          </div>
        ))
      ) : (
        <p>There are no notifications.</p>
      )}
      <button
        onClick={() => navigate('/')} // Redirect to home
        style={goToHomeButtonStyle}
      >
        Go to Home
      </button>
    </div>
  );
}

NotificationList.propTypes = {
  token: PropTypes.string.isRequired,
};

export default NotificationList;
