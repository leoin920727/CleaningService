import React from 'react'
import SidebarMember from "../components/member/SidebarMember"
import Navbar from '../components/navbar'
import { Outlet } from 'react-router-dom'

export default function Member() {
    return (
        <div className='container'>
            <Navbar />
            <div className='row'>
                <div className='col-12 col-lg-3'>
                    <SidebarMember />
                </div>
                <div className='col-12 col-lg-9'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}