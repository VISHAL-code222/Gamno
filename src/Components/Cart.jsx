import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../CSS/Cart.css';

function Cart({ cartItems, removeFromCart, clearCart }) {
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
    const finalPrice = (totalPrice - discountAmount).toFixed(2);

    useEffect(() => {
        if (cartItems.length === 0 && !paymentSuccess) {
            setPaymentSuccess(false);
        }
    }, [cartItems, paymentSuccess]);

    const handlePayment = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        setTimeout(() => {
            setPaymentSuccess(true);
            clearCart();
        }, 1000);
    };

    const applyCoupon = () => {
        if (totalPrice > 150 && couponCode === 'GET20') {
            const discount = totalPrice * 0.2;
            setDiscountAmount(discount);
            setDiscountApplied(true);
        } else {
            alert('Invalid coupon or not eligible (must be over $150).');
        }
    };

    return (
        <div className="cart-container">
            <h2>Cart</h2>

            {/* Main Logic */}
            {paymentSuccess ? (
                <div className="success-message">
                    <h3>Payment Successful! 🎉</h3>
                    <p>Thank you for your purchase.</p>
                </div>
            ) : cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        <AnimatePresence>
                            {cartItems.map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div>
                                        <h3>{item.name}</h3>
                                        <p>${item.price.toFixed(2)}</p>
                                    </div>
                                    <button onClick={() => removeFromCart(index)}>Remove</button>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>

                    <hr />

                    <div className='extra'>
                        <h3>Total: ${totalPrice.toFixed(2)}</h3>
                        {discountApplied && (
                            <p style={{ color: 'green' }}>
                                20% Discount Applied: -${discountAmount.toFixed(2)} 🎉
                            </p>
                        )}
                        <h3>Final Price: ${finalPrice}</h3>
                    </div>

                    <div className='class-btn' >
                        <input
                            type="text"
                            placeholder="Enter Coupon Code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <button  onClick={applyCoupon} >
                            Apply Coupon
                        </button>
                    </div>

                    <button className='pay' onClick={handlePayment} >
                        Pay Now
                    </button>
                </>
            )}
        </div>
    );
}

export default Cart;



