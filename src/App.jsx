import React, {useState, useEffect} from 'react';

//import Axios//
import axios from "axios";

//import icons//
import { 
IoMdSunny, IoMdRainy, 
IoMdCloudy, IoMdSnow, 
IoMdThunderstorm, IoMdSearch
} from "react-icons/io";

import {BsCloudHaze2Fill, BsCloudDrizzleFill, 
BsEye , BsWater, BsThermometer, BsWind
}from "react-icons/bs"

import {TbTemperatureCelsius} from "react-icons/tb"
import {ImSpinner8} from "react-icons/im"

  //ApiKey//

const Apikey = "decb5465428fc0d46dcd9c2c630b9710";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Ren");
  const [inputValue, setInputValue] = useState("");
  const [setAnimate] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");



  const handleInput = (e) =>{
    setInputValue(e.target.value);
  }

  

  const handleSubmit = (e) => {
    // Si input values ne pas vide//

    if(inputValue !== "")
    { //Affichage endroit//
      setLocation(inputValue);
    }

    //Selectioner Input//
    const input = document.querySelector("input");

    //Si input values est vide//

    if(input.value === "")
    {
      //Animation vrai//

      setAnimate(true);
      //Apres 500ms si la animation est faux)//

      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    //Clear input//
    input.value = "";

    //Default//
    e.preventDefault();

  }

  //Recherche de données//
  useEffect(() => {
    //Afficher la fenetre de charge est vrai//
    SetLoading(true);
    const url=
  `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${Apikey}`;

  axios.get(url).then((res) =>{
    //Afficher les données apres 1500ms// 
    setTimeout(() => {
      setData(res.data);
      //Afficher la fenetre de charge est vrai//
      SetLoading(false);
    }, 1500);
  }).catch(err => {
    SetLoading(false);
    setErrorMsg(err);
  })

  }, [location]);

  //error message//
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("")
    }, 2000)
    return () => clearTimeout(timer);
  }, [errorMsg]);


 // if data is false show the loader//
 if(!data)
 {
  return(
    <div className='w-full h-screen bg-gradient-to-r 
    from-violet-400 to-fuchsia-300 bg-no-repeat bg-cover 
    bg-center flex flex-col justify-center items-center'>
      <div>
          <ImSpinner8 className='text-5xl animate-spin text-white'/>
      </div>
    </div>
  );
 }
 //Affichage Icons selon le temp//
 let icon;
 
 switch (data.weather[0].main)
 {
  case "Clouds":
    icon = <IoMdCloudy/>;
      break;
  
  case "Haze":
    icon = <BsCloudHaze2Fill />;
      break;
  
  case "Rain":
    icon = <IoMdRainy className='text-[#31CAFB]'/>;
      break;

  case "Clear":
    icon = <IoMdSunny className='text-[#FFDE33]'/>;
      break;

  case "Drizzle":
    icon = <BsCloudDrizzleFill className='text-[#31CAFB]'/>;
      break;

  case "Snow":
    icon = <IoMdSnow className='text-[#31CAFB]'/>;
      break;

  case "Thunderstorm":
    icon = <IoMdThunderstorm/>;
      break;
}

  //date//

  const date = new Date();


 return <div className='w-full h-screen bg-gradient-to-r 
 from-violet-400 to-fuchsia-300 bg-no-repeat bg-cover 
 bg-center flex flex-col items-center justify-center
 px-4 lg:px-0'>
  {errorMsg && <div><span>{'${errorMsg.response.data.message}'}</span>
  
    City not found
  </div>}

  {/* form */}
<form className='h-16 bg-black/30 w-full max-w-[450px] 
  rounded-full backdrop-blur-[32px] mb-8'>
  <div className='h-full relative flex items-center justify-between p-2'>
  <input onChange={(e) => handleInput(e)}
  className='flex-1 bg-transparent outline-none placeholder:text-white text-white
  text-[15px] font-light pl-6 h-full ' 
  type="text" 
  placeholder='Search the city or country' />
  <button 
  onClick={(e) => handleSubmit(e)}
  className='bg-[#6303B1] hover:bg-[#8E31C9]  
  w-20 h-12 rounded-full flex justify-center 
  items-center transition text-white text-[27px]'>
    <IoMdSearch/>
  </button>
  
  </div></form>
 {/* card */}
 <div className='w-full max-w-[420px] bg-black/20
 min-h-[590px] text-white backdrop-blur-[30px]
 rounded-[32px] py-12 px-6'>
  <div>
     {/* top card */}
    <div className='flex items-center gap-x-5'>

    <div className='text-[87px]'>
      {icon}
    </div>
    <div className='text-[28px] text-2xl font-semibold'>{data.name}, {data.sys.country}
    </div>
    {/* date */}
      <div>
        {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()} 
      </div>
  </div>
 
     {/* body card */}
     <div className='my-20'>
     <div className='flex justify-center items-center'>
      {/*temp*/}
      <div className='text-[144px] leading-none font-light'>{parseInt(data.main.temp)}</div>
     {/* celsius */}
        <div className='text-4xl'>
         < TbTemperatureCelsius /> 
        </div>
        </div>
        {/* weather description*/}

        <div className='capitalize text-center'>{data.weather[0].description}
        </div>        
        </div>
    {/* bottom card */}
    <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
    <div className='flex justify-between'>
      <div className='flex items-center gap-x-2'>
        
        <div className="text-[20px]"> 
        <BsEye />
      </div>
      <div>
        Visibility <span className='ml-2'>{data.visibility / 1000} Km</span>
      </div>
      <div className='flex items-center gap-x-2'>
      <div className="text-[20px]">
        <BsThermometer />
      </div>
      <div className='flex'>
        Feels<span className='flex ml-2'>{parseInt (data.main.feels_like)}
        <TbTemperatureCelsius/></span>
        </div>
        <div className='flex items-center gap-x-2'>
        
        <div className="text-[20px]"> 
        <BsWater />
      </div>
      <div>
       Humidity <span className='ml-2'>{data.main.humidity} %</span>
      </div>
      <div className='flex items-center gap-x-2'>
      <div className="text-[20px]">
        <BsWind/>
      </div>
      <div >
        Wind <span className='ml-2'>{parseInt (data.wind.speed)}
        m/s</span>
      </div>
    </div>
    <div >
    </div>
    </div>
  </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div> 
}
export default App;
