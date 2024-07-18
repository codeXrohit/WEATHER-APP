import React, { createContext, useEffect, useState } from 'react'
import css from './Weather.css'
import axios from 'axios'
import { Link } from 'react-router-dom'


export const UserContext = createContext();

const Weather = () => {


  const [data, setData] = useState([])
  const [cityName, setCityName] = useState("")
  const [List, setList] = useState([])
  const [userdata, setUserData] = useState({ cityName })

  let src;
  if (data?.main?.temp - 273.15 <= 1) {
    src = "it's Look Like Snow-Fall"

  }
  else if (data?.main?.temp - 273.15 >= 1 && data?.main?.temp - 273.15 <= 15) {
    src = "it's Rainy Day"
  }
  else if (data?.main?.temp - 273.15 >= 15 && data?.main?.temp - 273.15 <= 40) {
    src = " it's Sunny Day"
  }
  else {
    src = "it's Cloud Day"
  }



  let imgsrc;
  if (data?.main?.temp - 273.15 <= 1) {
    imgsrc = "media/snow.png"

  }
  else if (data?.main?.temp - 273.15 >= 1 && data?.main?.temp - 273.15 <= 15) {
    imgsrc = "media/rain.png"
  }
  else if (data?.main?.temp - 273.15 >= 15 && data?.main?.temp - 273.15 <= 40) {
    imgsrc = "media/clear.png"
  }
  else {
    imgsrc = "media/cloud.png"
  }


  function getWeatherapi(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=376df6d213b9aa00692ccb0a4810152c`

    axios.get(apiurl).then((res) => {
      setData(res.data)
    }).catch((err) => {
      console.log(err)

    })
  }





  const search = () => {
  }
  function handlesearch() {
    setList((List) => {

      const updateList = ([...List, cityName])
      return updateList


    })


    getWeatherapi(cityName)
    setCityName("")
  }

  useEffect(() => {
    getWeatherapi("")
  },)


  function handleRemove(i) {
    const RemoveItem = List.filter((ele, id) => {
      return i != id
    })
    setList(RemoveItem)
  }



  return (

    <div className='contaner'>


      <div>
        <nav id='nav' className="navbar navbar-expand-lg ">
          <div className="container-fluid">

            <div className="nav-logo">
              <div className="logo"></div>
            </div>
            <a id='name' className="navbar-brand" href="#">Weather</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " >
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <Link className="nav-link" to="/Home">Home</Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    About The App
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Get By The Zip Code </a></li>
                    <li><a className="dropdown-item" href="#">Get By The City Name</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li> <Link className="dropdown-item" to="#">Your Search History</Link></li>
                  </ul>
                </li>

              </ul>

              <input type="text" placeholder="Enter Your Loction..." class="form-control mt-3" className='search' value={cityName} onChange={(e) => { setCityName(e.target.value) }}></input>

              <button type="submit" class="btn btn-primary form-control" className='button' onClick={handlesearch}>Search</button>

            </div>
          </div>
        </nav>



      </div>

      <br />
      <div style={{marginLeft: '100px'}}>
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
