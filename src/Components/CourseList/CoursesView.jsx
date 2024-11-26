import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import './CoursesView.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import {setSelectedCourse } from '../../features/courses/courseSlice';

const CoursesView = () => {

    const baseUrl = useSelector(state => state.login.baseUrl);
    const[partners,setPartners] = useState([]);
    const[allCourses,setAllCourses] = useState([]);
    const[fullCourse,setFullCourse] = useState([]);
    const[loading,setLoading] = useState(false);
    const[userFileInput,setUserFileInput] = useState(null);
    const[userStringInput,setUserStringInput] = useState("");
    const[customizedCourses,setCustomizedCourses] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        axios.get(`${baseUrl}gkt/faf/course/getallpartners`)
        .then(res => setPartners(res.data))
        .catch(err => console.log(err));

        axios.get(`${baseUrl}gkt/faf/course/getAllCourses`)
        .then(res =>{ setAllCourses(res.data);setFullCourse(res.data)})
        .catch(err => console.log(err));
    },[]);

    function handleFilter(event){
        if(event.target.value.length >2){
            const filteredCourse = fullCourse.filter(course => course.title.includes(event.target.value)) 
            setAllCourses(filteredCourse);
        }
        else{
            setAllCourses(fullCourse);
        }
    }

    function clearFilter(){
        setUserFileInput(null);
        setUserStringInput("");
        setAllCourses(fullCourse);
        setCustomizedCourses([]);
    }

    function handleNavigate(course){
        // dispatch(setSelectedCourse(course));
        navigate("/courseDetails",{state : {course : course,cusCourses : customizedCourses}});
    }

    function filterCourse(partner){

            axios.get(`${baseUrl}gkt/faf/course/getpartners/${partner}`)
            .then(res => {setAllCourses(res.data);setFullCourse(res.data)})
            .catch(err => console.log(err));
    }

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
            setAllCourses(res.data);
            setAllCourses(allCourses.filter(courses => res.data.find(cusCourse => cusCourse.id === courses.id)));
            setCustomizedCourses(res.data);
          // axios.get(`${baseUrl}gkt/faf/course/recommendcourses`)
          // .then((res) => {
            // const filteredCourse = courses.filter(course => res.data.find(cr => cr.id === course.id));
  
            // setCourses(filteredCourse);
            // setRespCourse(res.data);
          // })
          // .catch(err => console.log(err))
          // .finally(()=>{
          //   setLoading(false);
          // })
        })
        .catch(err => {
            console.log(err);
        })
        .finally(()=>{
            setLoading(false);
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
        <div style={{background:"#010134",color:"white",minHeight:"100vh"}}>
            <Header />
            <div className='row mx-2'>
                <div className="col">
                    <div className="row">
                        <div className="col-12 col-md-8 filter" >
                            
                                <h6>Search here for personalised recommendation :</h6>
                                <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
                                <input className='filter-input' value={userStringInput} onChange={e => setUserStringInput(e.target.value)} type='text' placeholder='Search here...' />
                                <input type='file' onChange={e => setUserFileInput(e.target.files[0])} />
                                
                                    <button className='btn btn-primary'onClick={e =>{handleUserInputSubmit(e)}}>Search</button>
                                    <button className='btn btn-primary' onClick={e => {clearFilter()}}>Clear</button>
                                    </div>

                            


                        </div>
                        <div className="col-4"></div>

                    </div>
                    {customizedCourses.length === 0 &&
                        <div className="row mt-5" style={{width:"90%",marginInline:"auto",gap:"1rem",justifyContent:"center"}}>
                            {partners.map((partner,id) =>
                                <div className='partner-card' style={{fontSize:"clamp(1rem,2.5vh,2rem)"}} onClick={e => filterCourse(partner.partner)}>
                                {partner?.partner}
                                </div>
                            )}
                            
                        </div>
                    }
                    <div className="row mt-2">
                        <div className="col-md-10" style={{display:"flex",justifyContent:"center"}}>
                            <button style={{outline:"none",border:"none"}}>Popular courses</button>
                            <span>/</span>
                            <button style={{outline:"none",border:"none"}}>Combo courses</button>
                        </div>
                        <div className="col-md-2"><input type='text' placeholder='Filter' onChange={handleFilter} /></div>
                    </div>
                    <div className="row mt-2" style={{gap:"1rem",margin:"auto",width:"95%",display:"grid",gridTemplateColumns:"repeat(auto-fit,180px)",justifyContent:"center"}}>
                        {allCourses.map(course =>
                            <div className="course-card" onClick={e => handleNavigate(course)}>
                                <span style={{fontSize:"clamp(1rem,2.5vh,2rem)"}}>{course.title}</span>
                                <FaRegArrowAltCircleRight className='icon' /> 
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CoursesView