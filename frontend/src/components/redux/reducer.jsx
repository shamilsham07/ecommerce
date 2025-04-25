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
    productId:"",
    email:"",
    sidebar:false

}

 export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
       
            authenticate:(state,action)=>{
                state.isAuthenticated=action.payload

            },
            setProductId:(state,action)=>{
               state.productId=action.payload
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
            },
            setemail:(state,action)=>{
                state.email=action.payload
            },
            setsidebar:(state,action)=>{
                state.sidebar=action.payload
            },

    }
    
})





export const{ authenticate,increments,decrements,value,setUserData,setuserauthentication,setotp,setaddreass,setProductId,setemail,setsidebar} = authSlice.actions;

export default authSlice.reducer;
