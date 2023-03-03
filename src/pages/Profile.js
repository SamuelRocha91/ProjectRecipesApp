import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const logout = () => { localStorage.removeItem('user'); };
  return (
    <main>
      <img src="../images/profileIcon.svg" alt="imgprofile" />
      <p data-testid="profile-email">{user.email}</p>
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => logout() }
        >
          Logout
        </button>
      </Link>
    </main>
  );
}

export default Profile;
