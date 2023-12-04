      TOTAL 4 PAGES . (3 in navbar)

      PAGE 1 INTRO
      again adding an intro page for (set up or skip)
      only display if the location is not saved in local storage

      PAGE 2 MAIN
      if setup is not done (skipped) , give weather of dubai in home page
    
      COMPONENTS INSIDE
      
      0-
      navbar : home active

      1-
      a weather header (inline flex)
      div 1 : (flex colum)  current weather degree , location,feels like , day time long
      div 2 : weather emoji
      
      2-
      weather properties (inline flex)
      div 1 : uv index (cloudy card) - <span><p>low</p> emoji </span> <b>UV Index</b>  
      div 2 : humidity (cloudy card)- <span><p>90%</p> emoji </span> <b>Humidity</b> 
      div 3 : Wind (cloudy card)- <span><p>5 km/h</p> emoji </span> <b>Wind</b> 

      3-
      <h1>Today</h1>
      <div>Graph (width : 150% , overflow-x : scroll (dont show the scroll bar))</div>
      <p>Movable(horizontal) graph pin </p>
      <p>Graph titles</p>

      4-
      comming days (inline flex)(width : 150% , overflow-x : scroll )
      div 1 :(flex colum) - <span><p>40 </p> emoji </span> <b>Today</b>  

      
      PAGE 3 : Weather around Us 
      This would be weather around our country / favourite countries (saved from early search)(max 5)

      COMPONENTS INSIDE :

      1 - Dynamic heading according to the setup
      <h1>Around Your Country </h1> or <h1>Your Favourite Places</h1>

      2 - input (locations list) (also make an array of 5 places that keep on updating with entries but max-number is 5 . Before entries make a default list of NewYork , London , Japan , Dubai , Sydney )

      3 -5 cloudy cards  (dynamic zones)
  
      Page 4 : setup/Personailze
      Form 
      i - location input or auto locate btn . (if auto locate = null then red color placeholder to enter the location manually)
      ii - C/F switch
      iii - Extreme Weather Notification Yes/No switch
      
      HELPING COMPONENTS :  
      
      1 -navbar at the bottom
      navbar : home , location , setting
      navbar button hover animation of moving top - 2vh
      
      2 - cloudy card - (its size should be dynamic)


      FONT SELECTION
      Google roboto ,link added in index.html
      https://fonts.google.com/specimen/Roboto

      BG/COLOR THEME SELECTION
      Three backgrounds 
      1 - white black yellow background color according to the time zone (according to day / night )
      2 - background picture (transparent sky)
      3 - gradient (gradient changes with weather with slow transition )(transparent with weather color ) (skyblue / yellow / graiesh blue / )(clear snowy - sunny - hazy smoky windy - stormy rainy  )

      4 - ocean blue and offwhite theme

    JS (BACKEND):
    1 - params in main .  
    most cloudy cards have links - these links open page (like main , but location is not saved in the local storage)
    so  these links has param of days/places . so lets make the main page according to these params

    2 - rapid api

    3 - getData.js
    getData with exception handling- means object to arrays of key and values.

    get data and save them in objects eg . 
    i - nowWeather ={tmpC , tmpF , feelsLike , UV , Humidity , Wind}
    ii - todayWeather ={weather list with time}
    iii - comingWeather ={weather of coming days}
    iv - emojiArray (maybe)

    v - curr ={currTime , currDate , currDay}

    vi - autoLocate = use built in location Navigation Api to get location

    vii - location = getitem.localStorage / defualt Dubai / autoLocate

    viii - make a loading icon with fade with bg

    ix - dynamic bg gradient according to weather 

    iix - dynamic bg color change according to time zone

    iiix - notification alert it notice On . 

    4 - for page 4 save the setup to local storage 

    5 - the intro page setup btn goes to page 4 and skip btn goes to main page .

    LocalStorage varaibles :
    1 - curr location 
    2 - centigrade true/false
    3 - search location list
    4 - notification true/false

    Packages : 
    react-router
    react-icons
    