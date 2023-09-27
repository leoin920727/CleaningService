import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';
import axios from './login/axios';
import LogoutAlert from './LogoutAlert';

const LOGOUT_URL = '/logout';


class navbar extends Component {



    // AlertDialog() {

    //     return (
    //         <div>
    //             <Button variant="outlined" onClick={handleClickOpen}>
    //                 登出
    //             </Button>
    //             <Dialog
    //                 open={this.state}
    //                 onClose={handleClose}
    //                 aria-labelledby="alert-dialog-title"
    //                 aria-describedby="alert-dialog-description"
    //             >
    //                 <DialogContent>
    //                     <DialogContentText id="alert-dialog-description">
    //                         確定登出嗎？
    //                     </DialogContentText>
    //                 </DialogContent>
    //                 <DialogActions>
    //                     <Button onClick={handleClose}>取消</Button>
    //                     <Button onClick={handleClose} autoFocus>
    //                         確定
    //                     </Button>
    //                 </DialogActions>
    //             </Dialog>
    //         </div>
    //     );
    // }





    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            open: false,

        };
    }



    componentDidMount() {
        // 檢查是否存在名為 "isLoggedIn" 的 cookie
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith("isLoggedIn="));

        // 如果找到 "isLoggedIn" 的 cookie，將登入狀態設置為 true
        if (cookieValue) {
            this.setState({ isLoggedIn: true });
        }
    }
    // 檢查是否為會員   管理員跳轉後台
    checkadmin = async (e) => {
        if (this.state.isLoggedIn == true) {
            let userInfo = await axios.get("http://localhost:4107/user", {
                withCredentials: true,
            });
            if (userInfo.data.data.user[0].admin == false) {
                window.location.href = "/member";
            } else if (userInfo.data.data.user[0].admin == 1) {
                window.location.href = "/dashboard";
            } else if (userInfo.data.data.user[0].admin == 2) {
                window.location.href = "/employee"
            }
        } else {

            window.location.href = "/";
        }


    }

    handleLogout = () => {
        // 在此處執行登出邏輯，並設定 isLoggedIn 狀態為 false
        // var cofirmed = window.confirm("確定登出嗎?");
        if (this.state.isLoggedIn === true) {
            document.cookie = 'isLoggedIn=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            this.setState({ isLoggedIn: false });

            // 登出自動導向首頁
            window.location.href = "/";


            // 由後端自動產生的cookie名稱是connect.sid 
            axios.get(LOGOUT_URL, {}, {
                headers: {
                    'Clear-Cookie': "connect.sid",
                },
            }).then(response => {

            }).catch(error => {

            })
        }
    };


    styles = {

        height: "6em",

    }

    btn = {
        backgroundColor: "#ffc107",
        color: "#664D03",



    };
    atagstyle = {
        color: "#664D03"
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    render() {
        // const { isLoggedIn } = this.state;
        return (
            <div>
                {/* 導覽列 */}
                <div className='container  d-md-none d-none d-lg-block '>
                    <Navbar style={this.styles} className='d-flex' sticky='top'>
                        {/* logo */}
                        <Navbar.Brand href="/"><img src='/images/logo.png' style={{ width: "8em", height: "5em" }} alt="" className='img-fluid' /></Navbar.Brand>
                        <div className='ms-auto d-flex align-items-center' >
                            <Link href="/about" style={this.atagstyle} className=' mx-3  text-decoration-none '>關於我們</Link>
                            <Link to="/service" style={this.atagstyle} className=' mx-3 text-decoration-none'>服務項目</Link>
                            <Link to="/case" style={this.atagstyle} className='mx-3   text-decoration-none'>案例分享</Link>
                            <Link to="/question" style={this.atagstyle} className='mx-3   text-decoration-none'>常見問題</Link>
                            <Link to="/"> <img src="images/info.png" alt=""
                                className='m-3'
                                style={{ width: "2rem" }} onClick={this.checkadmin} /></Link>


                            {this.state.isLoggedIn ? (
                                <div >
                                    <Button variant="outlined"
                                        onClick={this.handleClickOpen}
                                        style={this.btn}
                                        className=' px-4 mx-4 btn border-0'>
                                        登出
                                    </Button>
                                    <Dialog
                                       
                                        open={this.state.open}
                                        onClose={this.handleClose}
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogContent >
                                            <DialogContentText id="alert-dialog-description" className=''>
                                                <i class="bi bi-exclamation-circle-fill h4"></i>確定登出嗎？
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleLogout} style={this.btn} autoFocus>
                                                確定
                                            </Button>
                                            <Button onClick={this.handleClose} style={this.btn}>取消</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>) :
                                <Link to="/loginpage" className='mx-3 text-decoration-none' style={{ display: 'inline-block' }}>
                                    <button className='btn px-4 me-2' style={this.btn}>
                                        登入
                                    </button>
                                </Link>}
                            {/* {this.state.isLoggedIn ? (<button className=' px-4 mx-3 btn' style={this.btn} onClick={this.handleLogout}>
                                登出
                            </button>) : <Link to="/loginpage" className='mx-3 text-decoration-none' style={{ display: 'inline-block' }}>
                                <button className='btn px-4 me-2' style={this.btn}>
                                    登入
                                    
                                </button>
                            </Link>} */}


                        </div>
                    </Navbar>
                </div>
                {/* ///////////////////////// */}
                {/* RWD Navbar */}
                <div className=' container d-md-block  d-lg-none   '>

                    <Navbar expand="lg" sticky='top'>
                        <Navbar.Brand href="/"><img src='/images/logo.png' style={{ width: "8em", height: "5em" }} alt="" className='img-fluid' /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarCollapse" />
                        <Navbar.Collapse id="navbarCollapse">

                            <Nav className="ml-auto">
                                <Nav.Link href="/about" style={this.atagstyle}>關於我們</Nav.Link>
                                <Nav.Link href="/service" style={this.atagstyle}>服務項目</Nav.Link>
                                <Nav.Link href="/case" style={this.atagstyle}>案例分享</Nav.Link>
                                <Nav.Link href="/question" style={this.atagstyle}>常見問題</Nav.Link>
                                <Link to="/" onClick={this.checkadmin} style={this.atagstyle} className='text-decoration-none my-2'> 會員專區/查看訂單 </Link>


                                {this.state.isLoggedIn ? (
                                    <button className='btn px-3 me-2' style={this.btn} onClick={this.handleLogout}>
                                        登出
                                    </button>
                                ) : (
                                    <Link to="/loginpage" className=' text-decoration-none' style={{ display: 'inline-block' }}>
                                        <button className='btn px-4 ' style={this.btn}>
                                            登入
                                        </button>
                                    </Link>
                                )}


                            </Nav>

                        </Navbar.Collapse>


                    </Navbar>

                </div>









            </div >
        );
    }

}

export default navbar;




