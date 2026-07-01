import {React,useEffect, useRef, useState} from 'react'
import './Weather.css'
import search_icon from './assets/weather/search.png';
import cloudy_icon from './assets/weather/cloudy.png';
import rain_icon from './assets/weather/rain.png';
import sun_icon from './assets/weather/sun.png';
import lightning_icon from './assets/weather/lightning.png';
import snowy_icon from './assets/weather/snowy.png';
import humidity_icon from './assets/weather/humidity.png';
import wind_icon from "./assets/weather/wind.png"
const Weather = () => {
  const inputref=useRef()
  const allIcon={
    "01d":sun_icon,
    "01n":sun_icon,
    "02d":cloudy_icon,
    "02n":cloudy_icon,
    "03d":cloudy_icon,
    "03n":cloudy_icon,
    "04d":lightning_icon,
    "04n":lightning_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snowy_icon,
    "13n":snowy_icon,
  }
 const search = async (city) => {
    try{
      if(city===""){
        alert("Enter city name");
        return;
      }
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_ID}`;
      const response = await fetch(url);
    const data = await response.json();
    if(!response.ok){
      alert("City Not Found")
      return;
    }
    const icon=allIcon[data.weather[0].icon|| sun_icon]
    setweatherdata({
      temperature:Math.floor(data.main.temp),
      wind:data.wind.speed,
      humidity:data.main.humidity,
      location:data.name,
      icon
    })
    console.log(data);
    }
    catch(err){
    setweatherdata(false);
    console.log("error in fetching data");
    }
  };

  useEffect(() => {
    search("kugti");
  }, []);
  
const [weatherdata, setweatherdata]=useState(false);
  return (
    <div className='weather'>
     <div className="search">
        <input type="text" placeholder='Search' ref={inputref}/>
        <img src={search_icon} alt="Search" onClick={()=>{search(inputref.current.value)}}/>
     </div>
     {weatherdata?<>
     <img src={weatherdata.icon} alt="" className='weather-icon'/>
     <p className='temperature'>{weatherdata.temperature}°C</p>
     <p className='location'>{weatherdata.location}</p>
     <div className='weather-data'>
        <div className='col'>
            <img src={humidity_icon}/>
          <div>
            <p>{weatherdata.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className='col'>
            <img src={wind_icon}/>
            <div>
            <p>{weatherdata.wind}</p>
            <span>Wind</span>
            </div>
        </div>
     </div>
     </>:<></>}
     </div>
  )
}

export default Weather;