import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mealDetail, drinkDetail } from '../helpers/mockData2';
import { renderWithRouter } from '../helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import AppProvider from '../context/AppProvider';
import App from '../App';

const corbaInProgress = {
  meals: {
    52977: [
      'Lentils',
      'Onion',
      'Carrots',
    ],
  },
};
const ggInProgress = {
  drinks: {
    15997: [
      'Galliano',
      'Ginger ale',
      'Ice',
    ],
  },
};

const finishButton = 'finish-recipe-btn';
const ingredient0 = '0-ingredient-step';
const favoriteBTN = 'favorite-btn';
const ordinaryDrink = 'Ordinary Drink';
const optionalAlcohool = 'Optional alcohol';
const imageMeal = 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg';
const imageDrink = 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg';
const blackHeart = 'http://localhost/blackHeartIcon.svg';
const recipeTitle = 'recipe-title';
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
    category: ordinaryDrink,
    alcoholicOrNot: optionalAlcohool,
    name: 'GG',
    image: imageDrink,
  },
];
const inProgressREcipes = 'inProgressRecipes';

const route = '/meals/52977/in-progress';
const route2 = '/drinks/15997/in-progress';
describe(() => 'Verifica se a tela de progresso de receitas...', () => {
  test('renderiza todos os elementos referentes a receita em progresso caso meals', async () => {
    localStorage.setItem(inProgressREcipes, JSON.stringify(corbaInProgress));
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealDetail),
    });
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
    expect(title).toHaveTextContent('Corba');

    const photo = screen.getByTestId('recipe-photo');
    expect(photo).toBeInTheDocument();
    expect(photo).toHaveAttribute('src', imageMeal);

    const category = screen.getByTestId('recipe-category');
    expect(category).toBeInTheDocument();
    expect(category).toHaveTextContent('Side');

    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
    expect(instructions).toHaveTextContent('Pick through your lentils f');

    const ingredient = screen.getByTestId(ingredient0);
    expect(ingredient).toBeInTheDocument();
    expect(ingredient).toHaveTextContent('Lentils');

    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    const favoriteBtn = screen.getByTestId(favoriteBTN);
    expect(favoriteBtn).toBeInTheDocument();

    const finishBtn = screen.getByTestId(finishButton);
    expect(finishBtn).toBeInTheDocument();
  });
  test('Verifica se ao clicar no botão de compartilhar é renderizada uma confirmação da cópia na página', async () => {
    localStorage.setItem(inProgressREcipes, JSON.stringify(corbaInProgress));
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealDetail),
    });
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

  test('Verifica se ao clicar no botão de favoritos a página muda a imagem renderizada', async () => {
    localStorage.setItem(idi, JSON.stringify(datas));
    localStorage.setItem(inProgressREcipes, JSON.stringify(corbaInProgress));
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealDetail),
    });
    const finalObject = [
      {
        alcoholicOrNot: optionalAlcohool,
        category: ordinaryDrink,
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
    const imgFavorite = screen.getByTestId(favoriteBTN);
    expect(imgFavorite).toHaveProperty('src', blackHeart);

    userEvent.click(imgFavorite);

    expect(imgFavorite).toHaveProperty('src', 'http://localhost/whiteHeartIcon.svg');

    userEvent.click(imgFavorite);

    expect(imgFavorite).toHaveProperty('src', blackHeart);
    console.log(JSON.parse(localStorage.getItem(idi)));
    expect(JSON.parse(localStorage.getItem(idi))).toEqual(finalObject);
  });
  test('verifica se o botão de finalizar receita inicia desabilitado e após clicadas em todas as opções é habilitado e redireciona para outra página', async () => {
    localStorage.setItem(inProgressREcipes, JSON.stringify(corbaInProgress));
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealDetail),
    });
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
    const ingrediente0 = screen.getByTestId(ingredient0);
    const ingredient1 = screen.getByTestId('1-ingredient-step');
    const ingredient2 = screen.getByTestId('2-ingredient-step');

    const finishBtn = screen.getByTestId(finishButton);
    expect(finishBtn.disabled).toBe(true);
    expect(ingrediente0).not.toHaveClass('rasurado');

    userEvent.click(ingrediente0);
    expect(ingrediente0).toHaveClass('rasurado');
    expect(finishBtn.disabled).toBe(true);
    expect(ingredient1).not.toHaveClass('rasurado');

    userEvent.click(ingredient1);
    expect(ingredient1).toHaveClass('rasurado');
    expect(finishBtn.disabled).toBe(true);
    expect(ingredient2).not.toHaveClass('rasurado');

    userEvent.click(ingredient1);
    expect(ingredient1).not.toHaveClass('rasurado');

    userEvent.click(ingredient1);

    userEvent.click(ingredient2);
    expect(ingredient2).toHaveClass('rasurado');

    expect(finishBtn.disabled).toBe(false);

    userEvent.click(finishBtn);

    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('verifica se o local strorage não tiver sido setado anteriormente, se a página salva um novo objeto', async () => {
    localStorage.clear();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealDetail),
    });
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
    expect(JSON.parse(localStorage.getItem(inProgressREcipes)))
      .toEqual({
        meals: {
          52977: [
            'Lentils',
            'Onion',
            'Carrots',
          ],
        },
      });
  });
  test('renderiza todos os elementos referentes a receita em progresso caso drinks', async () => {
    localStorage.setItem(inProgressREcipes, JSON.stringify(ggInProgress));
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinkDetail),
    });
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
    expect(title).toHaveTextContent('GG');
  });
  test('verifica se o local strorage não tiver sido setado anteriormente, se a página salva um novo objeto', async () => {
    localStorage.clear();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinkDetail),
    });
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
    expect(JSON.parse(localStorage.getItem(inProgressREcipes)))
      .toEqual({
        drinks: {
          15997: [
            'Galliano',
            'Ginger ale',
            'Ice',
          ],
        },
      });
  });
  test('Verifica se ao clicar no botão de favoritos a página muda a imagem renderizada', async () => {
    localStorage.setItem(idi, JSON.stringify(datas));
    localStorage.setItem(inProgressREcipes, JSON.stringify(ggInProgress));
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinkDetail),
    });
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
    expect(JSON.parse(localStorage.getItem(idi))).toEqual([
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
        alcoholicOrNot: optionalAlcohool,
        name: 'GG',
        image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      },
    ]);
  });
  test('verifica se o botão de finalizar receita inicia desabilitado e após clicadas em todas as opções é habilitado e redireciona para outra página', async () => {
    localStorage.setItem(inProgressREcipes, JSON.stringify(ggInProgress));
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinkDetail),
    });
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
    const ingrediente0 = screen.getByTestId('0-ingredient-step');
    const ingredient1 = screen.getByTestId('1-ingredient-step');
    const ingredient2 = screen.getByTestId('2-ingredient-step');

    const finishBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishBtn.disabled).toBe(true);
    expect(ingrediente0).not.toHaveClass('rasurado');

    userEvent.click(ingrediente0);
    expect(ingrediente0).toHaveClass('rasurado');
    expect(finishBtn.disabled).toBe(true);
    expect(ingredient1).not.toHaveClass('rasurado');

    userEvent.click(ingredient1);
    expect(ingredient1).toHaveClass('rasurado');
    expect(finishBtn.disabled).toBe(true);
    expect(ingredient2).not.toHaveClass('rasurado');

    userEvent.click(ingredient1);
    expect(ingredient1).not.toHaveClass('rasurado');

    userEvent.click(ingredient1);

    userEvent.click(ingredient2);
    expect(ingredient2).toHaveClass('rasurado');

    expect(finishBtn.disabled).toBe(false);

    userEvent.click(finishBtn);

    expect(history.location.pathname).toBe('/done-recipes');
  });
});
