// import React  from 'react';
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import CloudyCard from '../components/CloudyCard';
import Footer from '../components/Footer';
import {LineChart , Line , XAxis , Tooltip } from "recharts";
import "../css/main.css";

import getRequest from '../backend/getRequest';
import {dayData} from "../backend/formatData";

export default function Main() {
  
  let location = localStorage.getItem('weatherLocation') || "Dubai" ;
  let today ;
  let tmpDegreeFormat = "C";
  let storageDegreeFormat = localStorage.getItem('weatherDegree') || 1 ;
  let tmphourlyFormat;

  if (storageDegreeFormat == 1) {
    tmpDegreeFormat = "C";
  }else{
    tmpDegreeFormat = "F";
  }

  let dateObj = new Date();
  // Create variables for the next five days
  let fulldate3 = new Date(dateObj) ;
  fulldate3.setDate(dateObj.getDate() + 2);
  let day3 = fulldate3.toLocaleDateString('en-US', { weekday: 'short' }); 

  let fulldate4 = new Date(dateObj);
  fulldate4.setDate(dateObj.getDate() + 3);
  let date4 = fulldate4.toISOString().split('T')[0];
  let day4 = fulldate4.toLocaleDateString('en-US', { weekday: 'short' }); 
  
  let fulldate5 = new Date(dateObj);
  fulldate5.setDate(dateObj.getDate() + 4);
  let date5 = fulldate5.toISOString().split('T')[0];
  let day5 = fulldate5.toLocaleDateString('en-US', { weekday: 'short' }); 
  
  let fulldate6 = new Date(dateObj);
  fulldate6.setDate(dateObj.getDate() + 5);
  let date6 = fulldate6.toISOString().split('T')[0];
  let day6 = fulldate6.toLocaleDateString('en-US', { weekday: 'short' }); 

  let day2Weather ;
  let day3Weather ;
  let day4Weather ;
  let day5Weather ;
  let day6Weather ;

  useEffect(() => {    
    let currDate = getRequest(location , 3);  
    today = dayData(currDate , storageDegreeFormat);
    
    day2Weather = dayData(today.forecast.forecastday[1] , storageDegreeFormat);
    day3Weather = dayData(today.forecast.forecastday[2] , storageDegreeFormat);

    let forcastData4 = getRequest(location , 0 , date4 );
    let forcastData5 = getRequest(location , 0 , date5 );
    let forcastData6 = getRequest(location , 0 , date6 );
    
    day4Weather = dayData(forcastData4 , storageDegreeFormat);
    day5Weather = dayData(forcastData5 , storageDegreeFormat);
    day6Weather = dayData(forcastData6 , storageDegreeFormat);

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
            <h1>{today.tempDeg}{tmpDegreeFormat}</h1>
            <h2>{today.city}, {today.country}</h2>
          </span>

          <p>{today.hightempDeg}/{today.lowtempDeg} {tmpDegreeFormat}; Feels like {today.feelsLike}</p>
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
        <CloudyCard
          degree = {today.tempDeg}
          linkStr = {today.condition}
          title = "Today"
          icon = {today.iconUrl}
          />

        <CloudyCard
          degree = {day2Weather.avgtmpDeg}
          linkStr = {day2Weather.nextCondition}
          title = "Tomorrow"
          icon = {day2Weather.nextIconUrl}
        />  
  
        <CloudyCard
          degree = {day3Weather.avgtmpDeg}
          linkStr = {day3Weather.nextCondition}
          title = {day3}
          icon = {day3Weather.nextIconUrl}
          />  


        <CloudyCard
          degree = {day4Weather.avgtmpDeg}
          linkStr = {day4Weather.nextCondition}
          title = {day4}
          icon = {day4Weather.nextIconUrl}
          />  

        <CloudyCard
          degree = {day5Weather.avgtmpDeg}
          linkStr = {day5Weather.nextCondition}
          title = {day5}
          icon = {day5Weather.nextIconUrl}
          />

        <CloudyCard
          degree = {day6Weather.avgtmpDeg}
          linkStr = {day6Weather.nextCondition}
          title = {day6}
          icon = {day6Weather.nextIconUrl}
          />

      </div>

      <Footer />
    </div>
  )
}
