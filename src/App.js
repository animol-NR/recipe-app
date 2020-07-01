import React, { useEffect, useState } from 'react';
import {Recipe} from './recipe.component';
import {SearchBox} from './search-box.component';
import './App.css';


const App = () => {
  const APP_ID="eccf0ea7";
  const APP_KEY="73bcd8b4ea88c9ce9d7bf3c101901537";


  const [recipes, setRecipes]=useState([]);
  const [search, setSearch]=useState('');
  const [query, setQuery]=useState('');

  useEffect(() => {
        getRecipes();
  },[query]);

const getRecipes=async ()=>{
    const response= await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data=await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };
const updateSearch= e => {
    setSearch(e.target.value);
  };

const getSearch= e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
};

return( 
  <div className="App">
    <header className="header">
      <h1 className="title">Strange Recipes Finder</h1>
     <form onSubmit={getSearch} className="search-form">
       <SearchBox updateSearch={updateSearch} placeholder="Recipe Name"/>
         {/* <input className="search-bar" type="text" name="recipeName" value={search} onChange={updateSearch} />
         <button className="search-button" type="">Search</button> */}
  </form> 
  </header>
  <div className="recipes">
   {recipes.map((recipe,index)=>(
   <Recipe 
      key={index}
      title={recipe.recipe.label}
      calories={recipe.recipe.calories}
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}
/>
   ))}
   </div>
  </div>
);
};
export default App;
