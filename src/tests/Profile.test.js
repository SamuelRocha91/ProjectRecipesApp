import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';

const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
}());

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};
const user = 'user';

const object = { email: 'anfitras@0413.com' };

describe('Verifica pagina de profile', () => {
  test('Botão de Logout leva a tela de login', () => {
    setLocalStorage(user, object);
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/profile'] },
    );
    const button = screen.getByRole('button', { name: /Logout/i });
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toEqual('/');
  });

  test('Botão de Done Recipes leva a tela de receitas prontas', () => {
    setLocalStorage(user, object);
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/profile'] },
    );
    const button = screen.getByRole('button', { name: /Done Recipes/i });
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toEqual('/done-recipes');
  });

  test('Botão de Favorite Recipes leva a tela de receitas favoritas', () => {
    setLocalStorage(user, object);
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/profile'] },
    );
    const button = screen.getByRole('button', { name: /Favorite Recipes/i });
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toEqual('/favorite-recipes');
  });

  test('Verifica se aparece o email do local storage', () => {
    setLocalStorage(user, object);
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/profile'] },
    );
    const email = screen.getByText('anfitras@0413.com');
    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent(/anfitras@0413.com/i);
  });

  test('Verifica se aparece a imagem', () => {
    setLocalStorage(user, object);
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { initialEntries: ['/profile'] },
    );
    const userImg = screen.getByRole('img');
    expect(userImg).toBeInTheDocument();
  });
});

// mock realizado conforme referência ensinada no site https://robertmarshall.dev/blog/how-to-mock-local-storage-in-jest-tests/, acesso 04/03/2023 às 09:40.
