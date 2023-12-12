const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const jwt = require('jsonwebtoken');

const {addMember, getMember, deleteMember, getMemberByAccount} = require('../postgre/member');

router.get('/', async (req, res) => {

        res.json(await getMember());
});
router.get('/groups', async (req, res) => {
    try {
        console.log("Got to groups");
        const authorizationHeader = req.headers.authorization;
        const jwtToken = authorizationHeader.split(' ')[1];
        const decodedToken = jwt.decode(jwtToken);
        console.log(decodedToken);
        const groups = await getMemberByAccount(decodedToken.account_id);
        res.json(groups);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
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