import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import getToken, { URL_BASE } from "../dbAccess"

//TS interface
export interface stockState{
    stocks: any[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null | string | undefined
}

const initialState: stockState = {
    stocks: [],
    status: 'idle',
    error: null
}


export const getStocks = createAsyncThunk('stocks/getstocks', async() => {
    const access = await getToken()
    const response = await axios.get(`${URL_BASE}/stocks`, {
        headers: {
            'Authorization': `Bearer ${access}`
        }
    })
    return response.data.stocks
})

const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {},
    extraReducers (builder) {
        builder
            .addCase(getStocks.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getStocks.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.stocks = action.payload
            })
            .addCase(getStocks.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getAllStocks = (state: any) => state.stocks.stocks
export const getStocksStatus = (state: any) => state.stocks.status
export const getStocksError = (state: any) => state.stocks.error

export default stocksSlice.reducer