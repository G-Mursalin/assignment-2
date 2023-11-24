# Mongoose-Express-CRUD-Mastery

## 👋 Introducing `Mongoose-Express-CRUD-Mastery`

`Mongoose-Express-CRUD-Mastery` is a `Node.js` `Express` application written in `TypeScript` that integrates `MongoDB` with `Mongoose` for user data and order management. Used `Zod` to validate data integrity.

## 🔥 Demo

Here is the link to the app. We hope you enjoy it.

> [The Mongoose-Express-CRUD-Mastery app Link](https://careful-gold-beaver.cyclic.app/)

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
