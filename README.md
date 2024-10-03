ДЗ 47. Basic Express.js
Написати REST API на Express.js для онлайн магазину
API має реалізовувати наступні ендпоінти:

1. POST /api/register - зареєструвати, тобто створити користувача;
   Request/Response example:
   Requst body: {
   "email": "ann.jones@epam.com",
   "name": "Anna Jones",
   "password": "DDQldls?kdpw0fk",
   }
   Response: {
   "id": "eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
   "email": "ann.jones@epam.com",
   "name": "Anna Jones",
   }
2. GET /api/products - отримати весь список продуктів; продукти є в доданому файлі storage.js
3. GET /api/products/{productId} - отримати один продукт по його id;
4. PUT /api/cart/{productId} - додати продукт в корзину, якщо корзини немає - створити її;
   Cart schema:
   {
   id: string; // uuid
   userId: string;
   products: array[];
   }
5. DELETE /api/cart/{productId} - видалити продукт з корзини
6. POST /api/cart/checkout - створити замовлення
   Order schema:
   {
   id: // uuid
   userId: string;
   products: array[] // list of products
   totalPrice: number;
   }
   • Всі дані мають зберігатися в пам'яті(дивись прикріплений до завдання файл storage.js)
   • використати nodemon для запуску програми і додати команду для запуску в package.json
   • uuid має бути використано якості унікальних ідентифікаторів для кожної сутності
   • для генерації uuid можна використати функцію randomUUID() з вбудованого модулю crypto.
   Після створення користувача, всі подальші опецації зі створення корзини та замовлення мають бути прив'язані до id цього користувача. Id користувача має відправлятися в заголовку x-user-id. Якщо x-user-id немає, створення корзини та замовлення не має відбутися, клієнт має отримати помилку з кодом 401.
   Додати валідацію для email and password(можна використовувати регулярні вирази). Правила наступні:
   Email:
7. Формат: Перевірте, щоб електронна адреса відповідала стандартному формату (наприклад, user@example.com).
   • Електронна адреса повинна містити один символ @.
   • Після @ повинно бути ім'я домену (наприклад, example.com).
   • Домейн повинен мати хоча б одну крапку (.) і доменну частину, що складається мінімум з двох символів (наприклад, .com, .org).
8. Допустимі символи: Перевірте, що електронна адреса містить тільки допустимі символи: латинські літери, цифри, крапку (.), дефіс (-), символ підкреслення (\_).
9. Довжина: Загальна довжина електронної адреси не повинна перевищувати 254 символи.
   Password:
10. Мінімальна довжина: Пароль повинен містити як мінімум 8 символів.
11. Комплексність: Переконайтеся, що пароль містить:
    • Принаймні одну велику літеру (A-Z).
    • Принаймні одну малу літеру (a-z).
    • Принаймні одну цифру (0-9).
    • Принаймні один спеціальний символ (наприклад, !@#$%^&\*).

//storage.js
export const products = [
{
id: 1,
title: "Digital Painting",
description: "A custom digital painting created by a professional artist.",
price: 50
},
{
id: 2,
title: "Online Yoga Class",
description: "A one-hour online yoga session with a certified instructor.",
price: 20
},
/*Аналогичные данные*/
];
export const users = []; // store the list of users here
export const carts = []; // list of carts
export const orders = []; // list of crated orders

Команды:
npm init -y
npm install express uuid
npm install --save-dev nodemon eslint
npm install --save-dev jest
npx eslint --init
npm install --save-dev prettier
