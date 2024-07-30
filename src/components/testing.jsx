import React, { useState, useEffect } from 'react';

export default function Account() {
    const fetchLocation = async () => {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      };
  
      try {
        const response = await fetch(`https://api.spacetraders.io/v2/systems`, options);
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          console.log("ok")
        } else {
          console.error('Invalid token or error fetching data');
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchLocation();

  return (
    <p>testing</p>
  );
};