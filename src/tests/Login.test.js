import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';

// variáveis globais:
const emailTestID = 'email-input';
const passwordTestID = 'password-input';
const buttonTestID = 'login-submit-btn';

describe('Testes da pagina de Login', () => {
  it('Testa se existem 2 inputs na tela e um botão', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    const inputEmail = screen.getByTestId(emailTestID);
    const inputPassword = screen.getByTestId(passwordTestID);
    const loginButton = screen.getByTestId(buttonTestID);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('Testa se ao digitar um email e senha válidos o botão é habilitado', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    const inputEmail = screen.getByTestId(emailTestID);
    const inputPassword = screen.getByTestId(passwordTestID);
    const loginButton = screen.getByTestId(buttonTestID);

    expect(loginButton).toBeDisabled();

    userEvent.type(inputEmail, 'teste@trybe.com');
    userEvent.type(inputPassword, 'receitas');

    expect(loginButton).toBeEnabled();
  });

  it('Testa se a chave email é salva no localStorage', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );
    jest.spyOn(Storage.prototype, 'setItem');

    const inputEmail = screen.getByTestId(emailTestID);
    const inputPassword = screen.getByTestId(passwordTestID);
    const loginButton = screen.getByTestId(buttonTestID);

    userEvent.type(inputEmail, 'teste@trybe.com');
    userEvent.type(inputPassword, 'receitas');
    userEvent.click(loginButton);

    expect(localStorage.setItem).toHaveBeenCalled();

    // referencia de como checar o localStorage retirado do site:
    // https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests/54157998#54157998
  });
});
