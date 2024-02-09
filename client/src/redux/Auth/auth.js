import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getUserDetails = createAsyncThunk("getUserDetails", async () => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/getLogedInUserDetail', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken'),
            },
        });

        const responseData = await response.json()
        return responseData;
    } catch (error) {
        throw error.message || 'Error fetching user details.';
    }
});


export const registerUser = createAsyncThunk("registerUser", async ({ name, email, password, navigate }) => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        const responseData = await response.json();
        if (responseData.error) {
            return responseData;
        }
        navigate('/')
        return responseData;
    } catch (error) {
        throw error.message || 'Registration failed.';
    }
});

export const logedInUser = createAsyncThunk("logedInUser", async ({ email, password, navigate }) => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const responseData = await response.json();
        if (responseData.error) {
            return responseData;
        }
        navigate('/')
        return responseData;
    } catch (error) {
        throw error.message || 'Login failed.';
    }
});

export const updateLoginUser = createAsyncThunk("updateLoginUser", async ({courseId,navigate}) => {
    try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:5000/api/auth/updateLogedInUserDetail/${courseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken,
            },
        });

        const responseData = await response.json();
        if (responseData.error) {
            return responseData;
        }

        navigate('/dashboard');
        return responseData;
    } catch (error) {
        throw error.message || 'Error updating user details.';
    }
});

const initialState = {
    authData: [],
    userDetail: [],
    errorMsg: '',
    isCurrentlyLogenInValue:false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "authUser",
    initialState,
    reducers: {
        setIsCurrentlyLoggedIn: (state, action) => {
            state.isCurrentlyLogenInValue = action.payload;
          },
        setErrorMsg:(state,action)=>{
            state.errorMsg=action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetail = action.payload;
                state.error = false;
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error fetching user details.';
            })

            // REGISTER Handling
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.error) {
                    state.error = true;
                    state.errorMsg = action.payload.error;
                } else {
                    state.error = false;
                    state.authData = action.payload;
                    if (state.authData.authToken) {
                        localStorage.setItem('authToken', state.authData.authToken);
                    }
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Registration failed.';
            })

            // LOGIN Handling
            .addCase(logedInUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logedInUser.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.error) {
                    state.error = true;
                    state.errorMsg = action.payload.error;
                } else {
                    state.error = false;
                    state.authData = action.payload;
                    if (state.authData.authToken) {
                        localStorage.setItem('authToken', state.authData.authToken);
                    }
                }
            })
            .addCase(logedInUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Login failed.';
            })

            //UPDATE Handling
            .addCase(updateLoginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLoginUser.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.error) {
                    state.error = true;
                    state.errorMsg = action.payload.error;
                } else {
                    state.errorMsg = '';
                    state.error = false;
                }
            })
            .addCase(updateLoginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error updating user details.';
            });
    },
});
export const { setIsCurrentlyLoggedIn,setErrorMsg } = authSlice.actions;
export const authReducer = authSlice.reducer;
