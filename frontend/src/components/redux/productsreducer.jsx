import { createSlice } from "@reduxjs/toolkit";


export const initialState={
    setdata:[''],
    setcartproducts:[''],
}
export const productsSlice=createSlice({
    name:'products',
    initialState,
    reducers:{
        data:(state,action)=>{
         state.setdata=action.payload
        },
        setcart:(state,action)=>{
            state.setcartproducts=action.payload
        }
    }


})
export  const {data,setcart} =productsSlice.actions;
export default productsSlice.reducer;