import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { useSelector, useDispatch } from "react-redux";
import { addCourse } from '../../features/courses/courseSlice';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
const CourseDetails = () => {
    const location  = useLocation();
    const [selectedCourse,setSelectedCourse] = useState(location.state.course);
    const customizedCourses = location.state.cusCourses;
    const selectedCourses = useSelector(state => state.course.courses);
    const[customize,setCustomize] = useState(false);
    const[modulesList,setModulesList] = useState([]);

    useEffect(()=>{
        if(customizedCourses.length > 0){
            const selCusCourse = customizedCourses.find(c => c.id === selectedCourse.id);
            const clone = {...selectedCourse};
            clone.courseModule.map((mod)=>{
              selCusCourse.courseModule.map(module =>{
                if(module.id === mod.id){
                  mod.isCusModule = "Y"
                }
              })
            })
            setSelectedCourse(clone);
            console.log(selectedCourse);
        }

    },[]);
    const dispatch = useDispatch();
    const addCourseToCart = (e) => {
        e.preventDefault();
        const courseExists = selectedCourses.filter(cartCourse => cartCourse.id === selectedCourse.id);
        if (courseExists.length > 0) 
        {
          if (courseExists[0].customized === "Y") {
            // setCustomizedCourse(courseExists[0]);
            // setShowCustomizedCourseModal(true);
            // setChangeCustomizedCourse(course);
          }
          else {
            toast("The course is already in the cart", { autoClose: 3000, CloseButton: true, type: "error", theme: "colored" });
          }
        }
        else {
            const clone = {...selectedCourse};
            clone.customized = "N"
          dispatch(addCourse(clone));
        toast("Course Added to Cart", { autoClose: 3000, CloseButton: true, type: "success", theme: "colored" });
        }
      }

      const handleAddModules =(e,module) =>{
        if(e.target.checked){
          setModulesList(m => [...m,module]);
        }
        else{
          setModulesList(md => md.filter(m => m.id !== module.id));
        }
      }

      function addCustomizedCourseToCart(){
        if(modulesList.length === 0){
          return toast.error("Please select altleast one module");
        }
        const c = {...selectedCourse}
        c.courseModule = modulesList;
        c.customized = "Y";        
        dispatch(addCourse(c));
        toast("Course Added to Cart", { autoClose: 3000, CloseButton: true, type: "success", theme: "colored" });

      }
  return (
    <>
    
    <div className='container-fluid' style={{background:"#152c75",color:"white",margin:0,padding:0,minHeight:"100vh"}}>
    <Header />
    <div className="row" style={{margin:0,lineHeight:"160%"}}>
        <div className="col-12 col-md-7" style={{paddingBlock:"3rem"}}>
            <div style={{paddingInlineEnd:"2rem"}}>
        <h1 style={{marginBottom:"1rem",fontWeight:"600",lineHeight:"1.125"}}>{selectedCourse.title}</h1>
        <span style={{background:"yellow",color:"black",paddingInline:"5px",borderRadius:"5px"}}>Partner : {selectedCourse.partner}</span>
        
        <p style={{paddingBlockEnd:"1.5rem",fontSize:"clamp(1.2rem,2.5vh,2rem)"}}>{selectedCourse.courseDesc}</p>
        <div className="row">
            <button className='btn btn-primary mx-2 px-3' style={{width:"auto",fontSize:"clamp(1.2rem,2.5vh,2rem)"}} onClick={e => addCourseToCart(e)}>Add to cart</button>
            <button className='btn btn-primary mx-2 px-3' style={{width:"auto",fontSize:"clamp(1.2rem,2.5vh,2rem)"}} onClick={e => setCustomize(!customize)}>Customize</button>
        </div>
        
        </div>
        </div>
        <div className="col-12 col-md-5" >
        {/* <div style={{padding:"1.5rem",background:"white",color:"black",borderRadius:".375rem",maxWidth:"500px",alignSelf:"flex-start"}}>
            <p style={{wordWrap:"break-word",marginTop:"1rem",marginBottom:"0",fontWeight:"bold"}}>Modules</p>
            <ul style={{ textAlign: "justify",margin:"16px 0 16px 38px" }}>
                  {selectedCourse?.courseModule.map((course) =>
                  
                        <li className='module-title'>{course.title}
                          <ul>
                            {course?.chapter?.map((chap) =>
                            
                              <li >{chap.title}</li>
                              
                            )}
                          </ul>
                        </li>
                      )
                  }
                    
                 
                </ul>
        </div> */}
        <div className="card" style={{marginTop:"3rem"}}>
            <div className="row" style={{margin:"0px"}}>
                <div className="col">
                    <h5 style={{fontSize:"clamp(1.2rem,2.5vh,2rem)"}}>Modules</h5>
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
                  
                        <li className='module-title' /*style={{fontSize:"clamp(1.2rem,2.5vh,2rem)"}}*/ >{course.title}{course?.isCusModule && <span style={{color:"green",background:"yellow",fontSize:"0.5rem",position:"relative",top:"-5px",left:"2px"}}>*RECOMMENDED</span>}
                          {/* <ul>
                            {course?.chapter?.map((chap) =>
                            
                              <li ><span>{chap.title}</span></li>
                              
                            )}
                          </ul> */}
                        </li>
                      )
                  }
                    
                 
                </ul>
                </div>
            </div>}
        </div>
        </div>
        
    </div>
    </div>
    </>
    
  )
}

export default CourseDetails