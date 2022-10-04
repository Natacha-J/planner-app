import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import getToken, { URL_BASE } from "./dbAccess"

//TS interface
export interface shoppingListState{
    shoppingLists: any[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null | string | undefined
}

const initialState: shoppingListState = {
    shoppingLists: [],
    status: 'idle',
    error: null
}


export const getShoppingLists = createAsyncThunk('shoppingLists/getShoppingLists', async() => {
    const access = await getToken()
    const response = await axios.get(`${URL_BASE}/shoppingLists`, {
        headers: {
            'Authorization': `Bearer ${access}`
        }
    })
    return response.data.shoppingLists
})


const shoppingListsSlice = createSlice({
    name: 'shoppingLists',
    initialState,
    reducers: {},
    extraReducers (builder) {
        builder
            .addCase(getShoppingLists.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getShoppingLists.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.shoppingLists = action.payload
            })
            .addCase(getShoppingLists.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getAllShoppingLists = (state: any) => state.shoppingLists.shoppingLists
export const getShoppingListsStatus = (state: any) => state.shoppingLists.status
export const getShoppingListsError = (state: any) => state.shoppingLists.error

export default shoppingListsSlice.reducer