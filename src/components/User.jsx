import { useState, useEffect } from 'react'

export default function User() {
    const [symbol, setSymbol] = useState('');
    const [credits, setCredits] = useState('');
    const [faction, setFaction] = useState('');
    const [head, setHead] = useState('');

    const fetchUser = async () => {
        const options = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        };
    
        try {
          const response = await fetch('https://api.spacetraders.io/v2/my/agent', options);
          const data = await response.json();
          if (response.ok) {
            setSymbol(data.data.symbol);
            setCredits(data.data.credits);
            setFaction(data.data.startingFaction);
            setHead(data.data.headquarters);
          } else {
            console.error('Invalid token');
          }
        } catch (err) {
          console.error(err);
        }
    };

    useEffect(() => {
      if (localStorage.getItem('authToken')) {
        fetchUser();
      }
    })

    return (
      <div className='flex items-center justify-center flex-col p-2 rounded-lg border gap-2 h-min m-2 border-gray-400'>
        <div className='flex gap-4'>
          <p>{symbol}</p>
          <p>{credits}</p>
        </div>
        <div className='flex gap-4'>
          <p>{faction}</p>
          <p>{head}</p>
        </div>
      </div>
    )
}