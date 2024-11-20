/my-project
│
├── /src
│ ├── /ui
│ │ ├── /controllers
│ │ │ ├── productController.ts
│ │ │ ├── cartController.ts
│ │ │ ├── orderController.ts
│ │ │ └── userController.ts
│ │ ├── /routes
│ │ │ ├── productRoutes.ts
│ │ │ ├── cartRoutes.ts
│ │ │ ├── orderRoutes.ts
│ │ │ └── userRoutes.ts
│ │ ├── /middleware
│ │ │ ├── authMiddleware.ts
│ │ │ ├── errorMiddleware.ts
│ │ │ └── upload.ts
│ │
│ ├── /domain
│ │ ├── /models
│ │ │ ├── Product.ts
│ │ │ ├── Cart.ts
│ │ │ ├── Order.ts
│ │ │ └── User.ts
│ │ ├── /services
│ │ │ ├── IProductService.ts
│ │ │ ├── ICartService.ts
│ │ │ ├── IOrderService.ts
│ │ │ └── IUserService.ts
│ │ ├── /validation
│ │ │ └── userValidation.ts
│ │
│ ├── /application
│ │ └── /services
│ │ ├── ProductService.ts
│ │ ├── CartService.ts
│ │ ├── OrderService.ts
│ │ └── UserService.ts
│ │
│ ├── /infrastructure
│ │ └── /repositories
│ │ ├── ProductRepository.ts
│ │ ├── CartRepository.ts
│ │ ├── OrderRepository.ts
│ │ └── UserRepository.ts
│ │
│ ├── /resources
│ │ ├── products.store.json
│ │ ├── carts.store.json
│ │ ├── orders.store.json
│ │ └── users.store.json
│ │
│ ├── /logs
│ │ └── filesUpload.log
│ │
│ ├── app.ts
│ └── server.ts
│
├── .eslintrc.js
├── .prettierrc
├── .eslintignore
├── package.json
└── tsconfig.json
