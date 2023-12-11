const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const {userData} = require('./accountRoute');
const {addReview, getReview} = require('../postgre/review');
const jwt = require('jsonwebtoken');


router.get('/', async (req, res) => {

        res.json(await getReview());
});

router.post('/addReview', upload.none(), async (req, res) => {
    const { text_review, rating, recommend, movie_id } = req.body;

    try {
        const authorizationHeader = req.headers.authorization;
        const jwtToken = authorizationHeader.split(' ')[1];
        const decodedToken = jwt.decode(jwtToken);

        if (!decodedToken || !decodedToken.user_name) {
            throw new Error('Invalid JWT token or missing user_name');
        }

        await addReview(text_review, rating, recommend, movie_id, decodedToken.user_name);
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});


//getReview();

module.exports = router;