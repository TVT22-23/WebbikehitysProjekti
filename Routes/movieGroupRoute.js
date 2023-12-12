const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const jwt = require('jsonwebtoken');
const {addGroup, getGroup, deleteGroup, changeOwner, getGroupById} = require('../postgre/movieGroup');

router.get('/', async (req, res) => {
        console.log("Got to group get");
        res.json(await getGroup());
});
router.get('/:group_id', async (req, res) => {
    console.log("Got to group_id");
    const id = req.params.group_id;
    res.json(await getGroupById(id));
});


router.post('/create', upload.none() , async (req, res) => {
    const { group_name, description,} = req.body;
    console.log("Got to create group");
    try {
        const authorizationHeader = req.headers.authorization;
        const jwtToken = authorizationHeader.split(' ')[1];
        const decodedToken = jwt.decode(jwtToken);

        if (!decodedToken || !decodedToken.account_id) {
            throw new Error('Invalid JWT token or missing user_name');
        }

        await addGroup(group_name, description, decodedToken.account_id);
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

router.post('/changeOwner/:owner/:group_id', upload.none() , async (req, res) => {
    try {
        await changeOwner(req.params.owner ,req.params.group_id);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

module.exports = router;