import {createSlice}  from "@reduxjs/toolkit"

export const initialState={
    isAuthenticated:false,
    increment: 0,
    decrement:null,
    value:false,
}

 export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
       
            authenticate:(state)=>{
                state.isAuthenticated=true

            },
            increments:(state)=>{
                state.increment+=1
            },
            decrements:(state)=>{
                state.decrement-=1
            },
            value:(state)=>{
                state.value=true
            }

    }
    
})





export const{ authenticate,increments,decrements,value} = authSlice.actions;

export default authSlice.reducer;
