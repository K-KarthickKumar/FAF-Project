import React, { useState } from "react";
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
          navigate("/courseList");
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

  const removeCorseFromCart = (e, id) => {
    e.preventDefault();
    dispatch(removeCourse(id));
  };
  return (
    <div>
      <Header />
      
      <div className="row">
        <div className="col">
            <ArrowBackIcon style={{border:"2px solid black",marginLeft:"0.5rem",borderRadius:"50%",cursor:"pointer"}} onClick={()=>navigate("/home")} />
        </div>
        {selectedCourses.length>0 ?
        <div className="col mt-1">
          <button
            className="btn btn-primary"
            style={{ float: "right" }}
            onClick={(e) => setShowModal(true)}
          >
            Proceed to checkout
          </button>
        </div> : null }
      </div>
      {selectedCourses.length > 0 ? (
        <>
          <div className="row mt-2">
            {selectedCourses.map((course, index) => (
              <div className=" col-12 col-md-3 mt-3" key={index}>
                <Card style={{ height: "45vh", marginLeft: "10px" }}>
                  <Card.Header
                    style={{
                      height: "12vh",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    <div
                      className="row"
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <div className="col-10"> {course.title}</div>
                      <div className="col-1">
                        {" "}
                        <DeleteForeverIcon
                          onClick={(e) => removeCorseFromCart(e, course.id)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <span
                        style={{
                          backgroundColor: "#80808085",
                          borderRadius: "5px",
                          padding: "1px",
                          fontSize: "13px",
                        }}
                      >
                        {course.courseCode}
                      </span>
                    </Card.Text>
                    <Card.Text>
                      {course?.customized === "Y" ? (
                        <>
                          <h6>Selected Modules : </h6>
                          <ul style={{ overflowY: "auto", height: "110px",scrollbarWidth:"thin" }}>
                            {course.courseModule.map((module) => (
                              <li>{module.title}</li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </>
      ) : (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "85vh",
            opacity: "0.7",
          }}
        >
          Cart is Empty
        </span>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header></Modal.Header>
        <form onSubmit={(e) => handleProceedToCheckout(e)}>
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
              type="submit" /*onClick={(e) => handleProceedToCheckout(e)}*/
            >
              Submit
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
export default Cart;
