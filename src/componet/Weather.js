import React, { createContext, useEffect, useState } from 'react';
import css from './Weather.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const UserContext = createContext();

const Weather = () => {
  const [data, setData] = useState([]);
  const [cityName, setCityName] = useState("");
  const [List, setList] = useState([]);

  const [userdata, setUserData] = useState({ cityName });

  let src;
  if (data?.main?.temp - 273.15 <= 1) {
    src = "it's Look Like Snow-Fall";
  } else if (data?.main?.temp - 273.15 >= 1 && data?.main?.temp - 273.15 <= 15) {
    src = "it's Rainy Day";
  } else if (data?.main?.temp - 273.15 >= 15 && data?.main?.temp - 273.15 <= 40) {
    src = "it's Sunny Day";
  } else {
    src = "it's Cloud Day";
  }

  let imgsrc;
  if (data?.main?.temp - 273.15 <= 1) {
    imgsrc = "media/snow.png";
  } else if (data?.main?.temp - 273.15 >= 1 && data?.main?.temp - 273.15 <= 15) {
    imgsrc = "media/rain.png";
  } else if (data?.main?.temp - 273.15 >= 15 && data?.main?.temp - 273.15 <= 40) {
    imgsrc = "media/clear.png";
  } else {
    imgsrc = "media/cloud.png";
  }

  function getWeatherapi(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=376df6d213b9aa00692ccb0a4810152c`;

    axios.get(apiurl).then((res) => {
      setData(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  function handlesearch() {
    if (cityName.trim() !== "") {
      setList((List) => {
        const updateList = [...List, cityName];
        return updateList;
      });

      getWeatherapi(cityName);
      setCityName("");
    }
  }

  function handleRemove(i) {
    const RemoveItem = List.filter((ele, id) => i !== id);
    setList(RemoveItem);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handlesearch();
    }
  }

  useEffect(() => {
    getWeatherapi("");
  }, []);


  return (

    <div className='contaner'>


      <div>
      <nav id='nav' class="navbar">
  <div class="container-fluid">
  <div className="nav-logo">
    <a href="">
              <img className='logo' src="media/img 1.png" alt="Weather" />
              </a>
   </div>
    <div style={{display: 'flex'}}>
    <input type="text" placeholder="Enter Your Loction..." class="form-control mt-3" className='search' value={cityName} onChange={(e) => { setCityName(e.target.value)}}onKeyDown={handleKeyDown}></input>
    <button type="submit" class="btn btn-primary form-control" className='button' onClick={handlesearch}>Search</button>
          </div>
               </div>
          </nav>
     </div>

      <br />
      <div style={{width: '100%'}}>
      <div>
        {
          data?.main ? (<div className='Data'>
            <div className="weather-box">
              <div className="box">
                <div className="info-weather">
                  <div className="weather" >
                    <img src={imgsrc} alt='weather images' />
                  </div>
                </div>
              </div>
            </div>
          </div>) : (<div className='ops'>
            <img src="media/404.png" alt="Please enter some loction" />
            <div className='HH'>
              <h4>Please!</h4>
              <h3>Enter Some Loction</h3>
            </div>
          </div>)
        }

      </div>

      <div>
        {
          data?.main ? (<div>
            <h3 className='src'>{src}</h3>
          </div>) : (<p></p>)
        }
      </div>

      <div className='both'>
        {
          data?.main ? (<div>
            <h4 className='temperature' id='temp'>
              {data?.main?.temp ? ((data?.main?.temp) - 273.15).toFixed(2) + "°C" : <span className='span'>Enter Some Data !...</span>}
              <p className='extra'>Switch To Fahrenhelt</p>
            </h4>

          </div>) : (<p></p>)
        }

        {
          data?.main ? (<div>
            <h4 className='city'> {data?.name}  <p className='extra'>It's Your City Name</p></h4>
          </div>) : (<p></p>)
        }

      </div>

      <div className="weather-details">
        {
          data?.main ? (<div className="humidity">
            <i class="fa-solid fa-water"></i>
            <div className="text">
              <div className="info-humidity">
                <span className='hum'>{data?.main?.humidity} %</span>
              </div>
              <p className='num'>Humidity </p>
            </div>
          </div>) : (<p></p>)
        }


        {
          data?.main ? (<div className="wind">
            <i class="fa-solid fa-wind"></i>
            <div className="text">
              <div className="info-wind">
                <span>{data?.wind?.speed} km/h</span>
              </div>
              <p>Wind Speed</p>
            </div>
          </div>) : (<p></p>)
        }

      </div>
      <div>
        {
          data?.main ? (<div className='Todo'>
            <h3>Recent Search:-</h3>
            {
              List != [] && List.map((data, i) => {
                return (

                  <>
                    <ul>
                      <li key={i}>
                        <span onClick={() => handleRemove(i)}><i class="fa-solid fa-trash"></i></span>
                        <d>{data}</d>
                      </li>
                    </ul>
                  </>

                )

              })
            }


          </div>) : (<p></p>)
        }

      </div>
      </div>
    </div>

  )
}

export default Weather
