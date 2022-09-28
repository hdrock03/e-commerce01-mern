import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect( () => { //yaha yeh dale h qki jb bhio koi signed in user aayega wo direct le jayega product page pe signup route pe jaa hi nh sakte
    const auth = localStorage.getItem('user')
    if(auth){  // agr user signed in h to usko home page pe bhej do     k 
        navigate('/')
    }
  })

  const collectData = async () => {
    console.warn(name, email, password);
    // whenver we are sending data from frontend to backend we need to add an object inside fetch. fetch take two argument url and an object
    let result = await fetch("http://localhost:5000/register", {
      method: "post", // method means what crud you are doing on it here we are sending data so we are keeping post mehod
      body: JSON.stringify({ name, email, password }), // in body we are sending 3 parameter but we can send it inside an object.But backend wont take object so we should use JSON.stringify
      headers: {
        // agr kuch header nh bola h backend wala to sirf yahi bhejna h
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem('user',JSON.stringify(result))
    if (result) {
      navigate("/"); // it will redirect to product part after clicking on signup button
    }
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Enter Name"
        className="inputBox"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        type="email"
        placeholder="Enter Email"
        className="inputBox"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="Enter Password"
        className="inputBox"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={collectData} type="button" className="appButton">
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
