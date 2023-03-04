const maxRec = 12;

export const fetchCategories = (url, food, setCategories) => {
  const maxFilter = 5;
  if (food === 'meals') {
    fetch(url).then((data) => data.json()).then((response) => {
      const filterCategories = response.meals
        .filter((categorie, index) => index < maxFilter)
        .map(({ strCategory }) => strCategory);
      setCategories(filterCategories);
    });
  } else {
    fetch(url).then((data) => data.json()).then((response) => {
      const filterCategories = response.drinks
        .filter((categorie, index) => index < maxFilter)
        .map(({ strCategory }) => strCategory);
      setCategories(filterCategories);
    });
  }
};

export const fetchApi = (url, food, setFoods) => {
  fetch(url).then((data) => data.json()).then((response) => {
    if (food === 'meals') {
      console.log(response);
      const meals = response.meals
        .map(({ strMealThumb, strMeal, idMeal: id }) => ({ strMealThumb, strMeal, id }))
        .filter((resp, index) => index < maxRec);
      setFoods({ meals });
    } else {
      const drinks = response.drinks
        .map(({ strDrinkThumb, strDrink, idDrink: id }) => ({ strDrinkThumb,
          strDrink,
          id }))
        .filter((resp, index) => index < maxRec);
      setFoods({ drinks });
    }
  });
};

export const fetchMealsByCategorie = (categorie, setFoods, selectCategorie) => {
  if (categorie === 'all' || categorie === selectCategorie) {
    return fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'meals', setFoods);
  }
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`).then((data) => data.json()).then((response) => {
    const meals = response.meals
      .map(({ strMealThumb, strMeal, idMeal: id }) => ({ strMealThumb, strMeal, id }))
      .filter((resp, index) => index < maxRec);
    setFoods({ meals });
  });
};

export const fetchDrinksByCategorie = (categorie, setFoods, selectCategorie) => {
  if (categorie === 'all' || categorie === selectCategorie) {
    return fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'drinks', setFoods);
  }
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`).then((data) => data.json()).then((response) => {
    const drinks = response.drinks
      .map(({ strDrinkThumb, strDrink, idDrink: id }) => ({ strDrinkThumb,
        strDrink,
        id }))
      .filter((resp, index) => index < maxRec);
    setFoods({ drinks });
  });
};
