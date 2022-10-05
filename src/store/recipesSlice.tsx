import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import getToken, { URL_BASE } from "./dbAccess"

//TS interface
export interface recipeState{
    recipes: any[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null | string | undefined
}

const initialState: recipeState = {
    recipes: [],
    status: 'idle',
    error: null
}

// HTTP Request
export const getRecipes = createAsyncThunk('recipes/getRecipes', async() => {
    const access = await getToken()
    const response = await axios.get(`${URL_BASE}/recipes`, {
        headers: {
            'Authorization': `Bearer ${access}`
        }
    })
    return response.data.recipes
})

export const addRecipe = createAsyncThunk('recipes/addRecipe', async(datas:any) => {
    const access = await getToken()
    const response = await axios.post(`${URL_BASE}/recipes`, datas, {
        headers: {
            'Authorization': `Bearer ${access}`
        }
    })
    return response.data.recipe
})

// slice
const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {},
    extraReducers (builder) {
        builder
        //GET ALL
            .addCase(getRecipes.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getRecipes.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.recipes = action.payload
            })
            .addCase(getRecipes.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
        //POST
            .addCase(addRecipe.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addRecipe.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.recipes.push(action.payload)
            })
            .addCase(addRecipe.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getAllRecipes = (state: any) => state.recipes.recipes
export const getRecipesStatus = (state: any) => state.recipes.status
export const getRecipesError = (state: any) => state.recipes.error

export default recipesSlice.reducer