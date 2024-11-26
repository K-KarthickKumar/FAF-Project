import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import { FaRegEdit } from "react-icons/fa";
import Tippy from '@tippyjs/react';
import Modal from 'react-bootstrap/Modal';
import 'tippy.js/dist/tippy.css';
// import EditIcon from "./Images/edit1.png";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import axios from 'axios';
import './CourseList.css';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from '../../features/courses/courseSlice';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Header from '../Header/Header';
import ReactFlow, { useStoreApi } from "react-flow-renderer";
// import { CloseButton, toast } from 'react-toastify';
import {toast} from 'react-hot-toast';
import { removeCourse } from "../../features/courses/courseSlice";
import CouseModules from '../DragNDrop/DragNDrop';

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 50 },
    type: "input",
    sourcePosition: "right",
    data: { label: "Course Customization" },
  },
  {
    id: "2",
    position: { x: 250, y: 50 },
    data: { label: "Requirement Sharing" },
    type: "bidirectional",
    sourcePosition: "right",
    targetPosition: "left",
  },
  {
    id: "3",
    position: { x: 500, y: 50 },
    data: { label: "Certification Recommendation" },
    type: "bidirectional",
    sourcePosition: "right",
    targetPosition: "left",
  },
  {
    id: "4",
    position: { x: 750, y: 50 },
    type: "output",
    targetPosition: "left",
    data: { label: "Confirmation" },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: false,
    style: { stroke: "#ccc", arrowHeadColor: "green" },
    sourceHandle: "b",
    targetHandle: "a",
    targetPosition: "left",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: false,
    style: { stroke: "#ccc", arrowHeadColor: "green" },
    sourceHandle: "b",
    targetHandle: "a",
    sourcePosition: "right",
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: false,
    style: { stroke: "#ccc", arrowHeadColor: "green" },
    sourceHandle: "b",
    targetHandle: "a",
    sourcePosition: "right",
  },
];


