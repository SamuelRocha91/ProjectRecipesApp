
# <img src="https://cdn-icons-png.flaticon.com/128/10832/10832132.png" alt="React Logo" width="42" height="30" /> مشروع تطبيق الوصفات <img src="https://cdn-icons-png.flaticon.com/128/10832/10832132.png" alt="React Logo" width="42" height="30" />

## 🌐 [![Português](https://img.shields.io/badge/Português-green)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README.md) [![Español](https://img.shields.io/badge/Español-yellow)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_es.md) [![English](https://img.shields.io/badge/English-blue)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_en.md) [![Русский](https://img.shields.io/badge/Русский-lightgrey)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ru.md) [![中文](https://img.shields.io/badge/中文-red)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ch.md) [![العربية](https://img.shields.io/badge/العربية-orange)](https://github.com/SamuelRocha91/ProjectRecipesApp/blob/main/README_ar.md)

![معاينة التطبيق](./public/recipesAppOne.gif)

هذا المشروع تم تطويره كجزء من دورة تطوير الويب في Trybe. إنه تطبيق للوصفات يسمح للمستخدمين بالبحث، وعرض، وتصنيف، وحفظ الوصفات، بالإضافة إلى تتبع إعداد الأطباق والمشروبات.

تم تطوير التطبيق باستخدام **React**، ويستخدم أدوات حديثة مثل **Hooks** و**Context API** لإدارة الحالة العامة للتطبيق بكفاءة. تم تحسين تصميم التطبيق للأجهزة المحمولة.

يتركز التطبيق على الأجهزة المحمولة، وتم تحسين التصميم ليكون مناسبًا للشاشة بعرض **375 بكسل**. لضمان العرض الصحيح للواجهة أثناء الاختبار، يُوصى باستخدام أدوات المطور في المتصفح (DevTools) لمحاكاة التطبيق بدقة على دقة أقل، مثل الهواتف الذكية. في متصفح Chrome، يمكنك تفعيل **وضع المعاينة على الأجهزة المحمولة** بالضغط على `Ctrl + Shift + M` في DevTools وضبط عرض الشاشة إلى **375 بكسل**.

<details>
  <summary><h2>⚙️ الميزات</h2></summary>
  
  - البحث عن وصفات الأطباق والمشروبات؛
  - تصنيف الوصفات حسب الفئات؛
  - عرض تفاصيل الوصفات بما في ذلك المكونات وتعليمات التحضير؛
  - حفظ وحفظ الوصفات؛
  - تتبع عملية إعداد الوصفات؛
  - عرض الوصفات المكتملة.

</details>

![معاينة التطبيق](./public/recipesAppTwo.gif)

يستخدم التطبيق واجهتين برمجيتين مختلفتين كقاعدة بيانات:

1. [واجهة برمجة تطبيقات TheMealDB](https://www.themealdb.com/api.php) لوصفات الأطباق؛
2. [واجهة برمجة تطبيقات TheCocktailDB](https://www.thecocktaildb.com/api.php) لوصفات المشروبات.

<details>
  <summary><h2>🛠️ التقنيات المستخدمة</h2></summary>
  
  - **React** لإنشاء المكونات والواجهة؛
  - **React Router** للتنقل بين الصفحات؛
  - **Context API** لإدارة الحالة العامة؛
  - **Hooks** لإدارة دورة الحياة والحالة المحلية؛
  - **Bootstrap** للتصميم والأسلوب والاستجابة؛
  - **Docker** لضمان قابلية النقل والاتساق في بيئة التطوير.

</details>

<details>
  <summary><h2>🚀 كيفية تشغيل المشروع</h2></summary>

  ### المتطلبات المسبقة

  - تثبيت **Node.js** (الإصدار 14 أو أحدث) على جهاز الكمبيوتر الخاص بك؛
  - تثبيت **Docker** و**Docker Compose** (إذا كنت ترغب في تشغيل المشروع باستخدام Docker).

  ### استنساخ المستودع

  ```bash
  git clone https://github.com/اسم_المستخدم_الخاص_بك/recipes-app.git
  cd recipes-app
  ```

  ### تشغيل المشروع محليًا (بدون Docker)

  1. تثبيت تبعيات المشروع:

     ```bash
     npm install
     ```

  2. بدء تشغيل الخادم:

     ```bash
     npm start
     ```

  3. افتح التطبيق في المتصفح:

     ```
     http://localhost:3000
     ```

  ### تشغيل المشروع باستخدام Docker

  1. بناء صورة Docker:

     ```bash
     docker build -t recipes-app .
     ```

  2. بدء تشغيل حاوية Docker:

     ```bash
     docker run -p 3000:3000 recipes-app
     ```

  3. افتح التطبيق في المتصفح:

     ```
     http://localhost:3000
     ```

  ### هيكل المشروع

  هيكل المشروع كما يلي:

  ```bash
  src/
    ├── components/          # مكونات قابلة لإعادة الاستخدام
    ├── pages/               # الصفحات الرئيسية للتطبيق (تسجيل الدخول، الوصفات، المفضلات، الملف الشخصي، إلخ)
    ├── services/            # منطق طلبات واجهة برمجة التطبيقات
    ├── context/             # إعدادات Context API
    ├── App.js               # المكون الرئيسي الذي يحتوي على التوجيه
    └── index.js             # نقطة دخول التطبيق
  ```

</details>

<details>
  <summary><h2>📈 منهجية وتطوير المهارات</h2></summary>

  أثناء تطوير هذا المشروع، تم تحسين المهارات التالية:

  - **المنهجيات الرشيقة**: استخدام **Scrum** و**Trello** للتعاون بين الفريق وإدارة المهام؛
  - **توجيه React**: تنفيذ توجيه ديناميكي للتنقل بين الصفحات المختلفة للتطبيق؛
  - **منطق البرمجة**: تطوير ميزات البحث والتصفية والتعامل مع البيانات؛
  - **إدارة الحالة**: استخدام Hooks وContext API لإدارة الحالة المحلية والعالمية؛
  - **إنشاء المكونات**: تطوير مكونات قابلة لإعادة الاستخدام والاستجابة لتناسب أجزاء مختلفة من التطبيق.

</details>

<details>
  <summary><h2>🧪 الاختبارات</h2></summary>

  يمكن تنفيذ اختبارات التطبيق باستخدام الأمر التالي:

  ```bash
  npm test
  ```

</details>

<details>
  <summary><h2>🌟 مشاريع أخرى</h2></summary>

  - 🐣 [Pokedex](https://github.com/SamuelRocha91/pokedex/blob/main/README_ar.md)
  - 🏪 [متجر على الإنترنت](https://github.com/SamuelRocha91/project-frontend-online-store/blob/main/README_ar.md)
  - 👛 [مدير النفقات](https://github.com/SamuelRocha91/project-trybewallet/blob/main/README_ar.md)
  - 🎮 [Trivia](https://github.com/SamuelRocha91/trivia_game/blob/main/README_ar.md)

</details>
