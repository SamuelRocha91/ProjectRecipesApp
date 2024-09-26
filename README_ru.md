# <img src="https://agenciars.com.br/wp-content/uploads/2022/06/Trybe.png" alt="Логотип Trybe" width="52" height="30" /> Проект Recipes App <img src="https://agenciars.com.br/wp-content/uploads/2022/06/Trybe.png" alt="Логотип Trybe" width="52" height="30" />

## 🌐 [![Португальский](https://img.shields.io/badge/Português-green)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README.md) [![Испанский](https://img.shields.io/badge/Español-yellow)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_es.md) [![Английский](https://img.shields.io/badge/English-blue)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_en.md) [![Русский](https://img.shields.io/badge/Русский-lightgrey)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ru.md) [![Китайский](https://img.shields.io/badge/中文-red)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ch.md) [![Арабский](https://img.shields.io/badge/العربية-orange)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ar.md)

![Предварительный просмотр приложения](./public/recipesAppOne.gif)

Этот проект был разработан в модуле Front-End курса веб-разработки Trybe. Он представляет собой приложение для рецептов, которое позволяет пользователям искать, просматривать, фильтровать, добавлять в избранное и отслеживать процесс приготовления рецептов блюд и напитков.

Приложение разработано с использованием **React** с современными ресурсами, такими как **Hooks** и **Context API**, что обеспечивает эффективное управление глобальным состоянием приложения. Дизайн приложения оптимизирован для мобильных устройств.

Приложение разработано с акцентом на мобильные устройства, с дизайном, оптимизированным для экранов шириной до **375 пикселей**. Чтобы гарантировать правильное отображение интерфейса во время тестирования, мы рекомендуем использовать инструменты разработки браузера (DevTools), имитируя приложение на меньших разрешениях, таких как разрешение смартфона. Например, в Chrome вы можете активировать **Режим просмотра мобильных устройств**, нажав `Ctrl + Shift + M` в DevTools и установив ширину экрана на **375 пикселей**.

## Функциональность

- Поиск рецептов блюд и напитков;
- Фильтрация рецептов по категориям;
- Просмотр подробной информации о рецептах, включая ингредиенты и инструкции;
- Добавление и сохранение рецептов в избранное;
- Отслеживание процесса приготовления рецептов;
- Просмотр уже завершенных рецептов.

![Предварительный просмотр приложения](./public/recipesAppTwo.gif)

Приложение использует два различных API в качестве базы данных:

1. [TheMealDB API](https://www.themealdb.com/api.php) для рецептов блюд;
2. [TheCocktailDB API](https://www.thecocktaildb.com/api.php) для рецептов напитков.

## Используемые технологии

- **React** для создания компонентов и интерфейса;
- **React Router** для навигации между страницами;
- **Context API** для глобального управления состоянием;
- **Hooks** для управления жизненным циклом и локальными состояниями;
- **Bootstrap** для стилизации и адаптивности;
- **Docker** для обеспечения переносимости и согласованности в среде разработки.

## Как запустить проект

### Предварительные требования

- Установленный **Node.js** на вашем компьютере (версии 14 или выше);
- Установленные **Docker** и **Docker Compose** (если вы хотите запустить проект с помощью Docker).

### Клонирование репозитория

```bash
git clone https://github.com/seu-usuario/recipes-app.git
cd recipes-app
```

### Запуск проекта локально (без Docker)

1. Установите зависимости проекта:

   ```bash
   npm install
   ```

2. Запустите сервер разработки:

   ```bash
   npm start
   ```

3. Доступ к приложению в браузере:

   ```
   http://localhost:3000
   ```

### Запуск проекта с Docker

1. Соберите образ Docker:

   ```bash
   docker build -t recipes-app .
   ```

2. Запустите контейнер Docker:

   ```bash
   docker run -p 3000:3000 recipes-app
   ```

3. Доступ к приложению в браузере:

   ```
   http://localhost:3000
   ```

### Структура проекта

Проект организован следующим образом:

```bash
src/
  ├── components/          # Повторно используемые компоненты
  ├── pages/               # Основные страницы приложения (Вход, Рецепты, Избранное, Профиль и т.д.)
  ├── services/            # Логика для запросов к API
  ├── context/             # Настройка Context API
  ├── App.js               # Основной компонент, содержащий маршруты
  └── index.js             # Точка входа приложения
```

## Методологии и навыки, которые были развиты

В процессе разработки этого проекта были развиты следующие навыки:

- **Гибкие методологии**: Работа в команде с использованием **Scrum** и **Trello** для управления задачами и функционалом;
- **React Routes**: Реализация динамических маршрутов для навигации между различными страницами приложения;
- **Логика программирования**: Разработка функциональности поиска, фильтрации и манипуляции данными;
- **Управление состоянием**: Управление локальным и глобальным состоянием с помощью Hooks и Context API;
- **Создание компонентов**: Разработка повторно используемых и адаптивных компонентов для различных частей приложения.

## Тестирование

Тесты приложения можно запустить с помощью команды:

```bash
npm test
```

## Другие проекты

- 🐣 [Pokedex](https://github.com/SamuelRocha91/pokedex/blob/main/README_ru.md)
- 🏪 [FrontEnd Online Store](https://github.com/SamuelRocha91/project-frontend-online-store/blob/main/README_ru.md)
- 👛 [Expense organizer](https://github.com/SamuelRocha91/project-trybewallet/blob/main/README_ru.md)
- 🎮 [Trivia](https://github.com/SamuelRocha91/trivia_game/blob/main/README_ru.md)
- 🗡️ [Trybe Smith](https://github.com/SamuelRocha91/TrybeSmith/blob/main/README_ru.md)
- 🪧 [Blogs Api](https://github.com/SamuelRocha91/BlogsApi/blob/main/README_ru.md)
- 🐉 [Trybers and Dragons](https://github.com/SamuelRocha91/trybeAndDragons/blob/main/README_ru.md)
- ⚽ [Typescript FootBall API](https://github.com/SamuelRocha91/trybeFutebolClube/blob/main/README_ru.md)
