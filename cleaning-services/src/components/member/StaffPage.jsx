import React from 'react'
import StaffOrderList from "./StaffOrderList"
import StaffSidebar from './StaffSidebar'
import StaffOrderDone from './StaffOrderDone'
import Navbar from '../navbar'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
    return (
        <div className='container'>
            <Navbar />
            <div className='row'>
                <div className='col-12 col-lg-3'>
                    <StaffSidebar />
                </div>
                <div className='col-12 col-lg-9'>
                    <Outlet />
                    {/* <StaffOrderDone/> */}
                </div>
            </div>
        </div>
    )
}