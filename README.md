# iNotebook - MERN Stack Note Taking App

iNotebook is a full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to create, read, update, and delete notes securely in the cloud.

## Features

- User authentication (signup, login, logout)
- Create, read, update, and delete notes
- Tag notes for better organization
- Responsive design for all devices
- Dark/Light theme toggle

## Tech Stack

### Frontend
- React.js
- Context API for state management
- React Router for navigation
- Bootstrap for styling

### Backend
- Node.js
- Express.js
- MongoDB for database
- JWT for authentication
- bcrypt.js for password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/inotebook.git
cd inotebook
```

2. Install backend dependencies
```
cd backend
npm install
```

3. Install frontend dependencies
```
cd ../inotebook
npm install
```

4. Create a .env file in the backend directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

5. Start the backend server
```
cd backend
npm start
```

6. Start the frontend development server
```
cd ../inotebook
npm start
```

7. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/createuser` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/getuser` - Get user details (protected)

### Notes
- `GET /api/notes/fetchallnotes` - Get all notes (protected)
- `POST /api/notes/addnotes` - Add a new note (protected)
- `PUT /api/notes/updatenote/:id` - Update a note (protected)
- `DELETE /api/notes/deletenote/:id` - Delete a note (protected)

## Project Structure

```
inotebook/
├── backend/             # Backend code
│   ├── middleware/      # Express middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── db.js            # Database connection
│   ├── package.json     # Backend dependencies
│   └── server.js        # Entry point
├── inotebook/           # Frontend code
│   ├── public/          # Static files
│   ├── src/             # React source code
│   │   ├── components/  # React components
│   │   ├── context/     # Context API
│   │   ├── App.js       # Main component
│   │   └── index.js     # Entry point
│   └── package.json     # Frontend dependencies
└── README.md            # Project documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Bootstrap](https://getbootstrap.com/)