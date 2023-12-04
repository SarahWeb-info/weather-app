import React from 'react';
import "../css/intro.css";
import Emo3 from '../weather/64x64/night/182.png';

export default function Intro() {
  return (
    <div className='appContainer intro'>
     <div className='flexColumn introBanner'>
        <img src={Emo3} alt="" srcset=""  />
    </div>
    <div className='flexColumn'>
      <h1>Prepare <span>Yourself</span> for the <span>lastest</span> weather precision by <span>Mosam</span></h1>
    </div>

      <div className='introBtns'>
        <span className='flexColumn'><a href="/app">Set Up</a></span>
        <span className='flexColumn'><a href="/setting">Skip</a>  </span>
      </div>  
    </div>
  )
}
