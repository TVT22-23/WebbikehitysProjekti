const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const {userData} = require('./accountRoute');
const jwt = require('jsonwebtoken');
const {addReview, getReview, deleteReview, getReviewsByMovieId, getReviewsByGoupId} = require('../postgre/review');


router.get('/', async (req, res) => {

        res.json(await getReview());
});

router.get('/group/:groupId', async (req, res) => {
    let groupId = req.params.groupId;
    try {
        const reviews = await getReviewsByGoupId(groupId);
        res.json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/movie/:movieID', async (req, res) => {
    let movieId = req.params.movieID;

    try {
        console.log("Got to review");
        const reviews = await getReviewsByMovieId(movieId);
        res.json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/addReview', upload.none(), async (req, res) => {
    const { text_review, rating, recommend, movie_id, groupId } = req.body;

    try {
        const authorizationHeader = req.headers.authorization;
        const jwtToken = authorizationHeader.split(' ')[1];
        const decodedToken = jwt.decode(jwtToken);

        if (!decodedToken || !decodedToken.user_name) {
            throw new Error('Invalid JWT token or missing user_name');
        }

        await addReview(text_review, rating, recommend, movie_id, decodedToken.user_name, groupId);
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});


router.delete('/delete/:review_id', upload.none() , async (req, res) => {
    try {
        await deleteReview(req.params.review_id);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

//getReview();

module.exports = router;