import React from 'react';
import { useNavigate } from "react-router-dom";

const SuccessAlert = () => {
    const navigate = useNavigate();
    return (
        <div className='successSignup '>
            <div className="successsignupContent">
                <h5 className=''><i className="bi bi-check2"></i>註冊成功!</h5>
                <button className='btn border-black' onClick={() => { navigate(0, {replace:true}) }}>Close</button>
            </div>
        </div>
    )
}



export default SuccessAlert;