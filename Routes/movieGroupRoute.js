const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const {addGroup, getGroup, deleteGroup} = require('../postgre/movieGroup');

router.get('/', async (req, res) => {

        res.json(await getGroup());
});

router.post('/create/:group_name/:description/:owner', upload.none() , async (req, res) => {
    const group_name = req.params.group_name;
    const description = req.params.description;
    const owner = req.params.owner;

    try {
        await addGroup(group_name, description, owner);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

router.delete('/delete/:group_id', upload.none() , async (req, res) => {
    try {
        await deleteGroup(req.params.group_id);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

module.exports = router;