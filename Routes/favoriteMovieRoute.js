const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const {addFavorite, getFavorite, deleteFavorite, deleteSpecific} = require('../postgre/favoriteMovie');

router.get('/get', async (req, res) => {
    const { fav_account_id } = req.query;
    try {
        res.json(await getFavorite(fav_account_id));
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

router.post('/create', upload.none() , async (req, res) => {
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

router.delete('/delete/:fav_id', upload.none() , async (req, res) => {
    try {
        await deleteFavorite(req.params.fav_id);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

router.delete('/deleteSpecific/:fav_account_id/:movie_id', upload.none() , async (req, res) => {
    const fav_account_id = req.params.fav_account_id
    const movie_id = req.params.movie_id

    try {
        await deleteSpecific(fav_account_id, movie_id);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

module.exports = router;
