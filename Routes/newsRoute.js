const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const {addNews, getNews} = require('../postgre/news');

router.get('/', async (req, res) => {

        res.json(await getNews());
});

router.post('/', upload.none() , async (req, res) => {
    const title = req.body.title;
    const publishdate = req.body.publishdate;
    const article = req.body.article;
    const account_id = req.body.account_id;
    const group_id = req.body.group_id;



    try {
        await addReview(title, publishdate, article, account_id, group_id);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

module.exports = router;