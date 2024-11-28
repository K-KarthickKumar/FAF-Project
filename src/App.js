import React,{useState} from 'react';
import './App.css';
import CourseList from './Components/CourseList/CourseList';
import DragNDrop from './Components/DragNDrop/DragNDrop';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// import Json from './Components/Cart/JSON.jsx';
import { Steps } from 'rsuite';
import {Toaster} from 'react-hot-toast';
import CoursesView from './Components/CourseList/CoursesView';
import CourseDetails from './Components/CourseList/CourseDetails';
import ComboCOurseDetails from './Components/CourseList/ComboCourseDetails.jsx';
import UserProfile from './Components/UserProfile/UserProfile.jsx';
function App() {

  return (
    <div className="App">
      <Toaster position="top-right" />
      <Router basename='/faf'>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/courseList" element={<CourseList />} />
          <Route exact path="/customize" element={<DragNDrop />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/home" element={<CoursesView />} />
          <Route exact path="/courseDetails" element={<CourseDetails />} />
          <Route exact path="/comboCourseDetails" element={<ComboCOurseDetails />} />
          <Route exact path="/userProfile" element={<UserProfile />} />
        </Routes>
        </Router>
        
    </div>
  );
}

export default App;
