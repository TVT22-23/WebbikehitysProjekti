const { pgPool } = require('./connection');                                                             //using the connetion to our database to send queries to said database
const axios = require('axios')                                                                          //webtoken testing

const sql = {                                                                                           //contains sql-queries for functions used in the postgre folder
    INSERT_ACCOUNT: 'INSERT INTO account (user_name, password, email) VALUES ($1, $2, $3)',             //included at the top of every postgre file
    GET_ACCOUNT: 'SELECT account_id, email, description, layout, profile_picture FROM account WHERE user_name=$1',
    GET_UNAME: 'SELECT user_name FROM account WHERE account_id=$1',
    GET_PASSWORD: 'SELECT password FROM account WHERE user_name=$1',
    DELETE_ACCOUNT: 'DELETE FROM account WHERE user_name=$1',
    UPDATE_ACCOUNT: 'UPDATE account SET user_name = $1, description = $2, profile_picture = $3 WHERE account_id=$4',
    UPDATE_LAYOUT: 'UPDATE account SET layout = $1 WHERE account_id=$2'
}

//addAccount('poistoAccount', 'poistoPassword', 'poistoEmail');                                         //testing
//getAccount();
//deleteAccount('poistoAccount');

/*
axios.post("//localhost:3001/account/create/testAccount4/testPass4/testEmail4")                         //webtoken testing
            .catch(error => {
                console.error('error putting data', error);
            })
*/


async function addAccount(user_name, password, email) {                                                 //adding an account to the account-table in database
    await pgPool.query(sql.INSERT_ACCOUNT, [user_name,password,email])
}

async function getAccount(user_name){                                                                   //getting data from database - included in every postgre file
    const result = await pgPool.query(sql.GET_ACCOUNT,[user_name]);
    const rows = result.rows;
    return rows;
}

async function getUname(account_id){                                                                   //getting data from database - included in every postgre file
    const result = await pgPool.query(sql.GET_UNAME,[account_id]);
    const rows = result.rows;
    return rows;
}

async function checkUser(user_name) {                                                                   //getting the user password for login from database
    const result = await pgPool.query(sql.GET_PASSWORD, [user_name]);

    if (result.rows.length > 0) {
        return result.rows[0].password;
    } else {
        return null;
    }
}

async function deleteAccount(user_name) {                                                               //deleting a row from database based on a variable
    await pgPool.query(sql.DELETE_ACCOUNT, [user_name]);                                                //included in every postgre file - variable in most cases is tablename_id (autoincrement)
}

async function updateAccount(user_name, description, profile_picture, account_id) {
    await pgPool.query(sql.UPDATE_ACCOUNT, [user_name, description, profile_picture, account_id]);
}

async function updateLayout(layout, account_id) {
    await pgPool.query(sql.UPDATE_LAYOUT, [layout, account_id]);
}

module.exports = {addAccount, getAccount, checkUser, deleteAccount, updateAccount, updateLayout, getUname};       //exporting functions to be used in Route-files - included in every postgre file