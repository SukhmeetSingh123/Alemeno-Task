import { configureStore } from '@reduxjs/toolkit'
// import thunk from 'redux-thunk';
import { authReducer } from './Auth/auth';
import {coursesReducer} from './Courses/courses'
const Store = configureStore({
    reducer: {
        auth:authReducer,
        courses:coursesReducer,
    },
    // middleware: [thunk],
})


export default Store;