import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'

// yeh component banaye hai taki jb signup nh ho to baki links nh dikhe sirf signup dikhe
function PrivateRoute() {
    const auth = localStorage.getItem('user') // check kiye ki user signed in hai ki nh by checking localstorage
  return auth ? <Outlet /> : < Navigate to='/signup' /> // agr user signed in as h to Outlet dikhao else signup page hi dikhao
}

export default PrivateRoute

// Outlet jb bhi call hota hai to wo apne child element ko show krta h
// jb app.js me jaoge to to bht sare route ko ek single route me rakhe h jiska element PrivateRoute h 