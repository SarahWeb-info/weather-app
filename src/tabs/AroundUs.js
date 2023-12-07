import React from 'react';
import CloudyCard from '../components/CloudyCard';

export default function AroundUs() {
  return (
    <div>
      <h1>Weather Around Us</h1>

      <input type="text" placeholder='Search your city' />
      {/* if something saved in the favourite list then show / else show default places */}
      <CloudyCard />
      <CloudyCard />
      <CloudyCard />
      <CloudyCard />
      <CloudyCard />

    </div>
  )
}
