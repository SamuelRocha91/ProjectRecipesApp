import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from '../helpers/renderWithRouter';

// variáveis globais:
const emailTestID = 'email-input';
const passwordTestID = 'password-input';
const buttonTestID = 'login-submit-btn';

describe('Testes do componente Header', () => {
  it('Testa se é possivel clicar no icone de perfil', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(emailTestID);
    const inputPassword = screen.getByTestId(passwordTestID);
    const loginButton = screen.getByTestId(buttonTestID);

    expect(inputEmail);
    expect(inputPassword);
    expect(loginButton);
    expect(loginButton).toBeDisabled();

    userEvent.type(inputEmail, 'teste@trybe.com');
    userEvent.type(inputPassword, 'receitas');

    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    userEvent.click(profileIcon);
  });

  it('Testa se nos componentes em que o icone de busca é renderizado, quando clickado é possivel digitar no input de texto', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(emailTestID);
    const inputPassword = screen.getByTestId(passwordTestID);
    const loginButton = screen.getByTestId(buttonTestID);

    expect(inputEmail);
    expect(inputPassword);
    expect(loginButton);
    expect(loginButton).toBeDisabled();

    userEvent.type(inputEmail, 'teste@trybe.com');
    userEvent.type(inputPassword, 'receitas');

    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon);

    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput);

    userEvent.type(searchInput, 'teste');
  });
});
