const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const {addGroup, getGroup, deleteGroup} = require('../postgre/movieGroup');

router.get('/', async (req, res) => {

        res.json(await getGroup());
});

router.post('/create', upload.none() , async (req, res) => {
    const group_name = req.body.group_name;
    const description = req.body.description;
    const owner = req.body.owner;

    try {
        await addGroup(group_name, description, owner);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

router.delete('/delete/:group_name', upload.none() , async (req, res) => {
    try {
        await deleteGroup(req.params.group_name);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

module.exports = router;