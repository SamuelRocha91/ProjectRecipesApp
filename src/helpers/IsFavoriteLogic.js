export const alreadyExist = (detail, isFavorite) => {
  if (detail) {
    const detailFood = detail === null ? '' : detail;
    if (isFavorite.length !== 0) {
      const value = isFavorite.some((favorite) => favorite.name === detailFood) || false;
      return value;
    }
    return false;
  }
};

export const deleteFavorite = (detail, isFavorite) => {
  const detailMeal = detail.strMeal === null ? '' : detail.strMeal;
  const detailDrink = detail.strDrink === null ? '' : detail.strDrink;
  if (isFavorite.length === 1) {
    return localStorage.removeItem('favoriteRecipes');
  }

  const newFavorite = isFavorite
    .filter((favorite) => favorite.name !== detailDrink
    && favorite.name !== detailMeal);
  console.log(newFavorite);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
};
