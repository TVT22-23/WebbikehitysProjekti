const { pgPool } = require('./connection');
const axios = require('axios')

const sql = {
    INSERT_ACCOUNT: 'INSERT INTO account (user_name, password, email) VALUES ($1, $2, $3)',
    GET_ACCOUNT: 'SELECT account_id, user_name, email FROM account WHERE user_name=$1',
    GET_PASSWORD: 'SELECT password FROM account WHERE user_name=$1',
    DELETE_ACCOUNT: 'DELETE FROM account WHERE user_name=$1'
}

//addAccount('poistoAccount', 'poistoPassword', 'poistoEmail');
//getAccount();
//deleteAccount('poistoAccount');

/*
axios.post("//localhost:3001/account/create/testAccount4/testPass4/testEmail4")
            .catch(error => {
                console.error('error putting data', error);
            })
*/


async function addAccount(user_name, password, email) {
    await pgPool.query(sql.INSERT_ACCOUNT, [user_name,password,email])
}

async function getAccount(user_name){
    const result = await pgPool.query(sql.GET_ACCOUNT,[user_name]);
    const rows = result.rows;
    return rows;
}

async function checkUser(user_name) {
    const result = await pgPool.query(sql.GET_PASSWORD, [user_name]);

    if (result.rows.length > 0) {
        return result.rows[0].password;
    } else {
        return null;
    }
}

async function deleteAccount(user_name) {
    await pgPool.query(sql.DELETE_ACCOUNT, [user_name]);
}

module.exports = {addAccount, getAccount, checkUser, deleteAccount};