require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
//const multer = require('multer');
//const upload = multer({dest: 'upload/'});
const accountRoute = require('./Routes/accountRoute')
const memberRequestRoute = require('./Routes/memberRequestRoute')
const memberRoute = require('./Routes/memberRoute')
const movieGroupRoute = require('./Routes/movieGroupRoute')
const reviewRoute = require('./Routes/reviewRoute')
const favoriteMovieRoute = require('./Routes/favoriteMovieRoute')
const newsRoute = require('./Routes/newsRoute')
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();



app.use(cookieParser());

app.use(
  session({
    secret: 'lolol', // replace with your own secret key
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "None",
      secure: false, // set to true if using HTTPS
    },
  })
);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000",
}))
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  next();
});

app.use('/account', accountRoute);
//app.use(authenticateToken);
app.use('/memberRequest', memberRequestRoute);
app.use('/member', memberRoute);
app.use('/movieGroup', movieGroupRoute);
app.use('/review', reviewRoute);
app.use('/favoriteMovie', favoriteMovieRoute);
app.use('/news', newsRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('Server running on port ' + PORT)
} );

app.get('/', (req, res) => {
    res.send('Home page')
    // Store user information in the session
});

app.get('/user', (req, res) => {
    res.send('Jorma')
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    console.log("token = "+token);
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }

module.exports = app;