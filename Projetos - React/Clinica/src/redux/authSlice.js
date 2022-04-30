import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: "",
    name: "",
    cpf: ""
  },
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload.token
      state.name = action.payload.name
      state.cpf = action.payload.cpf
    },
    removeToken: state => {
      state.token = ""
    },
  }
})

export const { addToken, removeToken } = authSlice.actions
export const selectAuth = (state) => state.auth


export default authSlice.reducer