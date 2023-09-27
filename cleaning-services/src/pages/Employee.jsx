import React from 'react'
import EmployeeAD from "../components/dashboard/employeeAdmin"
import Navbar from '../components/navbar'
import { Outlet } from 'react-router-dom'

export default function Employee() {
    return (
        <div className='container'>
            <Navbar />
            <div className='row'>
                <div className='col-12 col-lg-3'>
                    <EmployeeAD />
                </div>
                <div className='col-12 col-lg-9'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}