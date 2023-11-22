const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const {addReview, getReview} = require('../postgre/review');

router.get('/', async (req, res) => {

        res.json(await getReview());
});

router.post('/', upload.none() , async (req, res) => {
    const text_review = req.body.text_review;
    const rating = req.body.rating;
    const recommend = req.body.recommend;
    const movie_id = req.body.movie_id;



    try {
        await addReview(text_review, rating, recommend, movie_id);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

module.exports = router;