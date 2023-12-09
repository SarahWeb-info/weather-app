import React from 'react';
import "../css/intro.css";

export default function Intro() {
  return (
    <div className='appContainer flexColumn alignCenter intro'>
     <div className=' flexColumn alignCenter justifyCenter introBanner'>
        <img src="https://cdn.weatherapi.com/weather/64x64/day/182.png" alt=""  />
    </div>
    <div className=' flexColumn alignCenter '>
      <h1>Prepare <span>Yourself</span> for the <span>lastest</span> weather precision by <span>Mosam</span></h1>
    </div>

      <div className='flexInline justifyAround introBtns'>
        <span className='flexColumn alignCenter justifyCenter'><a href="/setting">Set Up</a>  </span>
        <span className='flexColumn alignCenter justifyCenter'><a href="/app">Skip</a></span>
      </div>  
    </div>
  )
}
