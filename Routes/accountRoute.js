const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const bcrypt = require('bcrypt');

const {addAccount, getAccount} = require('../postgre/account');

router.get('/', async (req, res) => {

        res.json(await getAccount());
});

router.post('/', upload.none() , async (req, res) => {
    const user_name = req.body.user_name;
    const password = req.body.password;
    const email = req.body.email;

    password = await bcrypt.hash(password, 10);


    try {
        await addAccount(user_name, password, email);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

module.exports = router;