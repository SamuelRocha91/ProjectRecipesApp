import { FAVORITE_RECIPES } from '../utils/constants';

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
    return localStorage.removeItem(FAVORITE_RECIPES);
  }

  const newFavorite = isFavorite
    .filter((favorite) => favorite.name !== detailDrink
    && favorite.name !== detailMeal);
  localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(newFavorite));
};
