import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeUser: null,
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setActiveUser: (state,action) =>{
        state.activeUser = action.payload 
      },
      setLogout:(state)=>{
        state.activeUser=null
    }
  },
  
})

// Action creators are generated for each case reducer function
export const { setActiveUser } = userSlice.actions

export default userSlice.reducer