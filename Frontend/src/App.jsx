import { useState } from "react";
import Auth from "./components/Auth";
import PostList from "./components/PostList";
import SinglePost from "./components/SinglePost";
import NotificationList from "./components/NotificationList";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

// Styled components
const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #f5f5f5;
  padding: 16px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const NavContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const NavLink = styled(Link)`
  font-weight: bold;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  padding: 8px;
  text-decoration: none;
  &:hover {
    background-color: #333;
  }
`;

const LogoutButton = styled.button`
  background-color: #e63946;
  color: #fff;
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #d62839;
  }
`;

function App() {
  const [token, setToken] = useState(null); 

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <AppContainer>
      <BrowserRouter>
        {!token ? (
          <Auth setToken={setToken} />
        ) : (
          <div style={{ margin: "0 auto", maxWidth: "800px" }}>
            <Header>
              <Title>Welcome to the Mini StackOverflow</Title>
              <NavContainer>
                <NavLink to="/notifications">Notification</NavLink>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
              </NavContainer>
            </Header>
            <Routes>
              <Route path="/" element={<PostList token={token} />} />
              <Route path="/post/:postId" element={<SinglePost token={token} />} />
              <Route path="/notifications" element={<NotificationList token={token} />} />
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
