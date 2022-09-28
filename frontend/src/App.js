import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddProduct from "./components/AddProduct";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Nav from "./components/Nav";
import PrivateRoute from "./components/PrivateRoute";
import ProductList from "./components/ProductList";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<ProductList/>} />
            <Route path="/add" element={<AddProduct/>} />
            <Route path="/update" element={<h1>update product</h1>} />
            <Route path="/logout" element={<h1>logout</h1>} />
            <Route path="/profile" element={<h1>profile</h1>} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App;
