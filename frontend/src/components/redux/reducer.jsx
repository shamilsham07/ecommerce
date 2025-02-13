import {createSlice}  from "@reduxjs/toolkit"

export const initialState={
    isAuthenticated:false,
    increment: 0,
    decrement:null,
    value:false,
    userdata:[''],
    userauthentication:false,
    otp:"",
    addreassId:"",

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
            },
            setUserData:(state,action)=>{
                state.userdata=action.payload
            },
            setuserauthentication:(state,action)=>{
               
                state.userauthentication=action.payload
            },
            setotp:(state,action)=>{
                state.otp=action.payload
            },
            setaddreass:(state,action)=>{
                state.addreassId=action.payload
            }
    }
    
})





export const{ authenticate,increments,decrements,value,setUserData,setuserauthentication,setotp,setaddreass} = authSlice.actions;

export default authSlice.reducer;
