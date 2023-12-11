const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const {addReview, getReview, deleteReview} = require('../postgre/review');

router.get('/', async (req, res) => {

        res.json(await getReview());
});

router.post('/addReview/:text_review/:rating/:recommend/:movie_id', upload.none() , async (req, res) => {
    const text_review = req.params.text_review;
    const rating = req.params.rating;
    const recommend = req.params.recommend;
    const movie_id = req.params.movie_id;



    try {
        await addReview(text_review, rating, recommend, movie_id);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
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