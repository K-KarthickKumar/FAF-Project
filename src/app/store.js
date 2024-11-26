import { configureStore } from "@reduxjs/toolkit";
import courseReducer from '../features/courses/courseSlice';
import loginReducer from '../features/Login/LoginSlice';

export const store = configureStore({
    reducer : {
        course : courseReducer,
        login : loginReducer
    }
})