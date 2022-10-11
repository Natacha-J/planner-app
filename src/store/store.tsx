import { configureStore } from '@reduxjs/toolkit'
import recipesReducer from './slices/recipesSlice'
import ingredientsReducer from './slices/ingredientsSlice'
import categoriesReducer from './slices/categoriesSlice'
import measuresReducer from './slices/measuresSlice'
import stocksReducer from './slices/stocksSlice'
import shoppingListsReducer from './slices/shoppingListsSlice'

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