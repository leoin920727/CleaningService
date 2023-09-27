import React from 'react';
import './aboutus.css';

function Card({ title, imgSrc, content }) {
  return (
    <div className="teamcard">
      <h3 className="cardtitle">{title}</h3>
      <img src={imgSrc} alt="" className="cardimg"/>
      <p className="cardp">{content}</p>
    </div>
  );
}

export default Card;
