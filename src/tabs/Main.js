// import React  from 'react';
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import CloudyCard from '../components/CloudyCard';
import Footer from '../components/Footer';
import {LineChart , Line , XAxis , Tooltip } from "recharts";
import "../css/main.css";

import today from "../backend/GetToday";

export default function Main() {

  let tmpDegreeFormat = "°C";
  let tmphourlyFormat = today.hourlyTmpC;

  useEffect(() => {
      let location = 'Lahore';
      let today = new Date();

      // Create variables for the next five days
      let fulldate3 = new Date(today);
      fulldate3.setDate(today.getDate() + 3);
      let date4 = fulldate3.toISOString().split('T')[0];

      let fulldate4 = new Date(today);
      fulldate4.setDate(today.getDate() + 4);
      let date5 = fulldate3.toISOString().split('T')[0];

      let fulldate5 = new Date(today);
      fulldate5.setDate(today.getDate() + 5);
      let date6 = fulldate3.toISOString().split('T')[0];

    //   const fetchData = async () => {
   
    //     try {
    //     let apikey = process.env.REACT_APP_APIKEY;

    //     const url1 = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&days=3`;
    //     const url2 = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&dt=${date4}`;
    //     const url3 = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&dt=${date5}`;
    //     const url4 = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&dt=${date6}`;

    //     const options = {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'X-RapidAPI-Key': `${apikey}`,
    //         'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'       
    //       },
    //     };

    //     const [response1, response2 , response3 , response4 ] = await Promise.all([
    //       fetch(url1, options),
    //       fetch(url2, options),
    //       fetch(url3, options),
    //       fetch(url4, options),
    //     ]);

    //     const result1 = await response1.json();
    //     const result2 = await response2.json();
    //     const result3 = await response3.json();
    //     const result4 = await response4.json();

    //     console.log('Data from API 1:', result1);
    //     console.log('Data from API 2:', result2);
    //     console.log('Data from API 3:', result3);
    //     console.log('Data from API 4:', result4);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

    // fetchData();
  }, []); 

  let houlryGraphData = [];
  for (let i in tmphourlyFormat){
    if(i < 13){
      houlryGraphData.push({ name : `${i} am` , tmp : tmphourlyFormat[i]});
    }else {
      houlryGraphData.push({ name : `${i-12} pm` , tmp : tmphourlyFormat[i]});
    }
  }

    // Custom tooltip content
    const CustomTooltip = ({ active, payload }) => {
      if (active) {
        return (
          <div className="custom-tooltip">
            {payload.map((entry, index) => (
              <p key={index} className="value" style={{ fontSize: '10px'}}>{`${entry.value}${tmpDegreeFormat}`}</p>
            ))}
          </div>
        );
      }
  
      return null;
    };

  return (
    <div className='appContainer appBg'>
      <Navbar />
      <div className='flexInline justifyBetween px2'>
        <div className='flexColumn justifyCenter'>
          <span>
            <h1>{today.tempDegC}{tmpDegreeFormat}</h1>
            <h2>{today.city}, {today.country}</h2>
          </span>

          <p>{today.hightempDegC}/{today.lowtempDegC} {tmpDegreeFormat}; Feels like {today.feelsLikeC}</p>
          <p>{today.dayOfWeek} , {today.time} </p>
        </div>

        <img src={today.iconUrl} alt="" className='mainImg'/>
      </div>
      

      <div className='flexInline justifyBetween my2'>
        <CloudyCard
         p = {today.uv}
         title = "UV Index"
         icon = "https://cdn.weatherapi.com/weather/64x64/day/113.png"
        />
        <CloudyCard
         p = {today.humidity}
         title = "Humidity"
         icon = "https://cdn.weatherapi.com/weather/64x64/day/116.png"
        />
        <CloudyCard
         p = {today.wind}
         title = "Wind"
         icon = "https://cdn.weatherapi.com/weather/64x64/day/122.png"
        />
      </div>

      <h2 className='px2'>Today</h2>
      <div className='wheelDiv my2'style={{fontSize : '0.8rem' }} >
        <LineChart width={1500} height={250} data={houlryGraphData} >
          <XAxis dataKey="name" />
          <Tooltip content={<CustomTooltip />}  />
          <Line type="monotone" dataKey="tmp"  stroke="lightblue" strokeWidth = {3}  />
        </LineChart>
      </div>

      <div className='wheelDiv my2 flexInline alignCenter daysCloud' >
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
