import React from 'react';
import './Carousel.css';

const images = [
  require('../images/img4.jpg'),
  require('../images/img5.jpg'),
  require('../images/img6.jpg'),
];

function Carousel() {
  const extendedImages = [...images, images[0]];

  return (
    <div className="carousel">
      <div className="carousel-track">
        {extendedImages.map((img, index) => (
          <div className="carousel-item" key={index}>
            <img src={img} alt={`Carousel ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
