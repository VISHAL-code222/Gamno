import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../CSS/Header.css';
import gaming from "../assets/Black.jpg"

function Header({ cartItemCount }) {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/"><img src={gaming} alt="" /></Link>
      </div>
      <nav>
        <Link to="/cart" className="cart-link">
          🛒 Cart 
          <AnimatePresence>
            {cartItemCount > 0 && (
              <motion.span
                key={cartItemCount} // Animate whenever count changes
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="cart-count-badge"
              >
                {cartItemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </nav>
    </header>
  );
}

export default Header;

