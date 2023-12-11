import React , { useState , useEffect , useCallback } from 'react';
import Navbar from '../components/Navbar';
import CloudyCard from '../components/CloudyCard';
import Footer from '../components/Footer';

import getRequest from '../backend/getRequest';
import { dayData } from "../backend/formatData";

export default function AroundUs() {
  const [ inputCity , setInputCity ] = useState("");
  const [ loading1 , setLoading1 ] = useState(true);
  const [ loading2 , setLoading2 ] = useState(true);
  const [ loading3 , setLoading3 ] = useState(true);
 
  const [favLocations, setFavLocations] = useState(() => {
    const storedLocations = localStorage.getItem('favLocations');
    if (storedLocations) {
      return JSON.parse(storedLocations);
    } else {
      return ["Dubai", "London", "Murree"];
    }
  });

  let storageDegreeFormat = localStorage.getItem('weatherDegree') ;
  let tmpDegreeFormat = "°F";

  if (storageDegreeFormat === "1") {
    tmpDegreeFormat = "°C";
  }

  let city1 = favLocations[0];
  let city2 = favLocations[1];
  let city3 = favLocations[2];

  const [ city1Weather , setCity1Weather] = useState();
  const [ city2Weather , setCity2Weather] = useState();
  const [ city3Weather , setCity3Weather] = useState();

  useEffect(() => {
    const getFavData = async () =>{
      try{
        let city1Data = await getRequest(city1 );
        let city2Data = await getRequest(city2 );
        let city3Data = await getRequest(city3 );

        console.log("city1Data " , city1Data);        

        if (city1Data) {
          setCity1Weather(dayData(city1Data , storageDegreeFormat));
          setLoading1(false);
        }

        if (city2Data) {
          setCity2Weather(dayData(city2Data , storageDegreeFormat));
          setLoading2(false);
        }

        if (city3Data) {
          setCity3Weather(dayData(city3Data , storageDegreeFormat)); 
          setLoading3(false);
        }
      }
      catch{
        console.log("error finding fav location");
        setLoading1(true);
        setLoading2(true);
        setLoading3(true);
      }
    }
    getFavData();
  }, [favLocations]);

  const fetchInputData = useCallback(async () => {
    try {
      if (inputCity) {
        
        const data = await getRequest(inputCity, storageDegreeFormat);
        if (data) {
          setFavLocations([inputCity, ...favLocations.slice(1)]);
          setCity1Weather(dayData(data, storageDegreeFormat)); 
          setLoading1(false);
        }
      }
    } catch {
      console.log("The location did not match.");
      setLoading1(true);
    } 
  }, [inputCity]);


  useEffect(() => {
    fetchInputData();
  }, [fetchInputData]);

  const searchLoc =()=>{
    fetchInputData();
  }
  
  return (
    <div className='appContainer appBg'>
      <Navbar />
      <h1 className='px2 '>Weather Around Us</h1>

      <form className='aroundUsInput' onSubmit={searchLoc}>
        <input type="text" className='my2' placeholder="City" value={inputCity} onInput={(e)=>setInputCity(e.target.value)}  />
        <button type="submit">Search</button>
      </form>

        {/* if something saved in the favourite list then show / else show default places */}
        <div className='flexColumn alignCenter'>
          {!loading1 &&
            <CloudyCard
              degree={`${city1Weather.tempDeg}${tmpDegreeFormat}`}
              linkStr={`${city1Weather.condition} >`}
              title={city1Weather.city}
              icon={city1Weather.iconUrl}
              p2={`${city1Weather.forecastObj1.hightempDeg} - ${city1Weather.forecastObj1.lowtempDeg}`}
              />
          }
          {loading1 && <p>loading ..!</p>}

          {!loading2 &&
            <CloudyCard
              degree={`${city2Weather.tempDeg}${tmpDegreeFormat}`}
              linkStr={`${city2Weather.condition} >`}
              title={city2Weather.city}
              icon={city2Weather.iconUrl}
              p2={`${city2Weather.forecastObj1.hightempDeg} - ${city2Weather.forecastObj1.lowtempDeg}`}
              />
          }
          {loading2 && <p>loading ..!</p>}

          {!loading3 &&
            <CloudyCard
              degree={`${city3Weather.tempDeg}${tmpDegreeFormat}`}
              linkStr={`${city3Weather.condition} >`}
              title={city3Weather.city}
              icon={city3Weather.iconUrl}
              p2={`${city3Weather.forecastObj1.hightempDeg} - ${city3Weather.forecastObj1.lowtempDeg}`}
              />
          }
          {loading3 && <p>loading ..!</p>}


        </div>
        
    <Footer />
    </div>
  )
}
