export const saveInProgressStorage = (food) => {
  const Storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const route = food.pathname.includes('/meals') ? 'meals' : 'drinks';
  const id = food.idMeal || food.idDrink;
  const ingredient = food.ingredients.map((item) => item[1]);
  const newInfos = {
    ...Storage,
    [route]: {
      [id]: ingredient,
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newInfos));
};
