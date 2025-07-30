import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./userSlice"
import postSlice from "./postSlice"
import loopSlice from "./loopSlice"
import storySlice from "./storySlice"
import messageSlice  from "./messageSlice"
import socketSlice from './socketSlice.js'
const store = configureStore({
    reducer: {
        user: userSlice,
        post: postSlice,
        loop: loopSlice,
        story: storySlice,
        message: messageSlice,
        socket:socketSlice
    }
})

export default store
