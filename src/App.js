import React, { Component } from 'react'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Weather from './componet/Weather'
import Home from './componet/Home'

const App = () => {
  return (
    <div>
      <Router>
        <Weather/>
        <Routes>
        <Route path='/Home' element={<Home/>}/>
        </Routes>
      </Router>


    </div>
  )
}

export default App

