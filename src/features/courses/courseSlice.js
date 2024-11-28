import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courses :[],
    selectedCourse : {}
}

export const courseSlice = createSlice({
    name : 'courseSlice',
    initialState,
    reducers : {
        addCourse : (state,action) => {
            const courseIndex = state.courses.findIndex(course => course.id === action.payload.id);
            if (courseIndex === -1) {
                // Course not found, so push it to the state
                state.courses.push(action.payload);
            } else {
                // Course found, remove it and then push the updated course
                state.courses.splice(courseIndex, 1, action.payload);
            }
            // const courseExists = state.courses.some(course => course.id === action.payload.id);
            // if (!courseExists) {
            //     state.courses.push(action.payload);
            // }
            // else{
            //     state.courses = state.courses.filter(course => course.id !== action.payload);
            //     debugger;
            //     state.courses.push(action.payload);
            // }
        },
        removeCourse : (state,action) => {
            state.courses = state.courses.filter(course => course.id !== action.payload);
        },
        setSelectedCourse : (state,action) => {
            state.selectedCourse = action.payload
        },
        addCartCourses : (state,action) => {
            state.courses = action.payload
        },
    }
})


export const {addCourse,removeCourse,setSelectedCourse,addCartCourses} = courseSlice.actions

export default courseSlice.reducer

