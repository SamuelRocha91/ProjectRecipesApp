import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import AppProvider from '../context/AppProvider';
import RecipesProvider from '../context/RecipesProvider';
import { renderWithRouter } from '../helpers/renderWithRouter';

// variáveis globais:
const emailTestID = 'email-input';
const passwordTestID = 'password-input';
const buttonTestID = 'login-submit-btn';

describe('Testes do componente Header', () => {
  it('Testa se é possivel clicar no icone de perfil', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
    );

    const inputEmail = screen.getByTestId(emailTestID);
    const inputPassword = screen.getByTestId(passwordTestID);
    const loginButton = screen.getByTestId(buttonTestID);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
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
    const { history } = renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
    );

    const inputEmail = screen.getByTestId(emailTestID);
    const inputPassword = screen.getByTestId(passwordTestID);
    const loginButton = screen.getByTestId(buttonTestID);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    userEvent.type(inputEmail, 'teste@trybe.com');
    userEvent.type(inputPassword, 'receitas');

    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const searchIcon = screen.getByTestId('search-top-btn').parentElement;
    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    userEvent.type(searchInput, 'teste');
  });
});
