const { pgPool } = require('./connection');

const sql = {
    INSERT_ACCOUNT: 'INSERT INTO account (user_name, password, email) VALUES ($1, $2, $3)',
    GET_ACCOUNT: 'SELECT user_name, email FROM account',
    GET_PASSWORD: 'SELECT password FROM account WHERE user_name=$1',
    DELETE_ACCOUNT: 'DELETE FROM account WHERE user_name=$1'
}

//addAccount('poistoAccount', 'poistoPassword', 'poistoEmail');
//getAccount();
//deleteAccount('poistoAccount');


async function addAccount(user_name, password, email) {
    await pgPool.query(sql.INSERT_ACCOUNT, [user_name,password,email])
}

async function getAccount(){
    const result = await pgPool.query(sql.GET_ACCOUNT);
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