import React, { useState ,useEffect } from 'react';
import Navbar from '../components/Navbar';
import CloudyCard from '../components/CloudyCard';
import Footer from '../components/Footer';
import {LineChart , Line , XAxis , Tooltip } from "recharts";
import "../css/main.css";

import getRequest from '../backend/getRequest';
import { dayData , forecastFunc } from "../backend/formatData";

export default function Main() {
  const [loading, setLoading] = useState(true);
    
  let location = localStorage.getItem('weatherLocation') || "Dubai" ;
  
  let storageDegreeFormat = localStorage.getItem('weatherDegree') ;
  let tmpDegreeFormat = "°F";

  if (storageDegreeFormat === "1") {
    tmpDegreeFormat = "°C";
  }

  let dateObj = new Date();
  // Create variables for the next five days
  let fulldate3 = new Date(dateObj) ;
  fulldate3.setDate(dateObj.getDate() + 2);

  let fulldate4 = new Date(dateObj);
  fulldate4.setDate(dateObj.getDate() + 3);
  let date4 = fulldate4.toISOString().split('T')[0];
  
  let fulldate5 = new Date(dateObj);
  fulldate5.setDate(dateObj.getDate() + 4);
  let date5 = fulldate5.toISOString().split('T')[0];
  
  let fulldate6 = new Date(dateObj);
  fulldate6.setDate(dateObj.getDate() + 5);
  let date6 = fulldate6.toISOString().split('T')[0];

  const [ days3Formatted , setDays3Formatted] = useState();
  const [ day4Formatted , setDay4Formatted] = useState();
  const [ day5Formatted , setDay5Formatted] = useState();
  const [ day6Formatted , setDay6Formatted] = useState();
  const [ houlryGraphData , setHoulryGraphData] = useState();
  
  useEffect(() => {    
    const fetchData = async () => {
      try {
        let days3Data = await getRequest(location);

        setDays3Formatted(dayData(days3Data));
        
        let day4Data = await getRequest(location , date4);
        let day5Data = await getRequest(location , date5);
        let day6Data = await getRequest(location , date6);

        setDay4Formatted(forecastFunc(day4Data.forecast.forecastday[0] , storageDegreeFormat));
        setDay5Formatted(forecastFunc(day5Data.forecast.forecastday[0] , storageDegreeFormat));
        setDay6Formatted(forecastFunc(day6Data.forecast.forecastday[0] , storageDegreeFormat));
      }
      catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);

      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // This useEffect runs when days3Formatted is updated
    if (days3Formatted) {
      let hourlyTmp = days3Formatted.forecastObj1.hourlyTmp;
      let someArr = [];
      for (let i in hourlyTmp) {
        if (i < 13) {
          someArr.push({ name: `${i} am`, tmp: hourlyTmp[i] });
        } else {
          someArr.push({ name: `${i - 12} pm`, tmp: hourlyTmp[i] });
        }
      }
      setHoulryGraphData(someArr);
    }
  }, [days3Formatted]);

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
      {loading ? (
        <p>Loading...</p>
      ) : (days3Formatted && 
        <>
      <div className='flexInline justifyBetween px2'>
        <div className='flexColumn justifyCenter'>
          <span>    
            <h1>{days3Formatted.tempDeg}{tmpDegreeFormat}</h1>
            <h2>{days3Formatted.city}, {days3Formatted.country}</h2>
          </span>

          <p>{days3Formatted.forecastObj1.hightempDeg}/{days3Formatted.forecastObj1.lowtempDeg} {tmpDegreeFormat}; Feels like {days3Formatted.feelsLike}</p>
          <p>{days3Formatted.forecastObj1.dayOfWeek} , {days3Formatted.time} </p>
        </div>

        <img src={days3Formatted.iconUrl} alt="" className='mainImg'/>
      </div>
      
      <div className='flexInline justifyBetween my2'>
        <CloudyCard
         p = {days3Formatted.uv}
         title = "UV Index"
         icon = "https://cdn.weatherapi.com/weather/64x64/day/113.png"
        />

        <CloudyCard
         p = {days3Formatted.humidity}
         title = "Humidity"
         icon = "https://cdn.weatherapi.com/weather/64x64/day/116.png"
         />

      <CloudyCard
         p = {days3Formatted.wind}
         title = "Wind"
         icon = "https://cdn.weatherapi.com/weather/64x64/day/122.png"
         />
      </div>
      
      <h2 className='px2'>Houry Temperature</h2>  

      <div className='wheelDiv my2'style={{fontSize : '0.8rem' }} >
        <LineChart width={1500} height={250} data={houlryGraphData} >
          <XAxis dataKey="name" />
          <Tooltip content={<CustomTooltip />}  />
          <Line type="monotone" dataKey="tmp"  stroke="lightblue" strokeWidth = {3}  />
        </LineChart>
      </div>  

      <h2 className='px2'>Forcast</h2>  

         <div className='wheelDiv my2 flexInline alignCenter daysCloud' >
         <CloudyCard
           degree = {days3Formatted.tempDeg}
           linkStr = {days3Formatted.condition}
           title = "Today"
           icon = {days3Formatted.iconUrl}
           />
         <CloudyCard
           degree = {days3Formatted.forecastObj2.avgtmpDeg}
           linkStr = {days3Formatted.forecastObj2.nextCondition}
           title = "Tomorrow"
           icon = {days3Formatted.forecastObj2.nextIconUrl}
         />  
  
         <CloudyCard
           degree = {days3Formatted.forecastObj3.avgtmpDeg}
           linkStr = {days3Formatted.forecastObj3.nextCondition}
           title = {days3Formatted.forecastObj3.dayOfWeek}
           icon = {days3Formatted.forecastObj3.nextIconUrl}
           />  

         <CloudyCard
           degree = {day4Formatted.avgtmpDeg}
           linkStr = {day4Formatted.nextCondition}
           title = {day4Formatted.dayOfWeek}
           icon = {day4Formatted.nextIconUrl}
           />  

         <CloudyCard
           degree = {day5Formatted.avgtmpDeg}
           linkStr = {day5Formatted.nextCondition}
           title = {day5Formatted.dayOfWeek}
           icon = {day5Formatted.nextIconUrl}
           />

         <CloudyCard
           degree = {day6Formatted.avgtmpDeg}
           linkStr = {day6Formatted.nextCondition}
           title = {day6Formatted.dayOfWeek}
           icon = {day6Formatted.nextIconUrl}
           />

       </div>

      </>)}
      <Footer />
    </div>
  )
}
