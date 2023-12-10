import React, { useState ,useEffect } from 'react';
import Navbar from './components/Navbar';
import CloudyCard from './components/CloudyCard';
import Footer from './components/Footer';
import {LineChart , Line , XAxis , Tooltip } from "recharts";

import getRequest from './backend/getRequest';
import { dayData , forecastFunc } from "./backend/formatData";

export default function Test() {
    const [loading, setLoading] = useState(true);
    let location = localStorage.getItem('weatherLocation') || "Dubai" ;
    let storageDegreeFormat = localStorage.getItem('weatherDegree') || 1 ;

    let tmpDegreeFormat;

    if (storageDegreeFormat === 1) {
      tmpDegreeFormat = "C";
    }else{
      tmpDegreeFormat = "F";
    }

    const [ day1Formatted , setDay1Formatted] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
            let day1Data = await getRequest(location);
            console.log("day1Weather :", day1Data);
            if (day1Data) {
              setDay1Formatted(dayData(day1Data))
              console.log(day1Formatted.tempDeg);
              setDataLoaded(true);
            }
          } 
          catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        }
        fetchData();
      }, []);
    
    return (
        <div style={{ color: "black " }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        day1Formatted && 
        <>
          <h1>{day1Formatted.tempDeg}{tmpDegreeFormat}</h1>
          <h2>{day1Formatted.city}, {day1Formatted.country}</h2>

          <p>{day1Formatted.hightempDeg}/{day1Formatted.lowtempDeg} {tmpDegreeFormat}; Feels like {day1Formatted.feelsLike}</p>
          <p>{day1Formatted.dayOfWeek} , {day1Formatted.time} </p>

          <img src={day1Formatted.iconUrl} alt="" className='mainImg'/>

        
          <CloudyCard
         p = {day1Formatted.uv}
         title = "UV Index"
         icon = "https://cdn.weatherapi.com/weather/64x64/day/113.png"
        />

        </>
      )}
    </div>
    )
}

