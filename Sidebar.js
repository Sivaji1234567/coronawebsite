import React from 'react';
import './Sidebar.css';
 
const Sidebar = () => {
  const images = [
    "https://via.placeholder.com/600x300?text=Slide+1",
    "https://via.placeholder.com/600x300?text=Slide+2",
    "https://via.placeholder.com/600x300?text=Slide+3",
    "https://via.placeholder.com/600x300?text=Slide+4"
  ];
 
  return (
<div className="slider-container">
<div className="slider-track">
        {images.map((image, index) => (
<div key={index} className="slide">
<img src="C:\Users\ADMIN\project\myapp\public\homelook.jpg" alt={`Slide ${index + 1}`} />
</div>
        ))}
        {/* Duplicate slides to create continuous effect */}
        {images.map((image, index) => (
<div key={index + images.length} className="slide">
<img src={image} alt={`Slide ${index + 1}`} />
</div>
        ))}
</div>
</div>
  );
};
 
export default Sidebar;