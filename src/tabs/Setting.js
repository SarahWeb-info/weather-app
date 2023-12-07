import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Setting() {
  return (
    <div className='appContainer appBg'>
      <Navbar />
      <h1>Personalize Mosam</h1>
      
      <div className='settingForm px2'>
        <span>
          <input type="text" placeholder='Enter Location'/>
        </span>
          <small>Auto Location ? </small>

        <span  className='my2'>
          <input type="checkbox" name="" id="" />
          <label htmlFor="" className='px2'>C/F</label>
        </span>

          <p htmlFor="" className='my2'><b>Nofications : </b></p>
        <span>
          <input type="checkbox" name="" id="" />
          <label htmlFor="" className='px2'>Get notification of daily changing Weather</label>
        </span>

        <span>  
          <input type="checkbox" name="" id="" />
          <label htmlFor=""  className='px2'>Get notification of extreme temp</label>
        </span>

        <span>  
          <input type="checkbox" name="" id="" />
          <label htmlFor="" className='px2'>Get notifications of App updates and new features</label>
        </span>

      </div>
      
      <Footer />
    </div>
  )
}
