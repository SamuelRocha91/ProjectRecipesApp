import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWithRouter';
import { drinkDetail, mealDetail } from '../helpers/mockData2';
import { drinks, meals } from '../helpers/mockData';
import RecipesProvider from '../context/RecipesProvider';
import AppProvider from '../context/AppProvider';
import App from '../App';

const recipeTitle = 'recipe-title';
const route = '/meals/52977';
const route2 = '/drinks/15997';
const imageMeal = 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg';
const imageDrink = 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg';
const blackHeart = 'http://localhost/blackHeartIcon.svg';

const idi = 'favoriteRecipes';
const datas = [
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: imageMeal,
  },
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: imageDrink,
  },
];

describe('Verifica as funcionalidades da página de detalhes no "/meals"', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealDetail),
    });
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinks),
    });
  });
  afterEach(() => {
    global.fetch.mockRestore();
  });
  test('Verifica se ao clicar no botão de "start recipes" a página é redirecionada para outra de acompanhamento de progresso(rota meals)', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: [route] },
    );
    const title = await screen.findByTestId(recipeTitle);
    expect(title).toBeInTheDocument();

    const startRecipe = screen.getByTestId('start-recipe-btn');

    userEvent.click(startRecipe);

    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });
  test('Verifica se ao clicar no botão de favoritos a página muda a imagem renderizada', async () => {
    localStorage.setItem(idi, JSON.stringify(datas));
    const finalObject = [
      {
        alcoholicOrNot: 'Optional alcohol',
        category: 'Ordinary Drink',
        id: '15997',
        image: imageDrink,
        name: 'GG',
        nationality: '',
        type: 'drink',
      },
      {
        alcoholicOrNot: '',
        category: 'Side',
        id: '52977',
        image: imageMeal,
        name: 'Corba',
        nationality: 'Turkish',
        type: 'meal',
      },
    ];
    renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: [route] },
    );
    const title = await screen.findByTestId(recipeTitle);
    expect(title).toBeInTheDocument();
    const imgFavorite = screen.getByTestId('favorite-btn');
    expect(imgFavorite).toHaveProperty('src', blackHeart);

    userEvent.click(imgFavorite);

    expect(imgFavorite).toHaveProperty('src', 'http://localhost/whiteHeartIcon.svg');

    userEvent.click(imgFavorite);

    expect(imgFavorite).toHaveProperty('src', blackHeart);
    expect(JSON.parse(localStorage.getItem(idi))).toEqual(finalObject);
  });
  test('Verifica se ao clicar no botão de compartilhar é renderizada uma confirmação da cópia na página', async () => {
    renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: [route] },
    );
    const title = await screen.findByTestId(recipeTitle);
    expect(title).toBeInTheDocument();

    // mock implementado(do clipboard, bem como sua) a patir de https://stackoverflow.com/questions/61807378/jest-test-for-a-copy-to-clipboard-method-using-react-with-typescript, acesso 06/03/2023 às 22:26
    const mockedClipboard = jest.fn();

    navigator.clipboard = {
      writeText: mockedClipboard,
    };

    const shareBtn = screen.getByTestId('share-btn');

    expect(shareBtn).toBeInTheDocument();

    expect(screen.queryByText('Link copied!')).not.toBeInTheDocument();

    userEvent.click(shareBtn);

    expect(mockedClipboard).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });

  test('Verifica se são renderizadas receitas de recomendação da api inversa(ou seja, se a página de details for de meals, as recomendações devem ser de drinks)', async () => {
    renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: [route] },
    );
    const title = await screen.findByTestId(recipeTitle);
    expect(title).toBeInTheDocument();

    expect(screen.getByTestId('0-recommendation-card')).toBeInTheDocument();

    expect(screen.getByTestId('0-recommendation-title')).toHaveTextContent('GG');

    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
  });
});

describe('Verifica as funcionalidades da página de detalhes no "/drinks"', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinkDetail),
    });
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(meals),
    });
  });
  afterEach(() => {
    global.fetch.mockRestore();
  });
  test('Verifica se ao clicar no botão de "start recipes" a página é redirecionada para outra de acompanhamento de progresso(rota meals)', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: [route2] },
    );
    const title = await screen.findByTestId(recipeTitle);
    expect(title).toBeInTheDocument();

    const startRecipe = screen.getByTestId('start-recipe-btn');

    userEvent.click(startRecipe);

    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });

  test('Verifica se são renderizadas receitas de recomendação da api inversa(ou seja, se a página de details for de drinks, as recomendações devem ser de meals)', async () => {
    renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: [route2] },
    );
    const title = await screen.findByTestId(recipeTitle);
    expect(title).toBeInTheDocument();

    expect(screen.getByTestId('0-recommendation-card')).toBeInTheDocument();

    expect(screen.getByTestId('0-recommendation-title')).toHaveTextContent('Corba');

    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
  });
  test('Verifica se ao clicar no botão de favoritos a página muda a imagem renderizada', async () => {
    localStorage.setItem(idi, JSON.stringify(datas));
    renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
      { initialEntries: [route2] },
    );
    const title = await screen.findByTestId(recipeTitle);
    expect(title).toBeInTheDocument();
    const imgFavorite = screen.getByTestId('favorite-btn');
    expect(imgFavorite).toHaveProperty('src', blackHeart);

    userEvent.click(imgFavorite);

    expect(imgFavorite).toHaveProperty('src', 'http://localhost/whiteHeartIcon.svg');

    userEvent.click(imgFavorite);

    expect(imgFavorite).toHaveProperty('src', blackHeart);

    expect(JSON.parse(localStorage.getItem(idi))).toEqual(datas);
  });
});
