const express = require('express');
const routes = require('../routes/routes');
const port = 8000;

// Express setup
const app = new express();
app.use(express.json()); // This is to tell express to expect json data
app.use(express.urlencoded({extended:false})); // we expect the form to be of type application/x-www-form-urlencoded
routes(app); // Register routes with app

// Implement Express Router - It allows chaining of routes
const router = express.Router();
app.use('/', router)


// Listening to the port
app.listen(port, () => console.log("Listening " + port));
