const express = require('express');
const defaultrouttes = require('./src/routes/default');
const attestation = require('./src/routes/attestation');
const assertion = require('./src/routes/assertion');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const crypto = require('crypto');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS module

//const users = require('./routes/users');

const app = express();

//connect to MongoDB
mongoose.connect('mongodb+srv://deafhole:microsoft@cluster0.7ssubtn.mongodb.net/zygi?retryWrites=true&w=majority&appName=Cluster0').then(
    () => {console.log('Connected to MongoDB')},
    err => {console.log('Error connecting to MongoDB')}
);

// Use CORS middleware
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(expressSession({
  secret: crypto.randomBytes(32).toString('hex'),
  resave: true,
  saveUninitialized: true
}));
app.use(cookieParser());
app.use(express.static('./src/public/'));

// Add the middleware function to set HTTP headers
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

const port = 3000;
app.get('/api', function (req, res) {
    return res.send("Fabrikam Bank API");
})
/** 
 * routes
 */
app.use('/', defaultrouttes);
app.use('/attestation', attestation);
app.use('/assertion', assertion);

//app.use('/users', users);

app.listen(port, () => {
  console.log(`listen port: ${port}`);
});
