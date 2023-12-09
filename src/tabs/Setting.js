import React, { useState , useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import getRequest from '../backend/getRequest';
import { useNavigate } from 'react-router-dom';

export default function Setting() {

  const navigate = useNavigate();

  let storedLocation = localStorage.getItem('weatherLocation') || null ;
  let str = storedLocation;
  
  if (!storedLocation) {
   str = "Dubai";
  }

  const [weatherLocation , setWeatherLocation ] = useState(str); 
  
  const getGeoLocation = () => {
 
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const location = `${latitude},${longitude}`;
            resolve(location);
          },
          (error) => {
            console.error('Error getting location:', error);
            reject('Dubai');
          }
        );
      } else {
        console.error('Geolocation is not supported by your browser.');
        reject('Dubai');
      }
    });
  };

const getCity = async (location) => {
  let data = await getRequest(location);
  if (data) {
    let city = data.location.name || null;
    if (city) {
      return city;
    } else {
      console.log('No matching location found');
    }
  }
  console.log('No Data received from API');
  return 'Dubai';
};

useEffect(() => {
  const fetchLocation = async () => {
    try {
      let location = await getGeoLocation();
      console.log(`location before getCity in useEffect : ${location}`);
      setWeatherLocation(await getCity(location));
    } catch (error) {
      console.error('Error getting location in useEffect:', error);
    }
  };

  if (!storedLocation) {
    fetchLocation();
  }
}, []);

 
  const [weatherDegree , setWeatherDegree ] = useState(1);
  const [ dailyNotice , setDailyNotice ] = useState(1);
  const [ extremeNotice , setExtremeNotice ] = useState(1);
  const [ updateNotice , setUpdateNotice ] = useState(1);

  const saveInStorage =()=>{
      localStorage.setItem('weatherLocation', weatherLocation);
      localStorage.setItem('weatherDegree', weatherDegree);
      localStorage.setItem('dailyNotice', dailyNotice);
      localStorage.setItem('extremeNotice', extremeNotice);
      localStorage.setItem('updateNotice', updateNotice);

      navigate('/app');
  }
  
  return (
    <div className='appContainer appBg'>
      <Navbar />
      <h1>Personalize Mosam</h1>
      
      <form  onSubmit={saveInStorage} className='settingForm px2'>
        <span>
          <input 
            type="text"
            placeholder={weatherLocation === null ?  "Enter City" : weatherLocation }
            onInput={(e)=>getCity(e.target.value)} 
          />
        </span>
          
          <label className='flexInline my2'>
            <input
              type="checkbox"
              checked={weatherDegree === 1}
              onChange={() => {
                setWeatherDegree(weatherDegree === 1 ? 0 : 1 );
              }}
              style={{display :'none'}}
              />
              <p style={{ textDecoration: weatherDegree === 1 ? 'underline' : 'none' }}>Celsius &deg;C</p> / <p style={{ textDecoration: weatherDegree === 0 ? 'underline' : 'none' }}>Fahrenheit &deg;F</p>
          </label>

          <p htmlFor="" className='my2'><b>Nofications : </b></p>
        <span>
          <input 
            type="checkbox" 
            id="noticeOpt1" 
            checked={dailyNotice === 1}
            onChange={() => {
              setDailyNotice(dailyNotice === 1 ? 0 : 1 );
            }}
          />
          <label htmlFor="noticeOpt1" className='px2'>Get notification of Daily changing Weather</label>
        </span>

        <span>  
          <input
           type="checkbox"
           id="noticeOpt2"
           checked={extremeNotice === 1}
           onChange={() => {
             setExtremeNotice(extremeNotice === 1 ? 0 : 1 );
           }}
          />
          <label htmlFor="noticeOpt2"  className='px2'>Get notification of Extreme temp</label>
        </span>

        <span>  
          <input
           type="checkbox"
           id="noticeOpt3"
           checked={updateNotice === 1}
           onChange={() => {
              setUpdateNotice(updateNotice === 1 ? 0 : 1 );
            }}
          />
          <label htmlFor="noticeOpt3" className='px2'>Get notifications of App updates and new features</label>
        </span>

        <span className='justifyCenter'>
          <button type="submit" className=' btn'>Save</button>
        </span>

      </form>
      
      <Footer />
    </div>
  )
}
