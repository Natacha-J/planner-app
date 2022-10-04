import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import getToken, { URL_BASE } from "./dbAccess"

//TS interface
export interface measureState{
    measures: any[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null | string | undefined
}

const initialState: measureState = {
    measures: [],
    status: 'idle',
    error: null
}

export const getMeasures = createAsyncThunk('measures/getMeasures', async() => {
    const access = await getToken()
    const response = await axios.get(`${URL_BASE}/measures`, {
        headers: {
            'Authorization': `Bearer ${access}`
        }
    })
    return response.data.measures
})

const measuresSlice = createSlice({
    name: 'measures',
    initialState,
    reducers: {},
    extraReducers (builder) {
        builder
        .addCase(getMeasures.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getMeasures.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.measures = action.payload
        })
        .addCase(getMeasures.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })

    }
})

export const getAllMeasures = (state: any) => state.measures.measures
export const getMeasuresStatus = (state: any) => state.measures.status
export const getMeasuresError = (state: any) => state.measures.error

export default measuresSlice.reducer