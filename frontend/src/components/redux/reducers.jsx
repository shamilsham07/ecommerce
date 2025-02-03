import {createSlice}  from "@reduxjs/toolkit"



export const initialState={
    setChange:true,
    setLoading:false,
}
export const changeSlice=createSlice({
    name:"cn",
    initialState,
    reducers:{
        change:(state,action)=>{
            if(action.payload==true){
                console.log(action.payload)
                state.setChange=true
            }
        else{
            state.setChange=false
        }
          
        },
        loading:(state,action)=>{
         state.setLoading=action.payload;

        }
    },
})

export const{change,loading}=changeSlice.actions
export default changeSlice.reducer;