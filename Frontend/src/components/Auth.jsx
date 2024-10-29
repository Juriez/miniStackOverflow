import { useState } from 'react';
import PropTypes from 'prop-types';

function Auth({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email) => {
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const res = await fetch(`http://localhost:8000/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert('Signup successful');
    } else {
      const errorData = await res.json();
      alert(errorData.message);
    }
  };

  const handleSignIn = async () => {
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const res = await fetch(`http://localhost:8000/signIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setToken(data.token);
    } else {
      const errorData = await res.json();
      alert(errorData.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#1a1a1a", color: "#f5f5f5" }}>
      <h1 style={{ color: "#f5f5f5", marginBottom: "24px", fontSize: "2em", fontWeight: "bold" }}>Hello! Join Our Platform, miniStackOverflow</h1>
      
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <input
          type="email"
          placeholder="Email"
          style={{ width: "100%", padding: "10px", marginBottom: "8px", borderRadius: "5px", border: "1px solid #ccc", color: "#000" }}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", padding: "10px", marginBottom: "16px", borderRadius: "5px", border: "1px solid #ccc", color: "#000" }}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignUp}
          style={{ width: "100%", backgroundColor: "#007bff", color: "#fff", padding: "10px", borderRadius: "5px", marginBottom: "8px", border: "none", cursor: "pointer" }}
        >
          Register
        </button>
        <button
          onClick={handleSignIn}
          style={{ width: "100%", backgroundColor: "#28a745", color: "#fff", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer" }}
        >
         Login
        </button>
      </div>
    </div>
  );
}

Auth.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Auth;
