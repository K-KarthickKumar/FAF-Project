// import React,{useState,useEffect} from 'react';
// import LoginImg from '../Images/Login (1).png';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import DotLoader from "react-spinners/ClipLoader";
// import './Login.css';
// // import{toast} from 'react-toastify';
// import {toast} from 'react-hot-toast';
// import {useSelector,useDispatch} from 'react-redux';
// import { setIsSalesSpoc } from '../../features/Login/LoginSlice';

// const Login = () => {

//     // window.baseUrl = `http://localhost:8082/`;
//     const baseUrl = useSelector(state => state.login.baseUrl);
    
//     const dispatch = useDispatch();

//     const[userEmail,setUserEmail] = useState();
//     const[otp,setOtp] = useState();
//     const[check,setCheck] = useState(false);
//     const navigate = useNavigate();
//     const[loading, setLoading] = useState(false);
//     const[error,setError] = useState(false);
//     const[emailDisabled,setEmailDisabled] = useState(false);
//     const domains = ["gktech.ai","silverlake.co.in","gkcloud.ai","dtree.ai"]

//     const override = {
//         display: "block",
//         margin: "0 auto",
//         borderColor: "blue",
//         position:"fixed",
//         top:"40%",
//       };

//     // useEffect(()=>{
//     //     if(localStorage.getItem("userEmail")){
//     //         localStorage.removeItem("userEmail");
//     //     }
//     //   },[]);
//     const isSalesSpoc = useSelector(state => state.login.isSalesSpoc);

//     const handleSendOTP = (e) => {
//         e.preventDefault();
       

//         if(!userEmail){
//             setError(true);
//             return
//         }

//         const userDomain = userEmail.split("@")[1];
//         if(domains.includes(userDomain)){
//            dispatch(setIsSalesSpoc(true));
//         }
//         console.log(isSalesSpoc);
//         setLoading(true);
//         const json = {
//             "to" : userEmail 
//         }
//         axios.post(`${baseUrl}gkt/faf/email/generateOTP`,json)
//         .then((res) => {
//             if(res.status === 200){
//                 setCheck(true);
//                 setLoading(false);
//                 setEmailDisabled(true);
//                 setError(false);
//                 toast("OTP sent",{autoClose:3000,type:"success",closeButton:"true",theme:"colored"})
//             }
//         })
//         .catch((err) => {
//             toast("Error while sending OTP",{autoClose:3000,type:"error",closeButton:"true",theme:"colored"})
//             setLoading(false);
//         })

//     }

//     const handleValidateOTP = (e) => {
//         e.preventDefault();
//         if(!otp){
//             setError(true);
//             return
//         }
//         setLoading(true);
//         const json = {
//             "to" : userEmail ,
//             "otp" : otp
//         }
 
        
//         axios.post(`${baseUrl}gkt/faf/email/verifyOTP`,json)
//         .then((res) => {
//             if(res.status === 200){
//                 // toast(res.data,{autoClose:3000,type:"success",closeButton:"true",theme:"colored"})
//                 localStorage.setItem("userEmail",userEmail);
//                 navigate("/home");
//             }
//         })
//         .catch((err) => {
//             toast(err.response.data,{autoClose:3000,type:"error",closeButton:"true",theme:"colored"})
//             setEmailDisabled(false);
//             setOtp();
//             setCheck(false);
//         })
//         .finally(()=>{
//             setLoading(false);
//         })
//     }
//     return(
//     <div className='container login' style={{padding:"25px",minWidth:"100vw",minHeight:"100vh",backgroundColor:"#80808070",margin:0}} >
//         <DotLoader
//         color={"#fbfbfb"}
//         loading={loading}
//         cssOverride={override}
//         // style={{position:"fixed"}}
//         size={80}
//         aria-label="Loading Spinner"
//         data-testid="loader"
//       />
//         <div className='row'>
//             <div className="col-md-8">
//                 <div className='row'>
//                     <img src={LoginImg} alt="Login Img"></img>
//                 </div>
//             </div>
//             <div className="col-md-4 ">
//                 <form style={{height:"500px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}} onSubmit={(e)=>handleValidateOTP(e)}>
//                 <div className='row'>
//                     <label className='emailId'>Email-Id</label>
//                     <input type='email' className='input' required value={userEmail} disabled={emailDisabled} onChange={e => setUserEmail(e.target.value)}></input>
//                     {error && !userEmail ? <span style={{color:"red"}}>*Required</span> : null}
//                 </div>
//                 {check ? 
//                 <div className='row mt-3'>
//                     <label className='otp'>OTP</label>
//                     <input type='text' className='input' required value={otp} onChange={e => setOtp(e.target.value)}></input>
//                     {error && !otp ?  <span style={{color:"red"}}>*Required</span>: null}
//                 </div>
//                 : null }
//                 <div className='row mt-3'>
//                     <div className='col' style={{textAlign:"center"}}>
//                     {check ? <button className='btn btn-primary' type='submit'>Validate OTP</button> : <button className='btn btn-primary' onClick={e => handleSendOTP(e)}>Send OTP</button>}
//                     </div>
                    
