const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./authroute');
const uploadRoute = require('./uploadroute');
const path = require('path');
const pool = require('./models/connect');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

// Set up sesi middleware
app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
    }),
);

// Set view engine ke EJS, untuk testing registrasi, login, dan upload gambar
// app.set('view engine', 'ejs');

// Membuat file statis (seperti gambar) untuk berinterkasi tanpa diproses
app.use(express.static(path.join(__dirname, 'public')));

// Pass the pool object to the routes module
app.use('/api', routes(pool));

app.use('/api', require('./authroute'));

// Fungsi Require uploadroute.js
app.use('/', require('./uploadroute'));

// Ganti Port sesuai selera
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
