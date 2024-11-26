import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { MdInfoOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "./DragNDrop.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VimeoPlayer from "./VimeoPlayer";
import Tippy from '@tippyjs/react';
import { useDispatch,useSelector } from 'react-redux';
import { addCourse } from '../../features/courses/courseSlice';
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
// import {toast} from "react-toastify"
import {toast} from 'react-hot-toast';


function DragNDrop({recommendedModules,customizeCourse,onClose}) {
    const baseUrl = useSelector(state => state.login.baseUrl)
    const location = useLocation();
    const [course, setCourse] = useState();
    const [selectedList, setSelectedLists] = useState([]);
    const [description, setDescription] = useState("");
    const [show, setShow] = useState(false);
    const[showPreview,setShowPreview] = useState(false);
    const [iniLists, setIniLists] = useState([]);
    const[startTime,setStartTime] = useState(0);
    const[endTime,setEndTime] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        // axios.get(`${baseUrl}gkt/faf/course/getCourse/${courseCode}`)
        //     .then((res) => {
        //         setCourse(res.data);
        //         setIniLists(res.data.courseModule);
        //     })
        //     .catch(err => console.log(err));

        //     console.log(course);
        setCourse(customizeCourse);
        setIniLists(customizeCourse.courseModule);
        if(recommendedModules.length >0){
           let recomCourse = recommendedModules.filter(recommend => recommend.id === customizeCourse.id);
           setSelectedLists(recomCourse[0].courseModule);
        }
        console.log(customizeCourse,recommendedModules);

    }, [customizeCourse]);


    function isJsonInList(jsonList, jsonObject) {
        // Convert the JSON objects to strings for comparison
        const jsonStringToCheck = JSON.stringify(jsonObject);
        return jsonList.some(item => JSON.stringify(item) === jsonStringToCheck);
    }


    function leftDragStart(item) {
        let rightBox = document.getElementById("right");
        rightBox.addEventListener("dragover", function (e) {
            e.preventDefault();
        });
        rightBox.addEventListener("drop", function (e) {
            e.preventDefault();
            console.log(isJsonInList(iniLists, item));
            !(isJsonInList(selectedList, item)) && setSelectedLists([...selectedList, item]);

        });

    }


    const deleteModule = (item) => {
        const filteredVal = selectedList.filter(val => val.id !== item.id);
        setSelectedLists(filteredVal);
    }

    function rightDragStart(item) {
        let leftBox = document.getElementById("left");
        leftBox.addEventListener("dragover", function (e) {
            e.preventDefault();
        });
        leftBox.addEventListener("drop", function (e) {
            const filteredVal = selectedList.filter(val => val.id !== item.id);
            setSelectedLists(filteredVal);
        });

    }


    const showDescription = (item) => {
        setShow(true);
        setDescription(item)
    }

    const showPreviewChange = (item) => {
        const[startHour,startMinutes,startSeconds] = item?.previewStart.split(":").map(Number);
        const[endHour,endMinute,endSecond] = item?.previewEnd.split(":").map(Number)

        setShowPreview(true);
        setDescription(item)
        setStartTime(startHour * 3600 + startMinutes * 60 + startSeconds);
        setEndTime(endHour * 3600 + endMinute * 60 + endSecond);
    }


    const addCourseToCart = (e) => {
        e.preventDefault();
        const selectedCourse = course
        selectedCourse.courseModule = selectedList
        selectedCourse.customized = "Y";
        dispatch(addCourse(selectedCourse));
        toast("Course added to cart",{autoClose:3000,CloseButton:true,type:"success",theme:"colored"})
        navigate("/courseList");

    }

    return (
        <div className='row' style={{padding:0,margin:0}}>
            {/* <Header /> */}
            <div className=" container row">
                <div id='left' className="col-5">
                    {iniLists.map((item, index) =>
                        <div className=" list row mt-1 mb-2 m-0">
                            <div className=' col col-md-8' id={index} draggable="true" onDragStart={e => leftDragStart(item)}>{item.title}</div>
                            <div className="col-md-2">
                                {item.preview==="Y" ? 
                                <Tippy content="Preview">
                                <VisibilityIcon style={{ color: "black", cursor: "pointer", fontSize: "30px" }} onClick={e => {showPreviewChange(item)}} />
                                </Tippy>
                                : null}
                            </div>
                            <div className="col-md-2">
                                <MdInfoOutline style={{ color: "black", cursor: "pointer", fontSize: "30px" }} onClick={e => showDescription(item)} />
                            </div>
                        </div>
                    )}
                </div>

                <div id='right' className="col-5">
                    {selectedList.length > 0 ?
                        <>
                            {selectedList.map((item, index) =>
                                <div style={{ display: "flex", alignItems: "center" }} className="row mt-3 m-0">
                                    <div className='filtered-list col-md-11' id={index} draggable="true" onDragStart={e => rightDragStart(item)}>{item.title}</div>
                                    <div className="col-md-1" >
                                        <MdInfoOutline style={{ cursor: "pointer", fontSize: "20px" }} onClick={e => { setShow(true); setDescription(item); }} />
                                        <MdDelete style={{ cursor: "pointer", fontSize: "20px" }} onClick={e => { deleteModule(item) }} />
                                    </div>
                                </div>

                            )} </> :
                        <div className="row" style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", opacity: 0.5, height: "490px" }}> Drag and Drop modules here </div>}
                </div>
                {selectedList.length > 0 ? 
                <div className="col-1" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <button className="btn btn-primary" onClick={(e) => {addCourseToCart(e);onClose()}}>Submit</button>
                </div> : null}
            </div>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    Description
                </Modal.Header>
                <Modal.Body>
                    {description?.moduleDesc}
                </Modal.Body>

            </Modal>
            <Modal show={showPreview} onHide={() => setShowPreview(false)} >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                   <VimeoPlayer videoId={description?.previewLink} startTime={startTime} stopTime={endTime} />
                </Modal.Body>

            </Modal>

        </div>
    );



}

export default DragNDrop;