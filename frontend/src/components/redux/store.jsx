import { configureStore } from "@reduxjs/toolkit"; 
import  authReducer from "./reducer";
import  changeReducer  from "./reducers";
import   dataReducer from "./productsreducer";

 const store= configureStore({
    reducer:{
        auth: authReducer,
        cn: changeReducer,
        products:dataReducer,
    }
  
})
export default store