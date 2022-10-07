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

//HTTP Request
export const getIngredients = createAsyncThunk('ingredients/getIngredients', async() => {
    const access = await getToken()
    const response = await axios.get(`${URL_BASE}/ingredients`, {
        headers: {
            'Authorization': `Bearer ${access}`
        }
    })
    return response.data.ingredients
})

export const addIngredient = createAsyncThunk('ingredients/addIngredient', async(datas:any) => {
    console.log(datas);
    
    const access = await getToken()
    const response = await axios.post(`${URL_BASE}/ingredients`, datas, {
        headers: {
            'Authorization': `Bearer ${access}`
        }
    })
    return response.data.ingredient
})

export const deleteIngredient = createAsyncThunk('ingredients/deleteIngredient', async(id:number) => {
    const access = await getToken()
    const response = await axios.delete(`${URL_BASE}/ingredients/${id}`, {
        headers: {
            'Authorization': `Bearer ${access}`
        }
    })
    return response.data.ingredient   
})

export const updateIngredient = createAsyncThunk('ingredients/updateIngredient', async(data:any) => {
    const access = await getToken()
    console.log(data);
    
    const response = await axios.put(`${URL_BASE}/ingredients/${parseInt(data.id)}`, {name: data.name}, {
        headers: {
            'Authorization': `Bearer ${access}`
        }
    })
    console.log(response.data);
    
    return response.data.ingredient   
})

//slice
const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    extraReducers (builder) {
        builder
            //GET ALL
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
            //POST
            .addCase(addIngredient.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addIngredient.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.ingredients.push(action.payload)
            })
            .addCase(addIngredient.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            //UPDATE
            .addCase(updateIngredient.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(updateIngredient.fulfilled, (state, action) => {
                state.status = 'succeeded'
                console.log(action.payload);
                
                let newIngredients: object[] = [];
                state.ingredients.map((ingredient:any) => {
                    if (ingredient.id === action.payload.id) {
                        ingredient = action.payload
                    }
                    newIngredients.push(ingredient)
                })
                
                state.ingredients = newIngredients;
                
            })
            .addCase(updateIngredient.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })  
            //DELETE
            .addCase(deleteIngredient.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteIngredient.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.ingredients = state.ingredients.filter(item => item.id !== action.payload)
            })
            .addCase(deleteIngredient.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })           
    }
})

export const getAllIngredients = (state: any) => state.ingredients.ingredients
export const getIngredientsStatus = (state: any) => state.ingredients.status
export const getIngredientsError = (state: any) => state.ingredients.error

export default ingredientsSlice.reducer