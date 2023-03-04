import propTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [foods, setFoods] = useState([]); // estado que salva drinks ou meals salvos após uma requisição à API
  const [categories, setCategories] = useState([]); // estado que salva as 5 categorias filtradas após uma requisição para a API
  const [foodDetails, setFoodDetails] = useState(null); // estado temporário que salva dados da receita a ser detalhada. A ser substituído já que do req 24 em diante deve-se utilizar o math.params para resgatar o id e fazer novo fecth
  const [searchBarFetch, setSearchBarFetch] = useState(false); // armengue para resolver o seguinte problema: quando a API retorna apenas uma receita se a requisição tiver sido feita pelo searchBar automaticamente se redireciona a página, caso tenha sido feita no Recipes não.

  const values = useMemo(() => ({
    foods,
    setFoods,
    categories,
    setCategories,
    foodDetails,
    setFoodDetails,
    searchBarFetch,
    setSearchBarFetch,
  }), [foods, setFoods, categories, setCategories, foodDetails,
    setFoodDetails, searchBarFetch,
    setSearchBarFetch]);
  return (
    <RecipesContext.Provider value={ values }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default RecipesProvider;
