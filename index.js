require('dotenv').config();
const express = require('express');
//const multer = require('multer');
//const upload = multer({dest: 'upload/'});
const accountRoute = require('./Routes/accountRoute')
const memberRequestRoute = require('./Routes/memberRequestRoute')
const memberRoute = require('./Routes/memberRoute')
const movieGroupRoute = require('./Routes/movieGroupRoute')
const reviewRoute = require('./Routes/reviewRoute')
const favouriteMovieRoute = require('./Routes/favoriteMovieRoute')
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/account', accountRoute);
//app.use(authenticateToken);
app.use('/memberRequest', memberRequestRoute);
app.use('/member', memberRoute);
app.use('/movieGroup', movieGroupRoute);
app.use('/review', reviewRoute);
app.use('/favouriteMovie', favouriteMovieRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('Server running on port ' + PORT)
} );

app.get('/', (req, res) => {
    res.send('Home page')
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