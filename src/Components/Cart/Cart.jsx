// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Tippy from "@tippyjs/react";
// import Card from "react-bootstrap/Card";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import Organization from "../Images/organization.png";
// import Header from "../Header/Header";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import { removeCourse } from "../../features/courses/courseSlice";
// import axios from "axios";
// // import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import Modal from "react-bootstrap/Modal";
// import { toast } from "react-hot-toast";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// function Cart() {
//   const selectedCourses = useSelector((state) => state.course.courses);
//   const baseUrl = useSelector((state) => state.login.baseUrl);
//   console.log(selectedCourses);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);
//   const [firstName, setFirstName] = useState(null);
//   const [lastName, setLastName] = useState(null);
//   const [mobileNumber, setMobileNumber] = useState(null);
//   const [checkInputFields, setCheckInputFields] = useState(false);

//   const handleProceedToCheckout = (e) => {
//     e.preventDefault();
//     let json = {
//       userId: localStorage.getItem("userEmail"),
//       userName: firstName + " " + lastName,
//       userContact: mobileNumber,
//       courses: selectedCourses,
//     };
//     if (!(firstName && lastName && mobileNumber)) {
//       setCheckInputFields(true);
//     }
//     setShowModal(false);

//     const toastId = toast.loading("Please wait...");
//     axios
//       .post(`${baseUrl}gkt/faf/course/storeCourseOrder`, json)
//       .then((res) => {
//         if (res.status === 200) {
//           toast.dismiss(toastId);
//           toast(
//             `Thank you!\n One of our sales team will get in touch with you shortly.`,
//             {
//               type: "success",
//               autoClose: 5000,
//             }
//           );
//           navigate("/courseList");
//         }
//       })
//       .catch((err) => {
//         setShowModal(false);
//         toast.dismiss(toastId);
//         toast(
//           `Error while proceeding to checkout`,
//           {
//             type: "error",
//             autoClose: 5000,
//           }
//         );
//       });
//   };

//   const removeCorseFromCart = (e, id) => {
//     e.preventDefault();
//     dispatch(removeCourse(id));
//   };
//   return (
//     <div>
//       <Header />
      
//       <div className="row">
//         <div className="col">
//             <ArrowBackIcon style={{border:"2px solid black",marginLeft:"0.5rem",borderRadius:"50%",cursor:"pointer"}} onClick={()=>navigate("/home")} />
//         </div>
//         {selectedCourses.length>0 ?
//         <div className="col mt-1">
//           <button
//             className="btn btn-primary"
//             style={{ float: "right" }}
//             onClick={(e) => setShowModal(true)}
//           >
//             Proceed to checkout
//           </button>
//         </div> : null }
//       </div>
//       {selectedCourses.length > 0 ? (
//         <>
//           <div className="row mt-2">
//             {selectedCourses.map((course, index) => (
//               <div className=" col-12 col-md-3 mt-3" key={index}>
//                 <Card style={{ height: "45vh", marginLeft: "10px" }}>
//                   <Card.Header
//                     style={{
//                       height: "12vh",
//                       fontWeight: "bold",
//                       fontSize: "14px",
//                     }}
//                   >
//                     <div
//                       className="row"
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-around",
//                       }}
//                     >
//                       <div className="col-10"> {course.title}</div>
//                       <div className="col-1">
//                         {" "}
//                         <DeleteForeverIcon
//                           onClick={(e) => removeCorseFromCart(e, course.id)}
//                           style={{ cursor: "pointer" }}
//                         />
//                       </div>
//                     </div>
//                   </Card.Header>
//                   <Card.Body>
//                     <Card.Text>
//                       <span
//                         style={{
//                           backgroundColor: "#80808085",
//                           borderRadius: "5px",
//                           padding: "1px",
//                           fontSize: "13px",
//                         }}
//                       >
//                         {course.courseCode}
//                       </span>
//                     </Card.Text>
//                     <Card.Text>
//                       {course?.customized === "Y" ? (
//                         <>
//                           <h6>Selected Modules : </h6>
//                           <ul style={{ overflowY: "auto", height: "110px",scrollbarWidth:"thin" }}>
//                             {course.courseModule.map((module) => (
//                               <li>{module.title}</li>
//                             ))}
//                           </ul>
//                         </>
//                       ) : null}
//                     </Card.Text>
//                   </Card.Body>
//                 </Card>
//               </div>
//             ))}
//           </div>
//         </>
//       ) : (
//         <span
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "85vh",
//             opacity: "0.7",
//           }}
//         >
//           Cart is Empty
//         </span>
//       )}

