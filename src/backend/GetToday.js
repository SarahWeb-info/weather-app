import  data  from './Data.js';

const dayData =()=> {

    let city = data.location.name || null;
    let country = data.location.country || null;
    
    let tempDegC = data.current.temp_c || null;
    let tempDegF = data.current.temp_f || null;

    let feelsLikeC = data.current.feelslike_c || null; 
    let feelsLikeF = data.current.feelslike_f || null;
    
    let isDay = data.current.is_day || null; // let change to stary bg when its night
    
    let timeUnformated = data.location.localtime  || null; 
    // Create a new Date object from the string
    const date = new Date(timeUnformated);

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

    // Get the time in 24-hour format
    const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    let icon = data.current.condition.icon || null;
    let iconUrl = `https:${icon}`;
    
    let uv = data.current.uv || null;
    
    let humidity = data.current.humidity || null;
    
    let wind = data.current.wind_kph || null;

    let forcastday = data.forecast.forecastday[0].day || null;
    let hightempDegC = forcastday.maxtemp_c || null;
    let lowtempDegC = forcastday.mintemp_c || null;
    let hightempDegF = forcastday.maxtemp_f || null;
    let lowtempDegF = forcastday.mintemp_f || null;

    let forcast = data.forecast.forecastday[0].hour || null;
    
    let hourlyTmpC = [];
    let hourlyTmpF = [];
    
    for (let i in forcast){
        hourlyTmpC.push(forcast[i].temp_c);
        hourlyTmpF.push(forcast[i].temp_c);
    }

    return {
        city , 
        country , 
        tempDegC , 
        tempDegF ,
        hightempDegC,
        hightempDegF,
        lowtempDegC ,
        lowtempDegF ,
        feelsLikeC , 
        feelsLikeF , 
        isDay ,
        dayOfWeek ,
        time , 
        iconUrl , 
        uv , 
        humidity , 
        wind , 
        hourlyTmpC , 
        hourlyTmpF 
    }

}    

let today = dayData(); 

export default today ;