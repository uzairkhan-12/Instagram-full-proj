import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeUser: null,
  updateactiveUser:null,
  pic:null
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setActiveUser: (state,action) =>{
        state.activeUser = action.payload 
      },
      updatepic:(state, action)=>{
        state.pic=action.payload
        },
      setActiveUserUpdate:(state,action)=>{
           state.updateactiveUser=action.payload
         },
      setLogout:(state)=>{
        state.activeUser=null
    }
  }
  
})

// Action creators are generated for each case reducer function
export const { setActiveUser,setLogout,setActiveUserUpdate,updatepic} = userSlice.actions

export default userSlice.reducer