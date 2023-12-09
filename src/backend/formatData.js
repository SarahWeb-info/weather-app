// in days=3 request forecastday[0],forecastday[1],forecastday[2] are the three days including today
// in dt=2010-6-12 request forecastday[0] is the only data available of the given date .
// forcastFunc is to format forecastday[] data

const forecastFunc = (param , storageDegreeFormat = 1) => {
    let forcastDay = param.day || null;

    let hightempDeg ;
    let lowtempDeg;
    let avgtmpDeg ;

    if (storageDegreeFormat === 1) {
        hightempDeg = forcastDay.maxtemp_c || null;
        lowtempDeg = forcastDay.mintemp_c || null;
        avgtmpDeg = forcastDay.avgtemp_c || null;
    }else{
        hightempDeg = forcastDay.maxtemp_f || null;
        lowtempDeg = forcastDay.mintemp_f || null;
        avgtmpDeg = forcastDay.avgtemp_f || null;
    }

    let nextCondition = forcastDay.condition.text || null;
    let nextIcon = forcastDay.condition.icon || null;
    let nextIconUrl = `https:${nextIcon}`;

    let forcastHour = param.hour || null;
    
    let hourlyTmp = [];
    
    for (let i in forcastHour){
        
        if (storageDegreeFormat === 1) {
            hourlyTmp.push(forcastHour[i].temp_c);
        }else{
            hourlyTmp.push(forcastHour[i].temp_f);
        }
    }

    return {
        nextCondition,
        nextIconUrl,
        hightempDeg , 
        lowtempDeg ,
        hourlyTmp,
        avgtmpDeg
    };
} 

// this is to format data with days=3 and no dt . 
//storageDegreeFormat = 1 is C
const dayData =(data , storageDegreeFormat = 1 )=> {

    let city = data.location.name || null;
    let country = data.location.country || null;
    
    let tempDeg;
    let feelsLike;

    if (storageDegreeFormat === 1) {
        tempDeg = data.current.temp_c || null;
        feelsLike = data.current.feelslike_c || null; 
    }else{
        tempDeg = data.current.temp_f || null;
        feelsLike = data.current.feelslike_f || null;
    }

    let condition = data.current.condition.text;

    let isDay = data.current.is_day || null; // let change to stary bg when its night
    
    let timeUnformated = data.location.localtime  || null; 
    
    const date = new Date(timeUnformated);

    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

    const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    let icon = data.current.condition.icon || null;
    let iconUrl = `https:${icon}`;

    let uv = data.current.uv || null;
    
    let humidity = data.current.humidity || null;
    
    let wind = data.current.wind_kph || null;
    
    let forecastObj = forecastFunc(data.forecast.forecastday[0] , storageDegreeFormat );

    let {
        nextCondition,
        nextIconUrl,
        hightempDeg,
        lowtempDeg ,
        hourlyTmp,
        avgtmpDeg
    } = forecastObj;

    return {
        city , 
        country , 
        tempDeg , 
        hightempDeg,
        lowtempDeg ,
        feelsLike , 
        condition,
        isDay ,
        dayOfWeek ,
        time , 
        iconUrl , 
        uv , 
        humidity , 
        wind , 
        hourlyTmp ,
        nextIconUrl,
        nextCondition ,
        avgtmpDeg
    }

}    

export { dayData , forecastFunc } ;