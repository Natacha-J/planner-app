import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import getToken, { URL_BASE } from "../dbAccess"

//TS interface
export interface categoryState{
    categories: any[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null | string | undefined
}

const initialState: categoryState = {
    categories: [],
    status: 'idle',
    error: null
}

export const getCategories = createAsyncThunk('categories/getCategories', async() => {
    const access = await getToken()
    const response = await axios.get(`${URL_BASE}/categories`, {
        headers: {
            'Authorization': `Bearer ${access}`
        }
    })
    return response.data.categories
})

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers (builder) {
        builder
            .addCase(getCategories.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.categories = action.payload
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getAllCategories = (state: any) => state.categories.categories
export const getCategoriesStatus = (state: any) => state.categories.status
export const getCategoriesError = (state: any) => state.categories.error

export default categoriesSlice.reducer