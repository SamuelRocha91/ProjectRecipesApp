import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Profile() {
  const [user, setUser] = useState({ user: '', email: '' });

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    setUser(userStorage);
  }, []);

  const logout = () => { localStorage.clear(); };
  return (
    <main>
      <Header
        title="Profile"
        enableSearchIcon={ false }
      />
      <p data-testid="profile-email">{user?.email}</p>
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
