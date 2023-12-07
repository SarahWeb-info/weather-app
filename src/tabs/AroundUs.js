import React from 'react';
import Navbar from '../components/Navbar';
import CloudyCard from '../components/CloudyCard';
import Footer from '../components/Footer';

export default function AroundUs() {
  return (
    <div className='appContainer appBg'>
      <Navbar />
      <h1 className='px2 '>Weather Around Us</h1>

      <span className='px2 '>
        <input type="text" placeholder='Search your city' className='my2'/>
      </span>
        {/* if something saved in the favourite list then show / else show default places */}
        <div className='flexColumn alignCenter'>
          <CloudyCard />
          <CloudyCard />
          <CloudyCard />
          <CloudyCard />
          <CloudyCard />
        </div>
        
    <Footer />
    </div>
  )
}
