const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});


const {addMemberRequest, getMemberRequest} = require('../postgre/memberRequest');

router.get('/', async (req, res) => {

        res.json(await getMemberRequest());
});

router.post('/', upload.none() , async (req, res) => {
    const account_accountid = req.body.account_accountid;
    const group_groupid = req.body.group_groupid;
    let member = false;

    try {
        await addMemberRequest(account_accountid, group_groupid, member);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

module.exports = router;