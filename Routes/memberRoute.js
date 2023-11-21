const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});


const {addMember, getMember} = require('../postgre/member');

router.get('/', async (req, res) => {

        res.json(await getMember());
});

router.post('/', upload.none() , async (req, res) => {
    const account_accountid = req.body.account_accountid;
    const group_groupid = req.body.group_groupid;

    try {
        await addMember(account_accountid, group_groupid);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

module.exports = router;