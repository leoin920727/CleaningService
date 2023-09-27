import React, { useState } from 'react';


const ErrorAlert = ({ isOpen, onClose }) => {
    const handleCloseClick = () => {
        onClose();
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className='errorSignup'>
            <div className="errorSignupContent">
                <h5 className=''><i className="bi bi-exclamation-triangle"></i>資料有誤!</h5>
                <button className='btn border-black' onClick={handleCloseClick}>Close</button>
            </div>
        </div>
    )
}

export default ErrorAlert; 