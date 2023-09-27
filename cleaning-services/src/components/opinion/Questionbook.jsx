import React from 'react';
import './question.css';

function Questionbook({ imgSrc, content }) {
    return (
      <div className="question-card">
      <div className="question-imgBox">
          <img src={imgSrc} width="273" height="306" />
      </div>
      <div className="question-contents">
          <p>{content}</p>
      </div>
  </div>
    );
  }
  
  export default Questionbook;
  