//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header></Modal.Header>
//         <form onSubmit={(e) => handleProceedToCheckout(e)}>
//           <Modal.Body className="modal-body">
//             <div className="row">
//               <div className="row">
//                 <div className="col-md-4">
//                   <label for="firstName">First Name :</label>
//                 </div>
//                 <div className="col-md-8">
//                   <input
//                     type="text"
//                     id="firstName"
//                     style={{
//                       width: "100%",
//                       borderRadius: "10px",
//                       padding: "4px",
//                     }}
//                     required
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                   ></input>
//                   {checkInputFields ? (
//                     <span style={{ color: "red" }}>*required</span>
//                   ) : null}
//                 </div>
//               </div>
//               <div className="row mt-3">
//                 <div className="col-md-4">
//                   <label for="lastName">Last Name :</label>
//                 </div>
//                 <div className="col-md-8">
//                   <input
//                     type="text"
//                     id="lastName"
//                     style={{
//                       width: "100%",
//                       borderRadius: "10px",
//                       padding: "4px",
//                     }}
//                     required
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                   ></input>
//                   {checkInputFields ? (
//                     <span style={{ color: "red" }}>*required</span>
//                   ) : null}
//                 </div>
//               </div>
//               <div className="row mt-3">
//                 <div className="col-md-4">
//                   <label for="mobileNumber">Mobile Number :</label>
//                 </div>
//                 <div className="col-md-8">
//                   <input
//                     type="tel"
//                     id="mobileNumber"
//                     style={{
//                       width: "100%",
//                       borderRadius: "10px",
//                       padding: "4px",
//                     }}
//                     required={true}
//                     value={mobileNumber}
//                     onChange={(e) => setMobileNumber(e.target.value)}
//                   ></input>
//                   {checkInputFields ? (
//                     <span style={{ color: "red" }}>*required</span>
//                   ) : null}
//                 </div>
//               </div>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <button
//               className="btn btn-primary"
//               type="submit"
//             >
//               Submit
//             </button>
//           </Modal.Footer>
//         </form>
//       </Modal>
//     </div>
//   );
// }
// export default Cart;


