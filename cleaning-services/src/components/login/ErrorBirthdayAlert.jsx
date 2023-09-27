import React, { useState } from 'react';


const ErrorBirthdayAlert = ({ isOpen, onClose }) => {
    const handleCloseClick = () => {
        onClose();
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className='errorBirth'>
            <div className="errorBirthContent">
                <h5 className=''><i className="bi bi-exclamation-triangle"></i>很抱歉!必須年滿18歲</h5>
                <button className='btn border-black' onClick={handleCloseClick}>關閉</button>
            </div>
        </div>
    )
}

export default ErrorBirthdayAlert; 