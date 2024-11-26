import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userEmail : null,
    isSalesSpoc : false,
    // baseUrl : `https://digital.globalknowledgetech.com:8343/fafapi/`,
    baseUrl : `http://localhost:8082/`
}


export const LoginSlice = createSlice({
    name : 'LoginSlice',
    initialState,
    reducers : {
        setUserEmail : (state,action) => {
            state.userEmail = action.payload
        },
        setIsSalesSpoc : (state,action) => {
            state.isSalesSpoc = !!action.payload
        }
    }
})


export const {setUserEmail,setIsSalesSpoc} = LoginSlice.actions

export default LoginSlice.reducer