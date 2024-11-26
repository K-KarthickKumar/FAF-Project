import React from "react";
import { useNavigate } from "react-router-dom";
import Organization from '../Images/organization.png';
import './Header.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';

function Header(){
    const navigate = useNavigate();
    const cartCourses = useSelector(state => state.course.courses)
    return(
            <header >
                <div className='row' style={{width:"100%"}}>
                    <div className='col-3'>
                        <img className='org-logo' alt="Logo.png" src={Organization} style={{cursor:"pointer"}} onClick={() => navigate("/")}></img>
                    </div>
                    <div className='col-9 mt-2' style={{textAlign:"end",color:"white"}}>
                        {/* <ShoppingCartIcon style={{color:"white",cursor:"pointer"}} onClick = {() => navigate("/cart")} /> <span style={{fontSize:"10px"}}><sup style={{top:"-1.5em"}}>1</sup></span> */}
                        <div class="cart-icon">
                            <ShoppingCartIcon style={{color:"white",cursor:"pointer"}} onClick = {() => navigate("/cart")} />
                            {cartCourses.length>0 ?<span id="cart-items">{cartCourses.length}</span> : null}
                        </div>
                    </div>

                </div>
            </header>
    )
}

export default Header;