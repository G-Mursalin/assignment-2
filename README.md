# Mongoose-Express-CRUD-Mastery

## 👋 Introducing `Mongoose-Express-CRUD-Mastery`

`Mongoose-Express-CRUD-Mastery` is a `Node.js` `Express` application written in `TypeScript` that integrates `MongoDB` with `Mongoose` for user data and order management. Used `Zod` to validate data integrity.

## 🔥 Demo

Here is the link to the server. We hope you enjoy it.

> [The Mongoose-Express-CRUD-Mastery server Link](https://careful-gold-beaver.cyclic.app/)

## 🏗️ How to Set up `Mongoose-Express-CRUD-Mastery` locally?

### 🛠️ Prerequisites

Make sure you have the following installed on your machine:

- Node.Js: [Download and install Node.js](https://nodejs.org/en)
- Git: [Download and install Git](https://git-scm.com/)

### 🍴 Clone the Repo

1. Open a terminal or command prompt on your machine.

2. Navigate to the directory where you want to clone the project.

3. Run the following command to clone the repository:

```
git clone https://github.com/G-Mursalin/assignment-2.git
```

### ⬇️ Install Dependencies

1. Navigate into the project directory:

```
cd assignment-2
```

2. Install project dependencies using `npm`:

```
npm install
```

### 💎 Set Up Environment Variables

1. Create a `.env` file in the root of the project.
2. Check out the `.env.example` file and then copy everything into the `.env` file.Then set your own PORT, MONGODB_URL, and BCRYPT_SALT in `.env`

### 🦄 Start the Development Mode

Use the following command to start the app in the development mode:

```
npm run dev
```

It runs the server in development mode. Open [http://localhost:PORT](http://localhost:PORT) to view it in your browser. Where PORT is the port number specified in your `.env` file.

### ✨ Format and lint the code

Use the following command to format and lint the code:

- To lint the code:

```
npm run lint
```

- To automatically fix linting issues:

```
npm run lint:fix
```

- To format code using Prettier:

```
npm run prettier
```

- To automatically fix formatting issues:

```
npm run prettier:fix
```

### 🧱 Build the App for Production

Use the following command to build the app for production:

```
npm run build
```

It builds the app for production in the `dist` folder. It contains all javascript files that were converted from typescript files.

## ♨️ How to use `Mongoose-Express-CRUD-Mastery` server

### User Management:

### 1. Create a new user

- Endpoint: **POST /api/users**
- Request Body:

```json
{
  "userId": "number",
  "username": "string",
  "password": "string",
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "age": "number",
  "email": "string",
  "isActive": "boolean",
  "hobbies": ["string", "string"],
  "address": {
    "street": "string",
    "city": "string",
    "country": "string"
  }
}
```

- Response: Newly created user object. **Password field is not included in the response data and password is saved hashed to database**

```json
{
  "success": true,
  "message": "User created successfully!",
  "data": {
    "userId": "number",
    "username": "string",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": ["string", "string"],
    "address": {
      "street": "string",
      "city": "string",
      "country": "string"
    }
  }
}
```

### 2. Retrieve a list of all users

- Endpoint: **GET /api/users**
- Response: List of user objects. Each object only contain `username`, `fullName`, `age`, `email`, `address`.

```json
{
  "success": true,
  "message": "Users fetched successfully!",
  "data": [
    {
      "username": "string",
      "fullName": {
        "firstName": "string",
        "lastName": "string"
      },
      "age": "number",
      "email": "string",
      "address": {
        "street": "string",
        "city": "string",
        "country": "string"
      }
    }
    // more objects...
  ]
}
```

### 3. Retrieve a specific user by ID

- Endpoint: **GET /api/users/:userId**

- Response: User object and password field is not included in the response data. If there is no information about the user, response show a clear error message. ([format of error messages](#sample-error-response))

```json
{
  "success": true,
  "message": "User fetched successfully!",
  "data": {
    "userId": "number",
    "username": "string",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": ["string", "string"],
    "address": {
      "street": "string",
      "city": "string",
      "country": "string"
    }
  }
}
```

### 4. Update user information

- Endpoint: **PUT /api/users/:userId**

- Request Body: Updated user data (use similar structure as in user creation).

- Response: Updated user information. The password field is not included in the response data. If there is no information about the user, response show a clear error message. ([format of error messages](#sample-error-response))

```json
{
  "success": true,
  "message": "User updated successfully!",
  "data": {
    "userId": "number",
    "username": "string",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": ["string", "string"],
    "address": {
      "street": "string",
      "city": "string",
      "country": "string"
    }
  }
}
```

### 5. Delete a user

- Endpoint: **DELETE /api/users/:userId**

- Response: Success message or, If there is no information about the user, response show a clear error message. ([format of error messages](#sample-error-response))

```json
{
  "success": true,
  "message": "User deleted successfully!",
  "data": null
}
```

### Order Management:

### 1. Add New Product in Order

- Endpoint: **PUT /api/users/:userId/orders**

- Request Body: If there is no information about the user, response show a clear error message. ([format of error messages](#sample-error-response))

```json
{
  "productName": "string",
  "price": "number",
  "quantity": "number"
}
```

- Response:

```json
{
  "success": true,
  "message": "Order created successfully!",
  "data": null
}
```

### 2. Retrieve all orders for a specific user

- Endpoint: **GET /api/users/:userId/orders**

- Response: List of order objects for the specified user or, If there is no information about the user, response show a clear error message. ([format of error messages](#sample-error-response))

```json
{
  "success": true,
  "message": "Order fetched successfully!",
  "data": {
    "orders": [
      {
        "productName": "Product 1",
        "price": 23.56,
        "quantity": 2
      },
      {
        "productName": "Product 2",
        "price": 23.56,
        "quantity": 5
      }
    ]
  }
}
```

### 3. **Calculate Total Price of Orders for a Specific User**

- Endpoint: **GET /api/users/:userId/orders/total-price**
- Response: Total price of all orders for the specified user or, If there is no information about the user, response show a clear error message. ([format of error messages](#sample-error-response))

```json
{
  "success": true,
  "message": "Total price calculated successfully!",
  "data": {
    "totalPrice": 454.32
  }
}
```

### Sample Error Response

```json
{
  "success": false,
  "message": "User not found",
  "error": {
    "code": 404,
    "description": "User not found!"
  }
}
```
