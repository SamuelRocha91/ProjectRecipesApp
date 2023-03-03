import { screen } from '@testing-library/react';
import App from '../App';
import { categoriesDrinks, categoriesMeals, drinks, meals } from '../helpers/mockData';
import { renderWithRouter } from '../helpers/renderWithRouter';

describe('Verifica se o componente "Recipes" na rota "/meals"...', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(meals),
    });
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(categoriesMeals),
    });
  });
  afterEach(() => {
    global.fetch.mockReset();
  });

  test('renderiza doze receitas de almoços', async () => {
    const { history, debug } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const meal = await screen.findByText('Corba');
    expect(meal).toBeInTheDocument();
    expect(history.location.pathname).toEqual('/meals');
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    debug();
    const images = screen.getAllByRole('img');

    expect(images).toHaveLength(12);
  });
  test('renderiza cinco botões referentes a categorias filtradas pela Api', async () => {
    const { debug } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const meal = await screen.findByText('Corba');
    expect(meal).toBeInTheDocument();

    const btnFilters = screen.getAllByRole('button');
    debug();
    expect(btnFilters).toHaveLength(5);
    expect(btnFilters[0]).toHaveTextContent('Beef');
  });
});

describe('Verifica se o componente "Recipes" na rota "/drinks"...', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    });
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(categoriesDrinks),
    });
  });
  afterEach(() => {
    global.fetch.mockReset();
  });

  test('renderiza doze receitas de almoços', async () => {
    const { history, debug } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const drink = await screen.findByText('GG');
    expect(drink).toBeInTheDocument();
    expect(history.location.pathname).toEqual('/drinks');
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    debug();
    const images = screen.getAllByRole('img');

    expect(images).toHaveLength(12);
  });
  test('renderiza cinco botões referentes a categorias filtradas pela Api', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const drink = await screen.findByText('GG');
    expect(drink).toBeInTheDocument();

    const btnFilters = screen.getAllByRole('button');

    expect(btnFilters).toHaveLength(5);
    expect(btnFilters[0]).toHaveTextContent('Ordinary Drink');
  });
});
