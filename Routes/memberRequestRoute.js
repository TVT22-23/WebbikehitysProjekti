const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});


const {addMemberRequest, getMemberRequest, deleteMemberRequest, handleMemberRequest} = require('../postgre/memberRequest');

router.get('/:groupID', async (req, res) => {
    const c = req.params.groupID;
    res.json(await getMemberRequest(c));
});

router.post('/create/:account_accountid/:group_groupid', upload.none() , async (req, res) => {
    const account_accountid = req.params.account_accountid;
    const group_groupid = req.params.group_groupid;
    let member = false;

    try {
        await addMemberRequest(account_accountid, group_groupid, member);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

router.delete('/delete/:request_id', upload.none() , async (req, res) => {
    try {
        await deleteMemberRequest(req.params.request_id);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

router.post('/accept/:request_id', upload.none() , async (req, res) => {
    try {
        await handleMemberRequest(req.params.request_id, 'accept');
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

router.post('/reject/:request_id', upload.none() , async (req, res) => {
    try {
        await handleMemberRequest(req.params.request_id, 'reject');
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

module.exports = router;