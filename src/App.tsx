import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Header } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { IngredientView, PlannerView, RecipeView, ShoppingListView, StockView } from './views';
import AddRecipeView from './views/addViews/AddRecipeView';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/ingredients' element={<IngredientView/>}/>
        <Route path='/recettes' element={<RecipeView/>}/>
        <Route path='/stock' element={<StockView/>}/>
        <Route path='/planificateur' element={<PlannerView/>}/>
        <Route path='/liste-de-courses' element={<ShoppingListView/>}/>
        <Route path='/recettes/ajout' element={<AddRecipeView/>}/>
      </Routes>
    </Router>
  );
}

export default App;
