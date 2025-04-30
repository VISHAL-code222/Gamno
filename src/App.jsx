import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllProducts from './Components/AllProducts';
import Cart from './Components/Cart';
import Header from './Components/Header';


function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(prevCart => prevCart.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
    
      <Header cartItemCount={cart.length} />
      

     
      <div style={{ position: 'relative', paddingTop: '80px', minHeight: '100vh', overflow: 'hidden' }}>

        

       
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<AllProducts addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
