import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import getToken, { URL_BASE } from "./dbAccess"

//TS interface
export interface ingredientState{
    ingredients: any[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null | string | undefined
}

const initialState: ingredientState = {
    ingredients: [],
    status: 'idle',
    error: null
}

export const getIngredients = createAsyncThunk('ingredients/getIngredients', async() => {
    const access = await getToken()
    const response = await axios.get(`${URL_BASE}/ingredients`, {
        headers: {
            'Authorization': `Bearer ${access}`
        }
    })
    return response.data.ingredients
})

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    extraReducers (builder) {
        builder
            .addCase(getIngredients.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getIngredients.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.ingredients = action.payload
            })
            .addCase(getIngredients.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getAllIngredients = (state: any) => state.ingredients.ingredients
export const getIngredientsStatus = (state: any) => state.ingredients.status
export const getIngredientsError = (state: any) => state.ingredients.error

export default ingredientsSlice.reducer