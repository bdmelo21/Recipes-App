import "./App.css";
//IMPORT NODE MODULES
import React, { useState } from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
//IMPORT COMPONENTS
import Recipe from "./Components/recipe";
import Alert from "./Components/Alert";
//.ENV TO CONFIGURE
require("dotenv").config();

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");
  const url = `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_PROJECT_ID}&app_key=${process.env.REACT_APP_PROJECT_KEY}`;
  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("No food with such name");
      }
      setRecipes(result.data.hits);
      console.log(result);
      setAlert("");
      setQuery("");
    } else {
      setAlert("Please fill the form");
    }
  };
  const onChange = (e) => {
    setQuery(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };
  return (
    <div className="App">
      <h1 onClick={getData}>Food Searching App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert} />}
        <input
          type="text"
          placeholder="Search Food"
          autoComplete="off"
          onChange={onChange}
        />
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {recipes !== [] &&
          recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
}
export default App;
