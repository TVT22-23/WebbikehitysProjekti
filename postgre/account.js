const pgPool = require('./connection');

const sql = {
    INSERT_ACCOUNT: 'INSERT INTO account (user_name, password, email) VALUES ($1, $2, $3)',
    GET_ACCOUNT: 'SELECT user_name, email FROM account'
}

//addAccount('testAccount', 'testPassword', 'testEmail');
getAccount();


async function addAccount(user_name, password, email) {
    await pgPool.query(sql.INSERT_ACCOUNT, [user_name,password,email])
}

async function getAccount(){
    const result = await pgPool.query(sql.GET_ACCOUNT);
    const rows = result.rows;
    return rows;
}

module.exports = {addAccount, getAccount};