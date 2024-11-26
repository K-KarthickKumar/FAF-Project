import React,{useState,useEffect} from 'react';
import LoginImg from '../Images/Login (1).png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DotLoader from "react-spinners/ClipLoader";
import './Login.css';
// import{toast} from 'react-toastify';
import {toast} from 'react-hot-toast';
import {useSelector,useDispatch} from 'react-redux';
import { setIsSalesSpoc } from '../../features/Login/LoginSlice';

const Login = () => {

    // window.baseUrl = `http://localhost:8082/`;
    const baseUrl = useSelector(state => state.login.baseUrl);
    
    const dispatch = useDispatch();

    const[userEmail,setUserEmail] = useState();
    const[otp,setOtp] = useState();
    const[check,setCheck] = useState(false);
    const navigate = useNavigate();
    const[loading, setLoading] = useState(false);
    const[error,setError] = useState(false);
    const[emailDisabled,setEmailDisabled] = useState(false);
    const domains = ["gktech.ai","silverlake.co.in","gkcloud.ai","dtree.ai"]

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "blue",
        position:"fixed",
        top:"40%",
      };

    // useEffect(()=>{
    //     if(localStorage.getItem("userEmail")){
    //         localStorage.removeItem("userEmail");
    //     }
    //   },[]);
    const isSalesSpoc = useSelector(state => state.login.isSalesSpoc);

    const handleSendOTP = (e) => {
        e.preventDefault();
       

        if(!userEmail){
            setError(true);
            return
        }

        const userDomain = userEmail.split("@")[1];
        if(domains.includes(userDomain)){
           dispatch(setIsSalesSpoc(true));
        }
        console.log(isSalesSpoc);
        setLoading(true);
        const json = {
            "to" : userEmail 
        }
        axios.post(`${baseUrl}gkt/faf/email/generateOTP`,json)
        .then((res) => {
            if(res.status === 200){
                setCheck(true);
                setLoading(false);
                setEmailDisabled(true);
                setError(false);
                toast("OTP sent",{autoClose:3000,type:"success",closeButton:"true",theme:"colored"})
            }
        })
        .catch((err) => {
            toast("Error while sending OTP",{autoClose:3000,type:"error",closeButton:"true",theme:"colored"})
            setLoading(false);
        })

    }

    const handleValidateOTP = (e) => {
        e.preventDefault();
        if(!otp){
            setError(true);
            return
        }
        setLoading(true);
        const json = {
            "to" : userEmail ,
            "otp" : otp
        }
 
        
        axios.post(`${baseUrl}gkt/faf/email/verifyOTP`,json)
        .then((res) => {
            if(res.status === 200){
                toast(res.data,{autoClose:3000,type:"success",closeButton:"true",theme:"colored"})
                localStorage.setItem("userEmail",userEmail);
                navigate("/courseList");
            }
        })
        .catch((err) => {
            toast(err.response.data,{autoClose:3000,type:"error",closeButton:"true",theme:"colored"})
            setEmailDisabled(false);
            setOtp();
            setCheck(false);
        })
        .finally(()=>{
            setLoading(false);
        })
    }
    return(
    <div className='container login' style={{padding:"25px",minWidth:"100vw",minHeight:"100vh",backgroundColor:"#80808070",margin:0}} >
        <DotLoader
        color={"#fbfbfb"}
        loading={loading}
        cssOverride={override}
        // style={{position:"fixed"}}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        <div className='row'>
            <div className="col-md-8">
                <div className='row'>
                    <img src={LoginImg} alt="Login Img"></img>
                </div>
            </div>
            <div className="col-md-4 ">
                <form style={{height:"500px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}} onSubmit={(e)=>handleValidateOTP(e)}>
                <div className='row'>
                    <label className='emailId'>Email-Id</label>
                    <input type='email' className='input' required value={userEmail} disabled={emailDisabled} onChange={e => setUserEmail(e.target.value)}></input>
                    {error && !userEmail ? <span style={{color:"red"}}>*Required</span> : null}
                </div>
                {check ? 
                <div className='row mt-3'>
                    <label className='otp'>OTP</label>
                    <input type='text' className='input' required value={otp} onChange={e => setOtp(e.target.value)}></input>
                    {error && !otp ?  <span style={{color:"red"}}>*Required</span>: null}
                </div>
                : null }
                <div className='row mt-3'>
                    <div className='col' style={{textAlign:"center"}}>
                    {check ? <button className='btn btn-primary' type='submit'>Validate OTP</button> : <button className='btn btn-primary' onClick={e => handleSendOTP(e)}>Send OTP</button>}
                    </div>
                    
                </div>
                </form>
            </div>
        </div>
    </div>
    )
};

export default Login;