import React, { useState } from 'react';
import products from '../data/product';
import { motion, AnimatePresence } from 'framer-motion';
import '../CSS/AllProduct.css';

function AllProducts({ addToCart }) {
  const [check, setCheck] = useState("ALL");

  const handleChange = (category) => {
    setCheck(category);
  };

  const Filtered_Category = products.filter(product =>
    check === "ALL" ? true : product.category === check
  );

  return (
    <>
      {/* Page fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Category Buttons */}
        <motion.div
          className="button-group"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {["ALL", "GAMES", "COLLECTIBLES", "GEAR", "ACCESSORIES"].map((cat, idx) => (
            <motion.button
              key={cat}
              className="btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChange(cat)}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {cat.toUpperCase()}
            </motion.button>
          ))}
        </motion.div>

        {/* Product Cards */}
        <section>
          <ul>
            <AnimatePresence>
              {Filtered_Category.map(product => (
                <motion.li
                  key={product.id}
                  className="li"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {product.name}
                  </motion.h1>

                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    ${product.price}
                  </motion.h2>

                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "#0f70d1" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addToCart(product)}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Add to Cart
                  </motion.button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </section>
      </motion.div>
    </>
  );
}

export default AllProducts;

