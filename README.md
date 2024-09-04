![DashAndDeliver](./src/assets/Dashboard.png)
## DashAndDeliver
> DashAndDeliver is a food delivery app that connects you with restaurants, allowing you to easily order your favorite meals. With just a few taps, you can browse menus, place your order, and track your delivery.
## Links
***DashAndDeliver Link:***
***Planning Link:*** [Proposal](/PROPOSAL.md)
***Backend Repo:*** [dash-and-deliver-backend](https://github.com/NuralySol/dash-and-deliver-backend)
## Attributions
*(Was used for guidance and explanation)*
[ChatGPT](https://chatgpt.com)
*(Was used to render images)*
[Imgur](https://imgur.com)
## Technologies Used
- JavaScript
- CSS
- React
- MongoDB


## Stretch Goals

- **Pre-Order Scheduling:** Allow customers to schedule their orders well in advance, not just for immediate delivery. This could be useful for planning meals around specific events or times.

- **Detailed Nutritional Profiles:** Include comprehensive nutritional information for each menu item, such as calorie count, macronutrients (carbohydrates, proteins, fats), micronutrients (vitamins and minerals), and allergens. This could help customers make healthier choices and manage dietary needs.

- **Integrating an AI chat feature:** Personalized assistance, offer tailored menu recommendations and dietary guidance based on user preferences and health needs, provide nutritional advice and suggest healthier alternatives based on user data and preferences, etc.

## Team Expectations

[Team Expectations](https://docs.google.com/document/d/1cJsnRTeMD8zwStb7M6jFdcLx1ro5UoGyzrmQ1iOCzB0/edit?usp=sharing)

## Wireframe

<details>

![Food Delivery App Frame1](./src/assets/Wireframe%20Food%20Delivery%20App%20-%20Frame%201.jpg)
![Food Delivery App Frame2](./src/assets/Wireframe%20Food%20Delivery%20App%20-%20Frame%202.jpg)
![Food Delivery App Frame3](./src/assets/Wireframe%20Food%20Delivery%20App%20-%20Frame%203.jpg)
![Food Delivery App Frame4](./src/assets/Wireframe%20Food%20Delivery%20App%20-%20Frame%204.jpg)
![Food Delivery App Restaurant Choice](./src/assets/Wireframe%20Food%20Delivery%20App%20-%20Frame%205.jpg)

</details>

## ERD

> This the ERD for food delivery app which includes all the data types, and relationships. It also includes our stretch goals.
> ![Food Delivery App ERD](./src/assets/Food%20Delivery%20App%20ERD%20-%20ERD%20Table.jpg)

- See the details of the ERD

<details>

![Details of ERD](./src/assets/Food%20Delivery%20App%20ERD%20-%20ERD%20explanation.jpg)

</details>

## Routes for the App

<details>

- Unprotected routes

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| GET    | `/`                  | Welcome message           |
| POST   | `/api/auth/register` | Register a new user       |
| POST   | `/api/auth/login`    | Log in a user             |
| GET    | `/api/restaurants`   | Get a list of restaurants |

- Protected routes

| Method | Endpoint                         | Description                                    |
| ------ | -------------------------------- | ---------------------------------------------- |
| GET    | `/api/menu-items`                | Get all menu items                             |
| POST   | `/api/menu-items`                | Create a new menu item                         |
| GET    | `/api/orders`                    | Get all orders for the authenticated user      |
| POST   | `/api/orders`                    | Create a new order                             |
| GET    | `/api/addresses`                 | Get all addresses for the authenticated user   |
| POST   | `/api/addresses`                 | Create a new address                           |
| GET    | `/api/addresses/:id`             | Get a specific address by ID                   |
| PUT    | `/api/addresses/:id`             | Update an existing address by ID               |
| DELETE | `/api/addresses/:id`             | Delete an address by ID                        |
| POST   | `/payment/create-payment-intent` | Create a payment intent for a specific amount. |

</details>

## Basic Schemas

```Javascript
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});
Javascript
```

## Timeline

## August 24, 2024 (Saturday)

- Research API's, create a proposal and start brain-storming!

## August 25, 2024 (Sunday)

- Create folder structure and work on the skeleton of the project.

## August 26, 2024 (Monday)

- Create a basic mock up of the project and create the Mongo Database.

## August 27, 2024 (Tuesday)

- Work on implementing CRUD operations and routes.

## August 28, 2024 (Wednesday)

- Work on user stories and attempt to deploy.

## August 29, 2024 (Thursday)

- Work on user stories.

## August 30, 2024 (Friday)

- Create CSS files and work on the aesthetics of the pages.

## August 31, 2024 (Saturday)

- Work on CSS and complete user stories.

## September 1, 2024 (Sunday)

- Work on CSS and add any finishing touches.

## September 2, 2024 (Monday)

- Add any finishing touches, make sure project is completely debugged, functional and ready.

## September 3, 2024 ​⬤ (Tuesday)​⬤

- Presentation day

## Technologies used

MERN Stack (MongoDB, Express, React, Node.JS/Javascript)
