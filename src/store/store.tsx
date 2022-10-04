import { configureStore } from '@reduxjs/toolkit'
import recipesReducer from './recipesSlice'
import ingredientsReducer from './ingredientsSlice'
import categoriesReducer from './categoriesSlice'
import measuresReducer from './measuresSlice'
import stocksReducer from './stocksSlice'
import shoppingListsReducer from './shoppingListsSlice'

export const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        ingredients: ingredientsReducer,
        categories: categoriesReducer,
        measures: measuresReducer,
        stocks: stocksReducer,
        shoppingLists: shoppingListsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch