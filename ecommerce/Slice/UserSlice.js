import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isAuthenticated: false,
}
const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
        }
    }
})

export const {login, logout} = UserSlice.actions
export default UserSlice.reducer