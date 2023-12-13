const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const bcrypt = require('bcrypt');                                                           //used to hash our account informarion
const jwt = require('jsonwebtoken');                                                        //used for login webtoken

const {addAccount, getAccount, checkUser, deleteAccount, updateAccount, updateLayout, getUname} = require('../postgre/account');   //getting functions from postgre file - included in every route file

router.get('/get', async (req, res) => {                                                       //GET-endpoint - included in every route file
    const { user_name } = req.query;

    try {
        res.json(await getAccount(user_name));
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

router.get('/getUname', async (req, res) => {                                                       
    const { account_id } = req.query;

    try {
        res.json(await getUname(account_id));
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

router.post('/create', upload.none() , async (req, res) => {                                //creating a new account POST-endpoint
    const user_name = req.body.user_name;                                                   //.
    let password = req.body.password;                                                       //.
    const email = req.body.email;                                                           //.data used for the addAccount function

    password = await bcrypt.hash(password, 10);                                             //hashing the password with bcrypt before passing it to the database


    try {
        await addAccount(user_name, password, email);                                       //sending the data with postgre function, commonly used in our endpoints
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

router.post('/login', upload.none(), async (req, res) => {                                  //login POST-endpoint
    const user_name = req.body.user_name;                                                   //.
    let password = req.body.password;                                                       //.login data

    const pwHash = await checkUser(user_name);                                              //getting the hashed password from database

    if (pwHash) {
        const isCorrect = await bcrypt.compare(password, pwHash);
        const user = await getUserDetails(user_name);
        if (isCorrect) {
            const token = jwt.sign({user_name: user_name, account_id: user.account_id }, '' + process.env.JWT_SECRET_KEY, { expiresIn: '1800s' });

            const decodedToken = jwt.decode(token);
            console.log("Decode:", decodedToken.account_id);
            res.status(200).json({jwtToken: token, currentAccId: decodedToken.account_id});
        } else {                                                                            //incorrect password
            res.status(401).json({error: 'Invalid password'});
        }
    } else {                                                                                //incorrect user
        res.status(401).json({error: 'Account not found'});
    }
});
async function getUserDetails(user_name) {
    const users = await getAccount(user_name);
    if (users.length > 0) {
        return {
            user_name: users[0].user_name,
            account_id: users[0].account_id,
        };
    } else {
        return null;
    }
}

router.delete('/delete/:user_name', upload.none() , async (req, res) => {
    try {
        await deleteAccount(req.params.user_name);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

router.post('/update', upload.none() , async (req, res) => {
    const { user_name, description, profile_picture, account_id } = req.body;

    try {
        await updateAccount(user_name, description, profile_picture, account_id);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

router.post('/updateLayout', upload.none() , async (req, res) => {
    const { layout, account_id } = req.body;

    try {
        await updateLayout(layout, account_id);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});


module.exports = router;