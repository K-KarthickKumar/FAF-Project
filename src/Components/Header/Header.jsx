// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Organization from '../Images/organization.png';
// import './Header.css';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import { useSelector } from 'react-redux';

// function Header(){
//     const navigate = useNavigate();
//     const cartCourses = useSelector(state => state.course.courses)
//     return(
//             <header >
//                 <div className='row' style={{width:"100%"}}>
//                     <div className='col-3'>
//                         <img className='org-logo' alt="Logo.png" src={Organization} style={{cursor:"pointer"}} onClick={() => navigate("/")}></img>
//                     </div>
//                     <div className='col-9 mt-2' style={{textAlign:"end",color:"white"}}>
//                         <div class="cart-icon">
//                             <ShoppingCartIcon style={{color:"white",cursor:"pointer"}} onClick = {() => navigate("/cart")} />
//                             {cartCourses.length>0 ?<span id="cart-items">{cartCourses.length}</span> : null}
//                         </div>
//                     </div>

//                 </div>
//             </header>
//     )
// }

// export default Header;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Organization from '../Images/organization.png';
import './Header.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuIcon from '@mui/icons-material/Menu'; // Import Menu icon
import { useSelector } from 'react-redux';
 
function Header() {
    const navigate = useNavigate();
    const cartCourses = useSelector(state => state.course.courses);
    const [showIcons, setShowIcons] = useState(false); // State to toggle icons
 
    const toggleIcons = () => {
        setShowIcons(prevState => !prevState); // Toggle the state
    };
    return (
        <div className="container-fluid" style={{ backgroundColor: "black",padding:"0",position:"sticky",top:"0",zIndex:"1" }}>
            <div className="row" style={{margin:"0px"}}>
                <div className="col-6 col-md-6" style={{padding:"0px"}}>
                    <img
                        src={Organization}
                        style={{ width: "120px", padding: "3px", cursor: "pointer" }}
                        alt=""  
                        onClick={() => navigate("/home")}
                    />
                </div>
                <div className="col-6 col-md-6" style={{padding:"0px"}}>
                    {/* Toggle Menu Icon for Small Screens */}
                    <div className="toggle-icon" onClick={toggleIcons}>
                        <MenuIcon style={{ color: "white", cursor: "pointer", marginTop: "20px",position:"relative",right:"10px" }} />
                    </div>
                    {/* Icons Container */}
                    <div className={`icon-wrapper ${showIcons ? 'show' : ''}`}>
                    <div className="Dashboard-icon"  style={{ color: "white", cursor: "pointer", marginTop: "10px" }}
                                onClick={() => navigate("/home")} >
                            <DashboardIcon
                               
                            />
                            {/* {cartCourses.length > 0 ? <span id="cart-items">{cartCourses.length}</span> : null} */}
                            <span className="icon-label">Dashboard</span> {/* Label for Cart */}
                        </div>
                    <div className="course-icon"  style={{ color: "white", cursor: "pointer", marginTop: "10px" }}
                                onClick={() => navigate("/home")} >
                            <ListAltIcon
                               
                            />
                            {/* {cartCourses.length > 0 ? <span id="cart-items">{cartCourses.length}</span> : null} */}
                            <span className="icon-label">CourseList</span> {/* Label for Cart */}
                        </div>
                        <div className="cart-icon"  style={{ color: "white", cursor: "pointer", marginTop: "10px" }}
                                onClick={() => navigate("/cart")} >
                                    <div style={{position:"relative"}}>
                                    <ShoppingCartIcon
                               
                               />
                               {cartCourses.length > 0 ? <span id="cart-items">{cartCourses.length}</span> : null}
                                    </div>
                           
                            <span className="icon-label">Cart</span> {/* Label for Cart */}
                        </div>
                        <div className="profile-icon"  style={{ color: "white", cursor: "pointer", marginTop: "10px" }}
                                onClick={() => navigate("/Userprofile")} >
                            <AccountCircleIcon
                               
                            />
                            <span className="icon-label">Profile</span> {/* Label for Profile */}
                        </div>
                        <div className="logout-icon"  style={{ color: "white", cursor: "pointer", marginTop: "10px" }}
                                onClick={() => {navigate("/"); localStorage.clear();  window.location.reload();}} >
                            <ExitToAppIcon                                
                            />
                            <span className="icon-label">Logout</span> {/* Label for Logout */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;