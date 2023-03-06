import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWithRouter';
import Footer from '../components/Footer';

describe('Testes do componente Footer', () => {
  it('Testa se o componente Footer possui um icone de comida e um de bebida', () => {
    renderWithRouter(<Footer />);

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();

    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    expect(mealsIcon).toBeInTheDocument();

    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    expect(drinksIcon).toBeInTheDocument();
  });

  it('Testa o redirecionamento ao clicar no icone de comidas (meal)', () => {
    const { history } = renderWithRouter(<Footer />);

    const mealsIcon = screen.getByTestId('meals-bottom-btn');

    userEvent.click(mealsIcon);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');
  });

  it('Testa o redirecionamento ao clicar no icone de comidas (drinks)', () => {
    const { history } = renderWithRouter(<Footer />);

    const drinksIcon = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(drinksIcon);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');
  });
});
