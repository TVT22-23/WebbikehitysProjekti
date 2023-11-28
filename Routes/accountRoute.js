const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {addAccount, getAccount, checkUser, deleteAccount} = require('../postgre/account');

router.get('/', async (req, res) => {

        res.json(await getAccount());
});

router.post('/create', upload.none() , async (req, res) => {
    const user_name = req.body.user_name;
    let password = req.body.password;
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

router.post('/login', upload.none(), async (req, res) => {
    const user_name = req.body.user_name;
    let password = req.body.password;

    const pwHash = await checkUser(user_name);

    if (pwHash) {
        const isCorrect = await bcrypt.compare(password, pwHash);
        if (isCorrect) {
            const token = jwt.sign({user_name: user_name}, '' + process.env.JWT_SECRET_KEY);
            res.status(200).json({jwtToken: token});
        } else {
            res.status(401).json({error: 'Invalid password'});
        }
    } else {
        res.status(401).json({error: 'Account not found'});
    }
});

router.delete('/delete/:user_name', upload.none() , async (req, res) => {
    try {
        await deleteAccount(req.params.user_name);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

module.exports = router;