import React from 'react';
import Navbar from '../components/Navbar';
import CloudyCard from '../components/CloudyCard';
import Footer from '../components/Footer';
import Img from '../weather/64x64/day/113.png';
import {LineChart , Line , XAxis , Tooltip } from "recharts";
import "../css/main.css";

export default function main() {
  const data = [
    {name : "23" , react : 32 , angular : 40 , vue :12 },
    {name : "22" , react : 44 , angular : 48 , vue :22 },
    {name : "21" , react : 23 , angular : 50 , vue :55 },
    {name : "20" , react : 11 , angular : 25 , vue :22 }
  ];
  
    // Custom tooltip content
    const CustomTooltip = ({ active, payload, label }) => {
      if (active) {
        return (
          <div className="custom-tooltip">
            <p className="label">{`Hour: ${label}`}</p>
            {payload.map((entry, index) => (
              <p key={index} className="value">{`${entry.name}: ${entry.value}`}</p>
            ))}
          </div>
        );
      }
  
      return null;
    };

  return (
    <div className='appContainer main'>
      <Navbar />
      <div className='flexInline justifyBetween px2'>
        <div className='flexColumn justifyCenter'>
          <span>
            <h1>25&deg;C</h1>
            <h2>Milan , Italy</h2>
          </span>

          <p>26/29&deg; Feels like 30</p>
          <p>Fri ,02:30 am</p>
        </div>

        <img src={Img} alt="" className='mainImg'/>
      </div>
      

      <div className='flexInline justifyBetween px2 my2'>
        <CloudyCard
         p = "Low"
         title = "UV Index"
         emojiTime = "day"
         emojiNo = "113"
        />
        <CloudyCard
         p = "38&deg;"
         title = "Humidity"
         emojiTime = "day"
         emojiNo = "116"
        />
        <CloudyCard
         p = "5 Km/h"
         title = "Wind"
         emojiTime = "day"
         emojiNo = "185"
        />
      </div>

      <h2>Today</h2>
      <div className='my2'>
        graph of 23 hours
        <LineChart width={600} height={300} data={data} >
          <XAxis dataKey="name" />
          <Tooltip content={<CustomTooltip />}  />
          <Line type="monotone" dataKey="react"  stroke="lightblue" strokeWidth = {3}  />
        </LineChart>
      </div>

      <div className='my2 wheelDiv'>
        <CloudyCard />
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
