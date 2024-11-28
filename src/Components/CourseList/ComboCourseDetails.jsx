import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import { useSelector, useDispatch } from "react-redux";
import { addCourse } from '../../features/courses/courseSlice';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const ComboCourseDetails = () => {

    const location = useLocation();
    const [selectedCourse, setSelectedCourse] = useState(location.state.course);
    const customizedCourses = location.state.cusCourses;
    const selectedCourses = useSelector(state => state.course.courses);
    const [customize, setCustomize] = useState(false);
    const [modulesList, setModulesList] = useState([]);
    return (
        <div className='container-fluid' style={{ background: "#152c75", color: "white", margin: 0, padding: 0, minHeight: "100vh" }}>
            <Header />
            <div className="row" style={{ margin: 0, lineHeight: "160%" }}>
                <div className="col-12 col-md-7" style={{ paddingBlock: "3rem" }}>
                    <div style={{ paddingInlineEnd: "2rem" }}>
                        <h1 style={{ marginBottom: "1rem", fontWeight: "600", lineHeight: "1.125" }}>{selectedCourse.title}</h1>

                        <p style={{ paddingBlockEnd: "1.5rem" }}>{ }</p>
                        <div className="row">
                            <button className='btn btn-primary mx-2 px-3' style={{ width: "auto" }} onClick={e => addCourseToCart(e)}>Add to cart</button>
                        </div>

                    </div>
                </div>
                <div className="col-12 col-md-5" >
                    {/* <div className="card" style={{marginTop:"3rem"}}>
            <div className="row" style={{margin:"0px"}}>
                <div className="col">
                    <h5>Modules</h5>
                </div>
            </div>
            
            {customize ? <div className='row'>
              <div className="col">
                <ul style={{ textAlign: "justify",margin:"16px 0 16px 20px" }}>
                  {selectedCourse?.courseModule.map((course) =>
                  <div style={{marginInlineEnd:"10px"}}>
                  <input type='checkbox' onChange={e => {handleAddModules(e,course)}}  /> <span>{course.title}{course?.isCusModule && <span style={{color:"green",background:"yellow",fontSize:"0.5rem",position:"relative",top:"-5px",left:"2px"}}>*RECOMMENDED</span>}</span>
                  </div>
                        // <li className='module-title'>{course.title}{course?.isCusModule && <span style={{color:"green",background:"yellow",fontSize:"0.5rem",position:"relative",top:"-5px",left:"2px"}}>*RECOMMENDED</span>}
                        // </li>
                      )
                  }
                    
                 
                </ul>
                <div className='mb-2' style={{display:"flex",justifyContent:"center"}}>
                <button className='btn btn-primary' onClick={e => addCustomizedCourseToCart()}>Add to cart</button>
                <button className='btn btn-primary mx-2' onClick={e => {setCustomize(false)}}>Cancel</button>
                </div>
                </div>
              </div> :
            <div className="row" style={{margin:"0px"}}>
                <div className="col">
                <ul style={{ textAlign: "justify",margin:"16px 0 16px 20px" }}>
                  {selectedCourse?.courseModule.map((course) =>
                  
                        <li className='module-title'>{course.title}{course?.isCusModule && <span style={{color:"green",background:"yellow",fontSize:"0.5rem",position:"relative",top:"-5px",left:"2px"}}>*RECOMMENDED</span>}
                          
                        </li>
                      )
                  }
                    
                 
                </ul>
                </div>
            </div>}
        </div> */}
                </div>

            </div>
            <div className="row" style={{ width: "100%" }}>
                <div className="col">
                {
                    selectedCourse.courses.map(course =>
                        <div className='row mt-2 mb-5'>
                            <div className='col-12 col-md-7 '>
                                <h1>{course.title}</h1>
                                <p style={{fontSize:"clamp(1.2rem,2.5vh,2rem)"}}>{course.courseDesc}</p>
                            </div>
                            <div className="col-1"></div>
                            <div className="col-md-4 col-12" style={{ margin: 0, padding: 0 }}>
                                <div className="card" /*style={{ marginTop: "3rem" }}*/>
                                    <div className="row" style={{ margin: "0px" }}>
                                        <div className="col">
                                            <h5>What you'll learn</h5>
                                        </div>
                                    </div>

                                    
                                        <div className="row" style={{ margin: "0px" }}>
                                            <div className="col">
                                                <ul style={{ textAlign: "justify", margin: "16px 0 16px 20px" }}>
                                                    {course?.courseModule.map((c) =>

                                                        <li className='module-title'>{c.title}{c?.isCusModule && <span style={{ color: "green", background: "yellow", fontSize: "0.5rem", position: "relative", top: "-5px", left: "2px" }}>*RECOMMENDED</span>}

                                                        </li>
                                                    )
                                                    }


                                                </ul>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default ComboCourseDetails;