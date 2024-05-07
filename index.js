// ***************************************************************************
// Bank API code from Web Dev For Beginners project
// https://github.com/microsoft/Web-Dev-For-Beginners/tree/main/7-bank-project/api
// ***************************************************************************

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const crypto = require('crypto');



// App constants
const port = process.env.PORT || 3000;
const apiPrefix = '/api';


// Create the Express app & setup middlewares
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

// ***************************************************************************

// Configure routes
const router = express.Router();

// Hello World for index page
// app.get('/', function (req, res) {
//     return res.send("Hello World!");
// })

app.get('/api', function (req, res) {
    return res.send("Fabrikam Bank API");
})
  

  
// ***************************************************************************

// Add 'api` prefix to all routes
app.use(apiPrefix, router);

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
  
