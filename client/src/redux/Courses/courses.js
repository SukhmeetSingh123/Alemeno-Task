import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchCourses = createAsyncThunk("courses/fetchcourses", async () => {
    try {
        const response = await fetch('http://localhost:5000/api/courses/fetchCourses');
        const data = await response.json();
        return data;
    } catch (error) {
        throw error.message || 'Fetching failed.';
    }
});

export const addCourses = createAsyncThunk("courses/addcourses", async (coursesData) => {
    try {
        const response = await fetch('http://localhost:5000/api/courses/addCourses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(coursesData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error.message || 'Adding  failed.';
    }
});

export const updateCourses = createAsyncThunk("courses/updatecourses", async (coursesData) => {
    try {
        const response = await fetch(`http://localhost:5000/api/courses/updateCourses/${coursesData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(coursesData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error.message || 'Updating failed.';
    }
});

const initialState = {
    loading: false,
    error: null,
    courses: [],
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                // state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses.push(action.payload);
            })
            .addCase(addCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCourses.pending, (state) => {
                // state.loading = true;
                state.error = null;
            })
            .addCase(updateCourses.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const coursesReducer = coursesSlice.reducer;