function CourseList() {
  const navigate = useNavigate();
  const baseUrl = useSelector(state => state.login.baseUrl);
  const userEmail = useSelector(state => state.login.userEmail);

  useEffect(() => {
    if (!localStorage.getItem("userEmail")) {
      navigate("/");
    }
  }, []);
  const [show, setShow] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [filter, setFilter] = useState('');

  const [keyword, setKeyword] = useState("");
  const [courses, setCourses] = useState([]);
  const [descriptionContent, setDescriptionContent] = useState();

  const[showModules,setShowModules] = useState(false);
  const[fullCourses,setFullCourses] = useState([]);


  const dispatch = useDispatch();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [nodeColor, setNodeColor] = useState("#ccc");
  const [labelColor, setLabelColor] = useState("#000");
  const [edges, setEdges] = useState(initialEdges);
  const [clickCount, setClickCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [customizedCourse, setCustomizedCourse] = useState();
  const [showCustomizedCourseModal, setShowCustomizedCourseModal] = useState(false)
  const[changeCustomizedCourse,setChangeCustomizedCourse] = useState();
  const seletedCourses = useSelector(state => state.course.courses)
  const[userStringInput,setUserStringInput] = useState("");
  const[userFileInput,setUserFileInput] = useState(null);

  const[selectedCourse,setSelectedCourse] = useState("");
  const[selectedCourseName,setSelectedCourseName] = useState("");
  const[loading,setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${baseUrl}gkt/faf/course/getAllCourses`)
      .then((res) => {
        setCourses(res.data);
        setFullCourses(res.data);
      })
      .catch(err => console.log(err));
      
  }, []);

  function searchKeyword(e) {
    e.preventDefault();
    axios.post(`${baseUrl}gkt/faf/course/getCourseNames?keyWords=${keyword}`).
      then((res) => {
        setCourses(res.data);
      })
  }

  const handleClose = () => {setShow(false);setValue("1");}

  const handleShow = (course) => {
    setDescriptionContent(course);
    setShow(true);
  };

  const handleCustomize = (courseCode) => {
    navigate("/customize", { state: { code: courseCode } });
  }

  
  const addCourseToCart = (e, course) => {
    e.preventDefault();
    const courseExists = seletedCourses.filter(cartCourse => cartCourse.id === course.id);
    if (courseExists.length > 0) 
    {
      if (courseExists[0].customized === "Y") {
        setCustomizedCourse(courseExists[0]);
        setShowCustomizedCourseModal(true);
        setChangeCustomizedCourse(course);
      }
      else {
        toast("The course is already in the cart", { autoClose: 3000, CloseButton: true, type: "warning", theme: "colored" });
      }
    }
    else {
      const SlCourse = course
      SlCourse.customized = "N"
      dispatch(addCourse(SlCourse));
    toast("Course Added to Cart", { autoClose: 3000, CloseButton: true, type: "success", theme: "colored" });
    }
  }

  const handleAddCourseForCustomized = () => {
        setChangeCustomizedCourse((prev) => ({
          ...prev,
          customized: "N",
        }));
        dispatch(addCourse(changeCustomizedCourse));
        setShowCustomizedCourseModal(false);
        toast("Course Added to Cart", { autoClose: 3000, CloseButton: true, type: "success", theme: "colored" }); 
  }


  const handleContinue = () => {
    if (clickCount === 0) {
      setNodeColor("green");
      setLabelColor("white");
      setEdges((prevEdges) =>
        prevEdges.map((edge) =>
          edge.source === "1" && edge.target === "2"
            ? { ...edge, animated: true, style: { stroke: "green" } }
            : edge
        )
      );
      setClickCount(1);
      setIsAnimating(true);
    } else if (clickCount === 1) {
      setNodeColor("green");
      setLabelColor("white");
      setEdges((prevEdges) =>
        prevEdges.map((edge) =>
          edge.source === "2" && edge.target === "3"
            ? { ...edge, animated: true, style: { stroke: "green" } }
            : edge
        )
      );
      setClickCount(2);
      setIsAnimating(true);
    }
    else if (clickCount === 2) {
      setNodeColor("green");
      setLabelColor("white");
      setEdges((prevEdges) =>
        prevEdges.map((edge) =>
          edge.source === "3" && edge.target === "4"
            ? { ...edge, animated: true, style: { stroke: "green" } }
            : edge
        )
      );
      setClickCount(3);
      setIsAnimating(true);
    }
    else {
      setClickCount(4);
    }
  };

  const nodes = initialNodes.map((node) =>
    (node.id === "1" && clickCount !== 0) ||
      (node.id === "2" && clickCount !== 1 && clickCount !== 0) ||
      (node.id === "3" && clickCount !== 2 && clickCount !== 1 && clickCount !== 0) ||
      (node.id === "4" && clickCount === 4)
      ? {
        ...node,
        style: { background: nodeColor, color: labelColor },
        data: { ...node.data, labelStyle: { color: labelColor } },
      }
      : node
  );


  const getBorderColor = (course) => {
    let border = null;
    seletedCourses.map((cartCourse) => {
      if (course.id === cartCourse.id) {
        if (cartCourse.customized !== "Y") {
          border = {
            "border": "2px solid #6AB187",
            // "border-image": "conic-gradient( #00F260, #0575E6,#64f38c) 1"
          }
        }
        else {
          border = {
            "border": "2px solid #FEE715",
            // "border-image": "conic-gradient( red, green,purple) 1"
          }
        }
      }
    })
    return border;
  }

  function handleFileChange(e){
    setUserFileInput(e.target.files[0]);
    // let fr = new FileReader();
    // fr.onload = function () {
    //     // document.getElementById('txtfile')
    //     //     .textContent = fr.result;
    //         setUserReq(fr.result)
    // }

    // fr.readAsText(e.target.files[0]);
  }


  const removeCorseFromCart = (e, id) => {
    e.preventDefault();
    dispatch(removeCourse(id));
  };

  const lightColors = ["lightgreen","lightblue","lightgrey","lightyellow","lightpink","lightsteelblue","lightcyan","lightskyblue"];

  function pickRandomColor(){
    let num = Math.floor(Math.random()*lightColors.length);
    return lightColors[num];
  }

  const[respCourse,setRespCourse] = useState([]);


  async function handleUserInputSubmit(e){
      e.preventDefault();
      setLoading(true);
      if(!userFileInput && !userStringInput){
        toast("Please choose a file or enter the input", { autoClose: 3000, CloseButton: true, type: "error", theme: "colored" });
        return;
      }
      const fd = new FormData();
      userFileInput && fd.append("file",userFileInput);
      userStringInput && fd.append("input",userStringInput);
      fd.append("email",localStorage.getItem("userEmail"));
      await axios.post(`${baseUrl}gkt/faf/files/processAndRecommend`,fd,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      .then(res=>{
        // axios.get(`${baseUrl}gkt/faf/course/recommendcourses`)
        // .then((res) => {
          const filteredCourse = courses.filter(course => res.data.find(cr => cr.id === course.id));

          setCourses(filteredCourse);
          setRespCourse(res.data);
        // })
        // .catch(err => console.log(err))
        // .finally(()=>{
        //   setLoading(false);
        // })
      })
  }


  return (
    <>
    {loading &&
      <div className="page-loader">
        <div className="page-loading">
          <div class="spinner center">
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
            <div class="spinner-blade"></div>
          </div>
        </div>
      </div>
    }
    <div className="App" style={{maxHeight:"100vh"}}>
      
      <Header />
      <div className='row mt-2' style={{height:"88vh",width:"100%"}}>
      <div className="col-12 col-md-6" style={{height:"100%",overflow:"auto",scrollbarWidth:"thin"}}>
       
        <div className="row">
          {courses.map((course, index) => (
            <div className=' col-12 col-md-6 col-sm-6 mt-3' key={index}>
              <Card style={{ ...getBorderColor(course), height: "35vh", marginLeft: "10px" }}>
                {/* <Card.Header style={{ height: "11vh", fontWeight: "bold" }}>
                                  {course.title}
                              </Card.Header> */}
                <Card.Body style={{height:"80%",overflow:"auto"}} >

                  <Card.Text>
                    <span style={{ borderRadius: "5px", padding: "1px", fontSize: "10px" }}>
                      {course.courseCode}
                    </span>
                    <br />

                    {course.title}
                  </Card.Text>
                  <Card.Text >
                    {course.courseShtDesc}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted" style={{ display: "flex", justifyContent: "space-around", cursor: "pointer",height:"20%" }}>
                  <Tippy content="Customize">
                    <DashboardCustomizeIcon style={{ fontSize: "22px" }} title="Customize" className='icon' onClick={() => {setSelectedCourse(course);setSelectedCourseName(course.title);setShowModules(true); /*handleCustomize(course.courseCode)*/}} />
                  </Tippy>
                  <Tippy content="Course Information">
                    <InfoIcon onClick={() => handleShow(course)} className='icon' />
                  </Tippy>
                  <Tippy content="Add">
                    <AddCircleOutlineIcon className='icon' onClick={(e) => addCourseToCart(e, course)} />
                  </Tippy>
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
        </div>
        <div className="col-12 col-md-6" style={{height:"100%"}}>
        <div className="row mt-2 mb-2" style={{width:"95%",marginInline:"auto",height:"40%",border:"2px solid black",borderRadius:"10px"}}>
          <div className="col" style={{height:"100%",overflowY:"auto",padding:"10px"}}>
        <details style={{padding:"5px"}}>
          <summary>Selected Courses</summary>
          {seletedCourses.length > 0 ?
          <>
          {seletedCourses.map((cartCourse,index)=>
            <details className='mt-2' style={{marginLeft:"1rem",position:"relative"}}>
            <summary>
                <span >
              {cartCourse.title}
              <DeleteForeverIcon style={{position:"absolute",right:"0",zIndex:1}} onClick={(e) => removeCorseFromCart(e, cartCourse.id)} />
              
              </span>
              </summary>
              <div className="row modules" style={{flexWrap:"nowrap",overflow:"auto",scrollbarWidth:"thin"}}>
              {cartCourse.courseModule.map((module,id)=>
              <div className="col mx-2" style={{whiteSpace:"nowrap",minWidth:"fit-content",backgroundColor:pickRandomColor(),borderRadius:"10px",padding:"5px",fontWeight:"bold"}}><span>{module.title}</span></div>  
              )}  
              </div>
          </details>
          )}
          </>
          : <p style={{marginLeft:"1rem",opacity:"0.4"}}>No courses selected</p>
        }
          
        </details>
        </div>
        </div>
            <div className="row mb-2" style={{height:"30%",border:"2px solid green",width:"95%",marginInline:"auto",borderRadius:"10px"}}>
              <div className="col" id="txtfile" style={{maxWidth:"100%",maxHeight:"100%",overflow:"auto"}}>
                <div className="row">
                  <div className="col">
                  {/* Your Query :{userReq} */}
                  </div>
                  </div>
                {/* {respCourse.length>0 &&
                <div className="row">
                  <div className="col">
                  <span>
                  Your Recommended Courses are : 
                  </span>
                  <ul>
                    {respCourse.map(course =>
                       <li>{course}</li>
                    )}
                   
                  </ul>
                  </div>
                  
                </div> } */}
                
              </div>
            </div>
            <div className="row" style={{height:"25%",border:"2px solid #ff8b00",padding:"0px 10px",width:"95%",marginInline:"auto",borderRadius:"10px"}}>
              <div className="col" style={{padding:0}}>
                <div className="row">
                  <div className="col-7"><span>User Requirements:</span></div>
                  <div className="col-5" style={{textAlign:"end",display:"flex",gap:"1rem"}}>
                    <button className='btn btn-primary mt-1' style={{padding:"0px 10px"}} onClick={e => handleUserInputSubmit(e)}>Submit</button>
                    <button className='btn btn-primary mt-1' style={{padding:"0px 10px"}} onClick={e => {setCourses(fullCourses);setUserFileInput(null);setUserStringInput("");setRespCourse([]);}}>Clear Filter</button>
                    </div>
                  </div>
                
                
                <div className="row mt-2">
                  <div className="col-4 col-md-3"><span>Input : </span></div>
                  <div className="col-8 col-md-9"><input type='text' value={userStringInput} onChange={e => setUserStringInput(e.target.value)} style={{width:"100%",borderRadius:"10px",outline:"none",padding:"0px 5px"}}></input></div>
                  
                  
                </div>
                {/* <div className="row mt-2" >
                  <div className="col">
                  <span style={{textAlign:"center"}}>(Or)</span>
                  </div>
                  
                </div> */}
                <div className="row mt-2" >
                <div className="col-4 col-md-3"><span>File : </span></div>
                <div className="col-8 col-md-9">
                <input type="file" style={{width:"100%"}} multiple onChange={e => handleFileChange(e)}></input>
                  </div>
                  
                  
                </div>
              </div>
            </div>
        </div>
        
      </div>
      <Modal show={show} onHide={handleClose} size='lg' >
        <Modal.Header closeButton>
          <Modal.Title>{descriptionContent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body' style={{ height: "450px", overflowY: "scroll" }}>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Description" value="1" />
                  <Tab label="Modules" value="2" />

                </TabList>
              </Box>
              <TabPanel value="1">
                <p style={{ textAlign: "justify" }}>
                  {descriptionContent?.courseDesc}
                </p>
              </TabPanel>
              <TabPanel value="2">
                <ul style={{ textAlign: "justify" }}>
                  {descriptionContent?.courseModule.map((course) =>
                  {
                    let bool=false;
                    if(respCourse.length > 0){
                    let crs = respCourse.filter(resp => resp.id === descriptionContent.id);
                    bool = crs[0]?.courseModule?.find(co => course.id === co.id);
                    }
                      return(
                        <li className='module-title' style={{color:bool ? "green" : "black"}}>{course.title} {bool && <span className='recommend'>*RECOMMENDED</span> }
                          <ul>
                            {course?.chapter?.map((chap) =>
                            
                              <li >{chap.title}</li>
                              
                            )}
                          </ul>
                        </li>
                      )
                  }
                    
                  )}
                </ul>
              </TabPanel>

            </TabContext>
          </Box>
        </Modal.Body>

      </Modal>
      <Modal show={showCustomizedCourseModal} onHide={() => setShowCustomizedCourseModal(false)} >
        <Modal.Header >
        <h4>{customizedCourse?.title}</h4>
        </Modal.Header>
        <Modal.Body className='modal-body'>
          
          <h6>Customized as per below selection :</h6>
          
          <ul>
            {customizedCourse?.courseModule.map((module) =>
              <li>{module.title}</li>
            )
            }
          </ul>
          <span>Modify the selection to complete course ?</span>


        </Modal.Body>
        <Modal.Footer >
              <button className='btn btn-primary' onClick={()=> handleAddCourseForCustomized()}>Yes</button>
              <button className='btn btn-secondary' onClick={() => setShowCustomizedCourseModal(false)}>Cancel</button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModules}  onHide={()=> setShowModules(false)} size='xl' >
        <Modal.Header closeButton>
          <Modal.Title>{selectedCourseName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body' style={{ height: "450px", overflowY: "scroll" }}>
              <CouseModules recommendedModules={respCourse} customizeCourse={selectedCourse} onClose={()=> setShowModules(false)} />
        </Modal.Body>

      </Modal>
    </div>
    </>
  );
}

export default CourseList;