import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Auth.css';

function Auth({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
    setEmailError(''); // Clear error when switching between Sign Up and Sign In
  }, [isSignUp]);

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');

    const res = await fetch('http://localhost:8000/signup', {
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
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');

    const res = await fetch('http://localhost:8000/signIn', {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 welcome-text text-gray-800">
        Hello! Join our platform miniStackOverflow
      </h1>
      <div className="mb-4">
        <button
          onClick={() => setIsSignUp(true)}
          className={`py-2 px-4 rounded ${isSignUp ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'}`}
        >
          Register
        </button>
        <button
          onClick={() => setIsSignUp(false)}
          className={`py-2 px-4 rounded ${!isSignUp ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'}`}
        >
          Login
        </button>
      </div>
      <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'} bg-white p-6 rounded shadow-md`}>
        <input
          type="email"
          placeholder="Email"
          className="block w-full p-2 mb-2 border rounded"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError(''); // Clear error on re-type
          }}
        />
        {emailError && <p className="text-red-500 text-sm mb-2">{emailError}</p>}
        <input
          type="password"
          placeholder="Password"
          className="block w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp ? (
          <button
            onClick={handleSignUp}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mb-2"
          >
            Register
          </button>
        ) : (
          <button
            onClick={handleSignIn}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

Auth.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Auth;