//                 </div>
//                 </form>
//             </div>
//         </div>
//     </div>
//     )
// };

// export default Login;


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
                toast("OTP Verified",{autoClose:3000,type:"success",closeButton:"true",theme:"colored"})
                localStorage.setItem("userEmail",userEmail);
                if (res.data["User exists"]) {
                    navigate("/courseList");
                } else {
                    navigate("/UserProfile");
                }
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
    <div className="container-fluid" style={{height:"100vh",backgroundColor:"#010134",overflow:"auto"}}>
        {/* <DotLoader
        color={"#fbfbfb"}
        loading={loading}
        cssOverride={override}
        // style={{position:"fixed"}}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> */}
        <div className="row">
            <div className="col-12 col-md-9" style={{display:"flex",justifyContent:"center"}}>
                <img src={LoginImg} style={{width:"clamp(80%,50%,100%)",paddingTop:"40px"}}></img>
            </div>
            <div className="col-12 col-md-3">
                <form onSubmit={(e)=>handleValidateOTP(e)}>
                    <div className="row">
                        <div className="col">
                            <h2 style={{color:"white",fontFamily:"sans-serif",marginTop:"70px",textAlign:"start"}}>Welcome to FAF !</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h6 style={{color:"white",fontFamily:"serif",textAlign:"start",marginTop:"10px"}}>Email Address <span style={{color:"red"}}>*</span></h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input className='email form-control' type='email' required style={{backgroundColor:"transparent",color:"white"}} placeholder='Enter Your Email-Id'  value={userEmail} disabled={emailDisabled} onChange={e => setUserEmail(e.target.value)}></input>
                        </div>
                    </div>
                    {check ?
                    <>
                    <div className="row mt-2">
                        <div className="col">
                            <h6 style={{color:"white",fontFamily:"serif",textAlign:"start",marginTop:"10px"}}>OTP <span style={{color:"red"}}>*</span></h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input className='email form-control' type='text' required style={{backgroundColor:"transparent",color:"white"}} placeholder='Enter OTP' value={otp} onChange={e => setOtp(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col">
                            <span style={{color:"red",fontSize:"10px"}}>Please check , OTP has sent your Email-Id.</span>
                        </div>
                    </div>
                    </>:null}
                    <div className="row mt-4">
                        <div className="col" style={{display:"flex",justifyContent:"center"}}>
                        {check ? <button className='btn' style={{backgroundColor:"white",color:"#010134",width:"100vw"}} disabled={loading} type='submit'>Validate OTP</button> :<button type='submit' className='btn' style={{backgroundColor:"white",color:"#010134",width:"100vw"}} disabled={loading}  onClick={e => handleSendOTP(e)}> Send OTP</button>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
};
 
export default Login;