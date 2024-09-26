# <img src="https://agenciars.com.br/wp-content/uploads/2022/06/Trybe.png" alt="شعار تريبي" width="52" height="30" /> مشروع تطبيق الوصفات <img src="https://agenciars.com.br/wp-content/uploads/2022/06/Trybe.png" alt="شعار تريبي" width="52" height="30" />

## 🌐 [![البرتغالية](https://img.shields.io/badge/Português-green)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README.md) [![الإسبانية](https://img.shields.io/badge/Español-yellow)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_es.md) [![الإنجليزية](https://img.shields.io/badge/English-blue)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_en.md) [![الروسية](https://img.shields.io/badge/Русский-lightgrey)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ru.md) [![الصينية](https://img.shields.io/badge/中文-red)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ch.md) [![العربية](https://img.shields.io/badge/العربية-orange)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ar.md)

![معاينة التطبيق](./public/recipesAppOne.gif)

تم تطوير هذا المشروع خلال دورة تطوير الويب في **Trybe**، ويهدف إلى بناء تطبيق وصفات يتيح للمستخدمين البحث عن الوصفات، عرضها، تصفيتها، حفظها، ومتابعة خطوات إعدادها، بما في ذلك الأطباق والمشروبات.

تم تطوير التطبيق باستخدام **React**، مع استخدام موارد حديثة مثل **Hooks** و **Context API** لإدارة الحالة العالمية للتطبيق بشكل فعال. تم تحسين تصميم التطبيق ليتناسب مع الاستخدام على الأجهزة المحمولة.

تم تصميم التطبيق ليتناسب مع الأجهزة المحمولة، مع تحسين عرض الشاشة ليصل إلى **375 بكسل**. لضمان ظهور الواجهة بشكل صحيح أثناء الاختبار، يُنصح باستخدام أدوات تطوير المتصفح (DevTools) لمحاكاة عرض التطبيق بدقة أقل، مثل تمكين **وضع الأجهزة المحمولة** في Chrome عبر الضغط على `Ctrl + Shift + M`، وضبط عرض الشاشة إلى **375 بكسل**.

## الميزات

- البحث عن وصفات الأطباق والمشروبات؛
- تصفية الوصفات حسب الفئة؛
- عرض تفاصيل الوصفة، بما في ذلك المكونات والتعليمات؛
- حفظ وحب الوصفات؛
- متابعة خطوات إعداد الوصفة؛
- عرض الوصفات المكتملة.

![معاينة التطبيق](./public/recipesAppTwo.gif)

يستخدم التطبيق واجهتين برمجيتين مختلفتين (APIs) كقاعدة بيانات:

1. [TheMealDB API](https://www.themealdb.com/api.php) للوصفات المتعلقة بالأطباق؛
2. [TheCocktailDB API](https://www.thecocktaildb.com/api.php) للوصفات المتعلقة بالمشروبات.

## التقنيات المستخدمة

- **React** لبناء المكونات والواجهات؛
- **React Router** للتنقل بين الصفحات؛
- **Context API** لإدارة الحالة العالمية؛
- **Hooks** لإدارة دورة الحياة والحالة المحلية؛
- **Bootstrap** لتنسيق التصميم والاستجابة؛
- **Docker** لضمان توافق بيئة التطوير ونقلها.

## كيفية تشغيل المشروع

### المتطلبات المسبقة

- تثبيت **Node.js** (الإصدار 14 أو أعلى) على جهازك؛
- تثبيت **Docker** و **Docker Compose** (إذا كنت ترغب في تشغيل المشروع عبر Docker).

### استنساخ المستودع

```bash
git clone https://github.com/seu-usuario/recipes-app.git
cd recipes-app
```

### تشغيل المشروع محليًا (بدون استخدام Docker)

1. تثبيت تبعيات المشروع:

   ```bash
   npm install
   ```

2. تشغيل خادم التطوير:

   ```bash
   npm start
   ```

3. زيارة التطبيق في المتصفح:

   ```
   http://localhost:3000
   ```

### تشغيل المشروع باستخدام Docker

1. بناء صورة Docker:

   ```bash
   docker build -t recipes-app .
   ```

2. تشغيل حاوية Docker:

   ```bash
   docker run -p 3000:3000 recipes-app
   ```

3. زيارة التطبيق في المتصفح:

   ```
   http://localhost:3000
   ```

### هيكل المشروع

هيكل المشروع كما يلي:

```bash
src/
  ├── components/          # مكونات قابلة لإعادة الاستخدام
  ├── pages/               # الصفحات الرئيسية للتطبيق (تسجيل الدخول، الوصفات، المحفوظات، الملف الشخصي، إلخ)
  ├── services/            # منطق طلبات API
  ├── context/             # إعدادات Context API
  ├── App.js               # المكون الرئيسي، يتضمن التوجيه
  └── index.js             # نقطة دخول التطبيق
```

## المهارات والأساليب التي تم تطويرها

خلال تطوير هذا المشروع، تم تحسين المهارات التالية:

- **الأساليب الرشيقة**: استخدام **Scrum** و **Trello** لإدارة المهام والميزات ضمن فريق؛
- **توجيه React**: تنفيذ توجيه ديناميكي للتنقل بين الصفحات المختلفة؛
- **المنطق البرمجي**: تطوير ميزات البحث والتصفية ومعالجة البيانات؛
- **إدارة الحالة**: استخدام Hooks و Context API لإدارة الحالة المحلية والعالمية؛
- **بناء المكونات**: تطوير مكونات قابلة لإعادة الاستخدام ومتجاوبة لأجزاء التطبيق المختلفة.

## الاختبار

يمكنك تشغيل اختبارات التطبيق باستخدام الأمر التالي:

```bash
npm test
```

## مشاريع أخرى

- 🐣 [Pokedex](https://github.com/SamuelRocha91/pokedex/blob/main/README_ar.md)
- 🏪 [متجر إلكتروني](https://github.com/SamuelRocha91/project-frontend-online-store/blob/main/README_ar.md)
- 👛 [مدير النفقات](https://github.com/SamuelRocha91/project-trybewallet/blob/main/README_ar.md)
- 🎮 [Trivia](https://github.com/SamuelRocha91/trivia_game/blob/main/README_ar.md)
- 🗡️ [Trybe Smith](https://github.com/SamuelRocha91/TrybeSmith/blob/main/README_ar.md)
- 🪧 [API المدونات](https://github.com/SamuelRocha91/BlogsApi/blob/main/README_ar.md)
- 🐉 [Trybers and Dragons](https://github.com/SamuelRocha91/trybeAndDragons/blob/main/README_ar.md)
- ⚽ [API كرة القدم باستخدام TypeScript](https://github.com/SamuelRocha91/trybeFutebolClube/blob/main/README_ar.md)
