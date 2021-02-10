const express = require('express');
const db = require('./database');

const server = express();

// Installing some middleware to allow Express to parse incoming JSON request bodies

server.use(express.json());

// Root
server.get('/', (req, res) => {
    res.json({message: 'Hello, World'});
})

// Get all users
server.get('/users', (req, res) => {
    // get list of users from 'database'
    const users = db.getUsers();
    res.json(users);
})

// Get specific user
server.get('/users/:id', (req, res) => {
    const user = db.getUserById(req.params.id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({
            message: 'User Not Found',
        })
    }
})

// Creae new user
server.post("/users", (req, res) => {

	const newUser = db.createUser({
		name: req.body.name,
	});

	res.status(201).json(newUser);
})

// Update user
server.put("/users/:id", (req, res) => {
	const user = db.getUserById(req.params.id);

	if (user) {
		const updatedUser = db.updateUser(user.id, {
			name: req.body.name,
		});

		res.json(updatedUser);
	} else {
		res.status(404).json({
			message: "User not found ",
		});
	}
})

// Delete User
server.delete("/users/:id", (req, res) => {
	const user = db.getUserById(req.params.id)

	if (user) {
		db.deleteUser(user.id);

		// 204 is the status code for successful empty response
		res.status(204).end();
	} else {
		res.status(404).json({
			message: "User not found",
		});
	}
})

module.exports = server;

// Note: We want to be able to use sever implementation without starting the server. So, we separate the listen method into it's own file (index.js in this case).

// server.js contains behavior of server when interacted with
// index.js contains the code to kick off our server's listening function
