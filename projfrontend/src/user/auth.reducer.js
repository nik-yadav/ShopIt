import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    authInfo: null,
}

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuthInfo(state, action){
            state.authInfo = action.payload;
        }
    },
    extraReducers: (builder) => {
        // builder.addCase(verifyToken.fulfilled, (state, action) => {
        //     state.authInfo = action.payload;
        // })
    }
})

export default slice;

export const { name, reducer, actions } = slice;