import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tippy from "@tippyjs/react";
import Card from "react-bootstrap/Card";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Organization from "../Images/organization.png";
import Header from "../Header/Header";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { removeCourse } from "../../features/courses/courseSlice";
import axios from "axios";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-hot-toast";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import emptycart from "../Images/emptycart.png";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { addCourse,addCartCourses } from '../../features/courses/courseSlice';
// import "./cart.css";
function Cart() {
  const selectedCourses = useSelector((state) => state.course.courses);
  const baseUrl = useSelector((state) => state.login.baseUrl);
  console.log(selectedCourses);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [checkInputFields, setCheckInputFields] = useState(false);
 
  const handleProceedToCheckout = (e) => {
    e.preventDefault();
    let json = {
      userId: localStorage.getItem("userEmail"),
      userName: firstName + " " + lastName,
      userContact: mobileNumber,
      courses: selectedCourses,
    };
    if (!(firstName && lastName && mobileNumber)) {
      setCheckInputFields(true);
    }
    setShowModal(false);
 
    const toastId = toast.loading("Please wait...");
    axios
      .post(`${baseUrl}gkt/faf/course/storeCourseOrder`, json)
      .then((res) => {
        if (res.status === 200) {
          toast.dismiss(toastId);
          toast(
            `Thank you!\n One of our sales team will get in touch with you shortly.`,
            {
              type: "success",
              autoClose: 5000,
            }
          );
          navigate("/home");
        }
      })
      .catch((err) => {
        setShowModal(false);
        toast.dismiss(toastId);
        toast(
          `Error while proceeding to checkout`,
          {
            type: "error",
            autoClose: 5000,
          }
        );
      });
  };
 
  const removeCorseFromCart = async(e, id,courseCode) => {
    e.preventDefault();
    try {
      // Call the API to store the course in the cart
      const response = await axios.post(`${baseUrl}gkt/faf/cart/delete/${localStorage.getItem("userEmail")}/${courseCode}`,); // Replace with your API URL
 
      // Check if the response is successful
      if (response.status === 200) {
        dispatch(removeCourse(id));
        toast("Course deleted in your Cart", { autoClose: 3000, CloseButton: true, type: "success", theme: "colored" });
        console.log(response.data);
      } else {
        toast("Failed to delete course in cart", { autoClose: 3000, CloseButton: true, type: "error", theme: "colored" });
      }
    } catch (error) {
      // Handle any errors that occur during the API call
      toast("Error while deleting course in cart", { autoClose: 3000, CloseButton: true, type: "error", theme: "colored" });
      console.error("Error adding course to cart:", error);
     
    }    
  };
  useEffect (()=>{
    fetchCartData();    
  },[]);
  function fetchCartData() {
    // return async () => {
        axios.get(`${baseUrl}gkt/faf/cart/${localStorage.getItem("userEmail")}`)
        .then(res =>{
          dispatch(addCartCourses(res.data.courses));
          console.log("cart data message", res.data);
        })
        .catch(err =>{
          console.log(err);
        })      
  }
  return (
    <div className="container-fluid" style={{ height: "100vh", backgroundColor: "#010134", overflow: "auto", padding: "0px" }}>
      <Header />
      <div className="row mt-1">
        <div className="col-2 col-md-1">
          <button className="btn" style={{outline:"none",color:"white",fontSize:"15px",fontFamily:"serif",whiteSpace:"nowrap"}} onClick={()=>navigate("/home")}><ArrowBackIcon/>Back</button>
        </div>
        {selectedCourses.length>0 ?
        <div className="col-10 col-md-11" style={{display:"flex",justifyContent:"end"}}>
          <button className="btn btn-sm mt-1" style={{fontFamily:"sans-serif",backgroundColor:"white",color:"#010134",width:"fit-content",marginRight:"5px"}}  onClick={(e) => setShowModal(true)}>Checkout</button>
        </div>:null}
      </div>
      {selectedCourses.length > 0 ? (
        <>
          <div className="row p-1">
            {selectedCourses.map((course, index) => (
              <div className=" col-12 col-md-3 mt-3" key={index}>
                <Card style={{ height: "40vh",padding:"0px"}}>
               
                   <div className="row">
                    <div className="col-10 col-md-10">
                      <span style={{padding:"4px",fontWeight:"bold",fontFamily:"sans-serif",fontSize:"13px"}}>{course.title} </span>
                    </div>
                    <div className="col-2 col-md-2">
                    <DeleteForeverIcon
                          onClick={(e) => removeCorseFromCart(e, course.id,course.courseCode)}
                          style={{ cursor: "pointer",color:"#cf0101",fontSize:"18px" }}
                        />
                    </div>
                   </div>
                   <hr  />
                   <div className="row">
                    <div className="col ">
                    <span
                        style={{
                          backgroundColor: "#80808085",
                          borderRadius: "5px",
                          padding: "2px",
                          fontSize: "13px",
                          marginLeft:"3px",
                          fontFamily:"sans-serif"
                        }}
                      >
                        {course.courseCode}
                      </span>
                      </div>
                      </div>
                      <div className="row">
                        <div className="col">
                        {course?.customized === "Y" ? (
                        <>
                          <span style={{fontWeight:"bold",fontSize:"12px",marginLeft:"3px",fontFamily:"sans-serif"}}>Selected Modules : </span>
                          <ul style={{ overflowY: "auto", height: "110px",scrollbarWidth:"none",fontFamily:"serif" }}>
                            {course.courseModule.map((module) => (
                              <li>{module.title}</li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                        </div>
                      </div>
                </Card>
              </div>
            ))}
          </div>
        </>
      ) : (<>
      <div className="row">
        <div className="col" style={{display:"flex",justifyContent:"center"}}>
        <img src={emptycart} style={{width:"clamp(24vw,5vw,40vw)",}}></img>
        </div>
      </div>
      <div className="row">
        <div className="col" style={{display:"flex",justifyContent:"center"}}>
        <h4 style={{color:"white"}}>Your Cart is Empty</h4>
        </div>
      </div>
      </>
      )}
      <Modal className="modal-sm" show={showModal} onHide={() => setShowModal(false)}>
        <div className="row">
          <div className="col">
            <img src={Organization} style={{width:"120px",marginLeft:"5px",marginTop:"10px"}}></img>
          </div>
      </div>
      <hr/>
      <div className="row mt-1">
        <div className="col">
          <span style={{fontSize:"20px",fontFamily:"sans-serif",color:"#010134",fontWeight:"bold"}}>Order Summary</span>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-8">
           <span style={{fontFamily:"serif"}}>Product Subtotal</span>
        </div>
        <div className="col-4">
           <span style={{color:"gray",fontFamily:"serif"}}><CurrencyRupeeIcon style={{fontSize:"17px"}}/>5000</span>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-8">
           <span style={{fontFamily:"serif"}}>GST</span>
        </div>
        <div className="col-4">
           <span style={{color:"gray",fontFamily:"serif"}}><CurrencyRupeeIcon style={{fontSize:"17px"}}/>5000</span>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-8">
           <span style={{fontFamily:"serif"}}>PST/QST</span>
        </div>
        <div className="col-4">
           <span style={{color:"gray",fontFamily:"serif"}}><CurrencyRupeeIcon style={{fontSize:"17px"}}/>5000</span>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <hr/>
        </div>
      </div>
      <div className="row ">
        <div className="col-8">
           <span style={{fontFamily:"serif"}}>Order Total</span>
        </div>
        <div className="col-4">
           <span style={{color:"gray" ,whiteSpace:"nowrap",fontFamily:"serif"}}><CurrencyRupeeIcon style={{fontSize:"17px"}}/>5000</span>
        </div>
      </div>
      <div className="row mt-2 p-1">
        <div className="col">
          <button className="btn checkout" style={{backgroundColor:"#eded48",color:"black",fontFamily:"sans-serif",border:"none"}}>Continue</button>
        </div>
      </div>
        {/* <form onSubmit={(e) => handleProceedToCheckout(e)}>
          <Modal.Body className="modal-body">
            <div className="row">
              <div className="row">
                <div className="col-md-4">
                  <label for="firstName">First Name :</label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="firstName"
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      padding: "4px",
                    }}
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></input>
                  {checkInputFields ? (
                    <span style={{ color: "red" }}>*required</span>
                  ) : null}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-4">
                  <label for="lastName">Last Name :</label>
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="lastName"
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      padding: "4px",
                    }}
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  ></input>
                  {checkInputFields ? (
                    <span style={{ color: "red" }}>*required</span>
                  ) : null}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-4">
                  <label for="mobileNumber">Mobile Number :</label>
                </div>
                <div className="col-md-8">
                  <input
                    type="tel"
                    id="mobileNumber"
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      padding: "4px",
                    }}
                    required={true}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  ></input>
                  {checkInputFields ? (
                    <span style={{ color: "red" }}>*required</span>
                  ) : null}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-primary"
              type="submit"
            >
              Submit
            </button>
          </Modal.Footer>
        </form> */}
      </Modal>
    </div>
  );
}
export default Cart;