import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PlannerView, RecipeView, ShoppingListView, StockView } from './views';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/recettes' element={<RecipeView/>}/>
        <Route path='/stock' element={<StockView/>}/>
        <Route path='/planificateur' element={<PlannerView/>}/>
        <Route path='/liste-de-courses' element={<ShoppingListView/>}/>
      </Routes>
    </Router>
  );
}

export default App;
