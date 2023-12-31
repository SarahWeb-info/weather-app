const getRequest = async (location , dt )=>{
    try {
    let apikey = process.env.REACT_APP_APIKEY;

    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&days=3&dt=${dt}`;

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': `${apikey}`,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'       
      },
    };

    const [response ] = await Promise.all([
      fetch(url, options),
    ]);

    const result = await response.json();
    return result ;

  } catch (error) {
    console.error('Error fetching data in getRequest :', error);
  }
};

export default getRequest  ; 