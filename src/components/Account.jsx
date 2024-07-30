import React, { useState, useEffect } from 'react';

export default function Account() {
  const [callsign, setCallsign] = useState('');
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegister = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        symbol: callsign,
        faction: "COSMIC",
      }),
    };

    try {
      const response = await fetch('https://api.spacetraders.io/v2/register', options);
      const data = await response.json();
      if (data?.data?.token) {
        localStorage.setItem('authToken', data.data.token);
        console.log('Token saved:', data.data.token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async () => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch('https://api.spacetraders.io/v2/my/agent', options);
      if (response.ok) {
        localStorage.setItem('authToken', token);
        setIsLoggedIn(true);
        console.log('Token is valid and saved:', token);
      } else {
        console.error('Invalid token');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
        const accountStyle = document.getElementById("account");
        accountStyle.style.display = "none";
      }
  })

  return (
    <div id="account" className='absolute w-screen h-screen flex items-center justify-center'>
        <div>
            <h1>Register</h1>
            <input
                type="text"
                value={callsign}
                onChange={(e) => setCallsign(e.target.value)}
                placeholder="Enter Callsign"
            />
            <button onClick={handleRegister}>Register</button>

            <h1>Login</h1>
            <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter Token"
            />
            <button onClick={handleLogin}>Login</button>

            {isLoggedIn && <p>You are logged in!</p>}
        </div>
    </div>
  );
};