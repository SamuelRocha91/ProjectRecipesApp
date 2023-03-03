import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Verifica pagina de profile', () => {
  const usuario = () => {
    localStorage.setItem('user', JSON.stringify([{
      email: 'anfitras@0413.com',
    }]));
  };
  test('Botão de Logout leva a tela de login', () => {
    usuario();
    const { history } = renderWithRouter(<Profile />);
    const button = screen.getByRole('button', { name: /Logout/i });
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toEqual('/');
  });

  test('Botão de Done Recipes leva a tela de receitas prontas', () => {
    usuario();
    const { history } = renderWithRouter(<Profile />);
    const button = screen.getByRole('button', { name: /Done Recipes/i });
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toEqual('/done-recipes');
  });

  test('Botão de Favorite Recipes leva a tela de receitas favoritas', () => {
    usuario();
    const { history } = renderWithRouter(<Profile />);
    const button = screen.getByRole('button', { name: /Favorite Recipes/i });
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toEqual('/favorite-recipes');
  });

  test('Verifica se aparece o email do local storage', () => {
    usuario();
    renderWithRouter(<Profile />);
    const email = screen.getAllByText('anfitras@0413.com');
    expect(email[0]).toBeInTheDocument();
    expect(email[0]).toHaveTextContent(/anfitras@0413.com/i);
  });

  test('Verifica se aparece a imagem', () => {
    usuario();
    renderWithRouter(<Profile />);
    const userImg = screen.getAllByRole('img');
    expect(userImg).toBeInTheDocument();
  });
});
