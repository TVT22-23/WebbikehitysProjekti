require('dotenv').config();
const express = require('express');
//const multer = require('multer');
//const upload = multer({dest: 'upload/'});
const accountRoute = require('./Routes/accountRoute')
const memberRequestRoute = require('./Routes/memberRequestRoute')
const memberRoute = require('./Routes/memberRoute')
const movieGroupRoute = require('./Routes/movieGroupRoute')
const reviewRoute = require('./Routes/reviewRoute')
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/account', accountRoute);
app.use('/memberRequest', memberRequestRoute);
app.use('/member', memberRoute);
app.use('/movieGroup', movieGroupRoute);
app.use('/review', reviewRoute);

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