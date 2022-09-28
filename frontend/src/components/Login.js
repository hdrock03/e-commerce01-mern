import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    // yaha useEffect ke under auth liye fr navigate kraye / pe qki jb user logged inh aur wo url me /login krta to usko login wale page pe le jata
    // to usko rectify kiye isse av user /login krega while logged in tb wo us page pe nh jaa payega
    useEffect(()=> {
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    },[])

    const handleLogin = async () => {
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({email, password}),
            headers: {
                    'Content-Type':'application/json'
            }
        })
        result = await result.json()
        // console.log(result);
        if(result.name){
            localStorage.setItem('user',JSON.stringify(result))
            navigate('/')
        }else{
            alert('Please enter correct details')
        }
    }


  return (
    <div className='login'>
        <h1>Login</h1>
        <input type='text' className='inputBox' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='password' className='inputBox' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin} className='appButton' type='button'>Login</button>
    </div>
  )
}

export default Login