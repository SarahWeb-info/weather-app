import React from 'react';
import "../css/intro.css";
import "../css/shakeAnim.css";
import "../css/bounseAnim.css";
import Emo1 from '../weather/64x64/night/113.png';
import Emo2 from '../weather/64x64/day/119.png';
import Emo3 from '../weather/64x64/night/182.png';

export default function Intro() {
  return (
    <div className='appContainer intro'>
     <div className='introBanner'>
      <div className='flexInline'>
        <img src={Emo1} alt="" srcset="" />
        <img src={Emo2} alt="" srcset="" />
      </div>
        
      <div className='flexColumn'>
        <img src={Emo3} alt="" srcset="" className='shake' />
      </div>
      
      <div className='flexInline'>
        <img src={Emo2} alt="" srcset="" className='bounce'/>
        <img src={Emo1} alt="" srcset="" />
      </div>

    </div>
    <div className='flexColumn'>
      <h1>Prepare <span>Yourself</span> for the <span>lastest</span> weather precision by <span>Mosam</span></h1>
    </div>

      <div className='introBtns'>
        <span className='flexColumn'><a href="http://">Set Up</a></span>
        <span className='flexColumn'><a href="http://">Skip</a>  </span>
      </div>  
    </div>
  )
}
