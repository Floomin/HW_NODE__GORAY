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


Technical Documentation for the Express.js Online Store REST API
Project Overview

This project is a REST API developed using Express.js for an online store. The API allows for user registration, product management, shopping cart management, and order processing. All data is stored in memory (using arrays in storage.js), and unique IDs for users, products, carts, and orders are generated using UUIDs.
Project Structure

The project follows a modular structure for maintainability and scalability. Key modules include controllers, routes, middleware, and utilities. Additionally, validation logic for email and password is separated into its own module, and errors are handled consistently across the application.
Project Folders:

    controllers/: Handles the business logic for users, products, carts, and orders.
    routes/: Defines all API endpoints and connects them to the relevant controller functions.
    middleware/: Includes validation logic for email and password.
    utils/: Contains helper functions like UUID generation and error handling.
    storage.js: Stores in-memory data for products, users, carts, and orders.
    server.js: The entry point for the application, where the Express server is initialized and all routes are defined.

API Endpoints
1. User Registration:

    POST /api/users/register

    Registers a new user by receiving email, name, and password from the request body. Email and password undergo validation using regular expressions. If valid, the user is assigned a UUID, and the data is saved in memory.

        Request Body Example:

        json

{
  "email": "ann.jones@epam.com",
  "name": "Anna Jones",
  "password": "DDQldls?kdpw0fk"
}

Response Example:

json

        {
          "id": "eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
          "email": "ann.jones@epam.com",
          "name": "Anna Jones"
        }

2. Product Management:

    GET /api/products

    Retrieves the entire list of available products from the in-memory storage.
        Response Example:

        json

    [
      {
        "id": 1,
        "title": "Digital Painting",
        "description": "A custom digital painting created by a professional artist.",
        "price": 50
      },
      {
        "id": 2,
        "title": "Online Yoga Class",
        "description": "A one-hour online yoga session with a certified instructor.",
        "price": 20
      }
    ]

GET /api/products/{productId}

Retrieves a specific product by its productId.

    Response Example:

    json

        {
          "id": 1,
          "title": "Digital Painting",
          "description": "A custom digital painting created by a professional artist.",
          "price": 50
        }

3. Shopping Cart Management:

    PUT /api/cart/{productId}

    Adds a product to the user's shopping cart. If no cart exists for the user, a new cart is created. The user ID is expected to be sent in the x-user-id header. If the header is missing, the operation is denied with a 401 error.

        Request Header Example:

        makefile

x-user-id: eb5a26af-6e4c-4f31-a9b1-3450d42ac66c

Response Example:

json

    {
      "id": "f85d153d-2f13-4a7e-a818-2b9c7e33302c",
      "userId": "eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
      "products": [
        {
          "id": 1,
          "title": "Digital Painting",
          "price": 50
        }
      ]
    }

DELETE /api/cart/{productId}

Removes a product from the user's cart by product ID. The user ID must be provided in the x-user-id header.

    Request Header Example:

    makefile

        x-user-id: eb5a26af-6e4c-4f31-a9b1-3450d42ac66c

4. Order Processing:

    POST /api/cart/checkout

    Finalizes the purchase and creates an order. The cart must have products, and the user ID must be provided in the x-user-id header. The order stores the user ID, the list of products, and the total price.
        Response Example:

        json

        {
          "id": "b85e573d-8e59-43c5-92fc-9471c52cc214",
          "userId": "eb5a26af-6e4c-4f31-a9b1-3450d42ac66c",
          "products": [
            {
              "id": 1,
              "title": "Digital Painting",
              "price": 50
            }
          ],
          "totalPrice": 50
        }

Middleware

    Validation (validation.js):
        Validates email format and password complexity using regular expressions.
        If email or password validation fails, a 400 error is returned with the appropriate message.

    UUID Generator (uuidGenerator.js):
        Generates unique UUIDs for users, carts, and orders using the crypto module's randomUUID() function.

    Error Handling (errorHandler.js):
        Centralized error handler for managing and sending error responses in a consistent format across the API.

Business Logic

    User Registration:
        Upon registration, the user information is validated and stored in the users array.
        The password is not hashed (for simplicity in this project, but should be hashed in a real application).

    Product Retrieval:
        Products are retrieved from the products array in storage.js.

    Cart Management:
        When adding a product to the cart, the system checks if a cart exists for the user. If not, a new cart is created with the user’s ID and the product is added.
        The cart is stored in the carts array.

    Order Creation:
        When checking out, the system retrieves the user's cart, calculates the total price of all products, and stores the order in the orders array.

Testing and Validation

    Jest is used for unit testing the API’s core functions (e.g., registration, cart management).
    Postman can be used to manually test the API by sending requests to each endpoint with the required headers and body data.
    ESLint ensures code quality and enforces consistent styling.
    Prettier formats the code according to predefined rules, ensuring a clean and readable codebase.

