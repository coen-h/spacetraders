import React, { useState } from 'react';

export default function Account() {
    const [location, setLocation] = useState('');
    const [system, setSystem] = useState('');
    const [symbol, setSymbol] = useState('');
    const [cords, setCords] = useState('');
    const [faction, setFaction] = useState('');
  
    const fetchLocation = async () => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      };
  
      try {
        const response = await fetch(`https://api.spacetraders.io/v2/systems/${location.substring(0,7)}/waypoints/${location}`, options);
  
        if (response.ok) {
          const data = await response.json();
          setSystem(data.data.systemSymbol);
          setSymbol(data.data.symbol);
          setCords(`${data.data.x}, ${data.data.y}`);
          setFaction(data.data.faction.symbol);
        } else {
          console.error('Invalid token or error fetching data');
        }
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <div>
        <div>
            <h1>Location</h1>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter Location"
            />
            <button onClick={fetchLocation}>Press</button>
        </div>
        <div>
            <p>{system}</p>
            <p>{symbol}</p>
            <p>{cords}</p>
            <p>{faction}</p>
        </div>
    </div>
  );
};