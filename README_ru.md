# <img src="https://cdn-icons-png.flaticon.com/128/10832/10832132.png" alt="React Logo" width="42" height="30" /> Проект Приложение Рецептов <img src="https://cdn-icons-png.flaticon.com/128/10832/10832132.png" alt="React Logo" width="42" height="30" />

## 🌐 [![Português](https://img.shields.io/badge/Português-green)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README.md) [![Español](https://img.shields.io/badge/Español-yellow)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_es.md) [![English](https://img.shields.io/badge/English-blue)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_en.md) [![Русский](https://img.shields.io/badge/Русский-lightgrey)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ru.md) [![中文](https://img.shields.io/badge/中文-red)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ch.md) [![العربية](https://img.shields.io/badge/العربية-orange)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ar.md)

![Предпросмотр приложения](./public/recipesAppOne.gif)

Этот проект был разработан в модуле Front-End курса веб-разработки от Trybe. Он представляет собой приложение для рецептов, которое позволяет пользователям искать, просматривать, фильтровать, добавлять в избранное и отслеживать процесс приготовления блюд и напитков.

Приложение было разработано с использованием **React** с применением современных инструментов, таких как **Hooks** и **Context API**, что обеспечивает эффективное управление глобальным состоянием приложения. Дизайн приложения оптимизирован для мобильных устройств.

Приложение разработано с фокусом на мобильные устройства, с оптимизированным дизайном для экранов шириной до **375 пикселей**. Для обеспечения корректного отображения интерфейса во время тестирования мы рекомендуем использовать инструменты разработчика браузера (DevTools), имитируя приложение на меньших разрешениях, например, на смартфоне. В Chrome вы можете включить **Режим просмотра для мобильных устройств**, нажав `Ctrl + Shift + M` в DevTools и установив ширину экрана на **375 пикселей**.

<details>
  <summary><h2>⚙️ Функциональности</h2></summary>
  
  - Поиск рецептов блюд и напитков;
  - Фильтрация рецептов по категориям;
  - Просмотр деталей рецептов, включая ингредиенты и инструкции;
  - Добавление и сохранение рецептов в избранное;
  - Отслеживание процесса приготовления рецептов;
  - Просмотр уже завершенных рецептов.

</details>

![Предпросмотр приложения](./public/recipesAppTwo.gif)

Приложение использует два различных API в качестве базы данных:

1. [TheMealDB API](https://www.themealdb.com/api.php) для рецептов блюд;
2. [TheCocktailDB API](https://www.thecocktaildb.com/api.php) для рецептов напитков.

<details>
  <summary><h2>🛠️ Использованные технологии</h2></summary>
  
  - **React** для создания компонентов и интерфейса;
  - **React Router** для навигации между страницами;
  - **Context API** для управления глобальным состоянием;
  - **Hooks** для управления жизненным циклом и локальными состояниями;
  - **Bootstrap** для стилизации и адаптивности;
  - **Docker** для обеспечения переносимости и согласованности в среде разработки.

</details>

<details>
  <summary><h2>🚀 Как запустить проект</h2></summary>

  ### Предварительные требования

  - Установленный **Node.js** на вашем компьютере (версия 14 или выше);
  - Установленные **Docker** и **Docker Compose** (если вы хотите запустить проект с помощью Docker).

  ### Клонирование репозитория

  ```bash
  git clone https://github.com/ваш_пользователь/recipes-app.git
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

  3. Откройте приложение в браузере:

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

  3. Откройте приложение в браузере:

     ```
     http://localhost:3000
     ```

  ### Структура проекта

  Проект организован следующим образом:

  ```bash
  src/
    ├── components/          # Переиспользуемые компоненты
    ├── pages/               # Основные страницы приложения (Вход, Рецепты, Избранное, Профиль и т.д.)
    ├── services/            # Логика запросов к API
    ├── context/             # Настройка Context API
    ├── App.js               # Главный компонент, содержащий маршруты
    └── index.js             # Точка входа приложения
  ```

</details>

<details>
  <summary><h2>📈 Методологии и развиваемые навыки</h2></summary>

  В процессе разработки этого проекта были развиты следующие навыки:

  - **Агильные методологии**: Работа в команде с использованием **Scrum** и **Trello** для управления задачами и функциональностью;
  - **React Routes**: Реализация динамических маршрутов для навигации между различными страницами приложения;
  - **Логика программирования**: Разработка функциональности поиска, фильтрации и манипуляции данными;
  - **Управление состоянием**: Управление локальным и глобальным состоянием с помощью Hooks и Context API;
  - **Создание компонентов**: Разработка переиспользуемых и адаптивных компонентов для различных частей приложения.

</details>

<details>
  <summary><h2>🧪 Тесты</h2></summary>

  Тесты приложения можно выполнить с помощью команды:

  ```bash
  npm test
  ```

</details>

<details>
  <summary><h2>🌟 Другие проекты</h2></summary>

  - 🐣 [Pokedex](https://github.com/SamuelRocha91/pokedex/blob/main/README_ru.md)
  - 🏪 [Интернет-магазин FrontEnd](https://github.com/SamuelRocha91/project-frontend-online-store/blob/main/README_ru.md)
  - 👛 [Организатор расходов](https://github.com/SamuelRocha91/project-trybewallet/blob/main/README_ru.md)
  - 🎮 [Trivia](https://github.com/SamuelRocha91/trivia_game/blob/main/README_ru.md)

</details>
