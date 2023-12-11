const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const {addNews, getNews, deleteNews} = require('../postgre/news');

router.get('/', async (req, res) => {

        res.json(await getNews());
});

router.post('/create/:title/:publishdate/:article/:account_id/:group_id', upload.none() , async (req, res) => {
    const title = req.params.title;
    const publishdate = req.params.publishdate;
    const article = req.params.article;
    const account_id = req.params.account_id;
    const group_id = req.params.group_id;



    try {
        await addNews(title, publishdate, article, account_id, group_id);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

router.delete('/delete/:news_id', upload.none() , async (req, res) => {
    try {
        await deleteNews(req.params.news_id);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

module.exports = router;