const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const {addFavorite, getFavorite} = require('../postgre/favoriteMovie');

router.get('/', async (req, res) => {

        res.json(await getFavorite());
});

router.post('/', upload.none() , async (req, res) => {
    const fav_account_id = req.body.fav_account_id;
    const movie_id = req.body.movie_id;

    try {
        await addFavorite(fav_account_id, movie_id);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

module.exports = router;