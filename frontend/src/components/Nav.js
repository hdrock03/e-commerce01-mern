import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Nav() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    // click hone pe localstorage clear hga and navigate krega signup page pe
    localStorage.clear(); // niche logout wale link pe bhi onClick lga to to=/signup me change kiye taki apne aap logout and signup sinc ho jaye
    navigate("/signup");
  };
  return (
    
    <div>
      <img src='data:image/jpeg;base64,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' 
      alt='logo' 
      className="logo" />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Product</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <Link to="/update">Update Product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">
              Logout({JSON.parse(auth).name}) 
              {/* to show name after logout.JSON.parse kiye qki storage me string ke form me rhta h. auth.name kiye qki auth object h */}
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Nav;

// yaha pe ek link ke under do condition dale h qki jb user logged in rhega to signup nh show krega and
