const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const {userData} = require('./accountRoute');
const {addReview, getReview} = require('../postgre/review');


router.get('/', async (req, res) => {

        res.json(await getReview());
});

router.post('/addReview', upload.none(), async (req, res) => {
    const { text_review, rating, recommend, movie_id, user_name } = req.body;




    try {
        console.log("testingTesting");
        await addReview(text_review, rating, recommend, movie_id, user_name);
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

//getReview();

module.exports = router;