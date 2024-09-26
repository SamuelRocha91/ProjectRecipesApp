# <img src="https://agenciars.com.br/wp-content/uploads/2022/06/Trybe.png" alt="Trybe Logo" width="52" height="30" /> 食谱应用程序项目 <img src="https://agenciars.com.br/wp-content/uploads/2022/06/Trybe.png" alt="Trybe Logo" width="52" height="30" />

## 🌐 [![葡萄牙语](https://img.shields.io/badge/Português-green)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README.md) [![西班牙语](https://img.shields.io/badge/Español-yellow)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_es.md) [![英语](https://img.shields.io/badge/English-blue)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_en.md) [![俄语](https://img.shields.io/badge/Русский-lightgrey)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ru.md) [![中文](https://img.shields.io/badge/中文-red)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ch.md) [![阿拉伯语](https://img.shields.io/badge/العربية-orange)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ar.md)

![应用程序预览](./public/recipesAppOne.gif)

该项目是在 Trybe 的网页开发课程中开发的，旨在构建一个食谱应用程序，允许用户搜索、查看、过滤、收藏和跟踪食谱的制作过程，包括菜肴和饮品。

该应用程序使用 **React** 开发，采用现代资源，例如 **Hooks** 和 **Context API**，有效管理应用程序的全局状态。应用程序的设计经过优化，适合移动设备使用。

该应用程序的设计面向移动设备，优化屏幕宽度达到 **375 像素**。为了确保在测试期间界面正确显示，我们建议使用浏览器的开发工具（DevTools）模拟在更小分辨率下的应用程序，例如在 Chrome 中，您可以通过在 DevTools 中按 `Ctrl + Shift + M` 来启用 **移动设备模式**，并将屏幕宽度设置为 **375 像素**。

## 功能

- 搜索菜肴和饮品的食谱；
- 按类别过滤食谱；
- 查看食谱的详细信息，包括成分和说明；
- 收藏和保存食谱；
- 跟踪食谱的制作过程；
- 查看已完成的食谱。

![应用程序预览](./public/recipesAppTwo.gif)

该应用程序使用两个不同的 API 作为数据库：

1. [TheMealDB API](https://www.themealdb.com/api.php) 用于菜肴食谱；
2. [TheCocktailDB API](https://www.thecocktaildb.com/api.php) 用于饮品食谱。

## 使用的技术

- **React** 用于构建组件和界面；
- **React Router** 用于页面之间的导航；
- **Context API** 用于全局状态管理；
- **Hooks** 用于管理生命周期和本地状态；
- **Bootstrap** 用于样式和响应式设计；
- **Docker** 用于确保开发环境的一致性和可移植性。

## 如何运行项目

### 前提条件

- 您的计算机上安装了 **Node.js**（版本 14 或更高）；
- 安装了 **Docker** 和 **Docker Compose**（如果您希望通过 Docker 运行项目）。

### 克隆代码库

```bash
git clone https://github.com/seu-usuario/recipes-app.git
cd recipes-app
```

### 本地运行项目（不使用 Docker）

1. 安装项目依赖：

   ```bash
   npm install
   ```

2. 启动开发服务器：

   ```bash
   npm start
   ```

3. 在浏览器中访问应用程序：

   ```
   http://localhost:3000
   ```

### 使用 Docker 运行项目

1. 构建 Docker 镜像：

   ```bash
   docker build -t recipes-app .
   ```

2. 启动 Docker 容器：

   ```bash
   docker run -p 3000:3000 recipes-app
   ```

3. 在浏览器中访问应用程序：

   ```
   http://localhost:3000
   ```

### 项目结构

项目结构如下：

```bash
src/
  ├── components/          # 可重用组件
  ├── pages/               # 应用程序的主要页面（登录、食谱、收藏、个人资料等）
  ├── services/            # API 请求逻辑
  ├── context/             # Context API 的设置
  ├── App.js               # 主要组件，包含路由
  └── index.js             # 应用程序的入口
```

## 开发的技能和方法论

在开发此项目的过程中，提升了以下技能：

- **敏捷方法论**：在团队中使用 **Scrum** 和 **Trello** 管理任务和功能；
- **React 路由**：实现动态路由以在不同页面之间导航；
- **编程逻辑**：开发搜索、过滤和数据操作的功能；
- **状态管理**：使用 Hooks 和 Context API 管理本地和全局状态；
- **组件构建**：为应用程序的各个部分开发可重用和响应式组件。

## 测试

可以使用以下命令运行应用程序的测试：

```bash
npm test
```

## 其他项目

- 🐣 [Pokedex](https://github.com/SamuelRocha91/pokedex/blob/main/README_ch.md)
- 🏪 [前端在线商店](https://github.com/SamuelRocha91/project-frontend-online-store/blob/main/README_ch.md)
- 👛 [费用管理器](https://github.com/SamuelRocha91/project-trybewallet/blob/main/README_ch.md)
- 🎮 [Trivia](https://github.com/SamuelRocha91/trivia_game/blob/main/README_ch.md)
- 🗡️ [Trybe Smith](https://github.com/SamuelRocha91/TrybeSmith/blob/main/README_ch.md)
- 🪧 [Blogs Api](https://github.com/SamuelRocha91/BlogsApi/blob/main/README_ch.md)
- 🐉 [Trybers and Dragons](https://github.com/SamuelRocha91/trybeAndDragons/blob/main/README_ch.md)
- ⚽ [TypeScript 足球 API](https://github.com/SamuelRocha91/trybeFutebolClube/blob/main/README_ch.md)
