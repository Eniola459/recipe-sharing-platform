# Recipe Sharing Platform

## Overview
This is a backend API for a recipe-sharing platform that allows users to create, update, delete, and search for recipes. Users can also create profiles, like recipes, and comment on them.

## Features
- User login 
- User profile management (Create, Read, Update, Delete)
- Recipe management (Create, Read, Update, Delete)
- Search recipes by title
- Like and comment on recipes

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT

## Installation

1. Clone the repository:
```bash
 git clone https://github.com/Eniola459/recipe-sharing-platform.git
```

2. Install dependencies:
```bash
 cd recipe-sharing-platform
 npm install
```

3. Create a `.env` file and add your environment variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

```

4. Start the server:
```bash
 npm run dev
```

## API Endpoints

### Profile Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/api/profile` | Create a user profile |
| GET    | `/api/profile/:userId` | Get a user profile by ID |
| PUT    | `/api/profile/:userId` | Update a user profile |
| DELETE | `/api/profile/:userId` | Delete a user profile |
| GET    | `/api/profile/search?firstName=John&lastName=Doe` | Search profiles by name |

### Recipe Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/api/recipes` | Create a new recipe |
| GET    | `/api/recipes/:recipeId` | Get a recipe by ID |
| PUT    | `/api/recipes/:recipeId` | Update a recipe by ID |
| DELETE | `/api/recipes/:recipeId` | Delete a recipe by ID |
| POST   | `/api/recipes/:recipeId/like` | Like a recipe |
| POST   | `/api/recipes/:recipeId/comment` | Comment on a recipe |
| GET    | `/api/recipes/search?title=chicken` | Search for recipes by title |

## Usage
You can test the API using Postman or any API testing tool by sending requests to the endpoints listed above.

## Documentation Link
[API Documentation](http://localhost:5000/api-docs/) 

## Contributing
If you'd like to contribute, feel free to fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.
