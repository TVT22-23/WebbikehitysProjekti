const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});


const {addMember, getMember, deleteMember} = require('../postgre/member');

router.get('/', async (req, res) => {

        res.json(await getMember());
});

router.post('/create/:account_accountid/:group_groupid', upload.none() , async (req, res) => {
    const account_accountid = req.params.account_accountid;
    const group_groupid = req.params.group_groupid;

    try {
        await addMember(account_accountid, group_groupid);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

router.delete('/delete/:member_id', upload.none() , async (req, res) => {
    try {
        await deleteMember(req.params.member_id);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

module.exports = router;