import { useState } from "react";

import '../styles/slider.css'
import { useNavigate } from "react-router-dom";

const Slider = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/products')
      };
    
      return (
        <div className="image-container">
          <div className="background-image"></div>
          <button className="overlay-button" onClick={handleClick}>
            Start Shopping
          </button>
        </div>
      );
}
export default Slider