import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';
import Preloader from './components/Preloader'; // Import Preloader component

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching data or waiting for assets to load)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <Preloader /> // Show Preloader while loading
      ) : (
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <ToastContainer />
          <Navbar />
          <SearchBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/verify" element={<Verify />} />
          </Routes>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
