import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState({ user: '', email: '' });

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    setUser(userStorage);
  }, []);

  const logout = () => localStorage.clear();
  useEffect(() => {
    console.log('Componente montado');

    // Função de limpeza (executada ao desmontar o componente)
    return () => {
      logout();
    };
  }, []);

  return (
    <main className="main-profile">
      <Header
        title="Profile"
        enableSearchIcon={ false }
      />
      <p className="profile-p">{user?.email}</p>
      <Link className="a-react" to="/done-recipes">
        Done Recipes
      </Link>
      <Link className="a-react" to="/favorite-recipes">
        Favorite Recipes
      </Link>
      <Link className="a-react" to="/">
        Logout
      </Link>
      <Footer />
    </main>
  );
}

export default Profile;
