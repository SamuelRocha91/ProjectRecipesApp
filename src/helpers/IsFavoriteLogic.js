export const alreadyExist = (detail, isFavorite) => {
  if (detail) {
    const detailMeal = detail === null ? '' : detail;
    const detailDrink = detail === null ? '' : detail;
    if (isFavorite.length !== 0) {
      const value = isFavorite.some((favorite) => favorite.name === detailMeal
|| favorite.name === detailDrink) || false;
      console.log(value);
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
