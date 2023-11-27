const pgPool = require('./connection');

const sql = {
    INSERT_MEMBERREQUEST: 'INSERT INTO memberrequest (account_accountid, group_groupid, member) VALUES ($1, $2, $3)',
    GET_MEMBERREQUEST: 'SELECT * FROM memberrequest JOIN moviegroup ON group_groupid = moviegroup.groupid WHERE group_id = ?'
    
    // tänne accept ja rejectit vielä!!!

}

//addMemberRequest('', '', '');
getMemberRequest();


async function addMemberRequest(user_name, password, email) {
    await pgPool.query(sql.INSERT_MEMBERREQUEST, [user_name,password,email])
}

async function getMemberRequest(){
    const result = await pgPool.query(sql.GET_ACCOUNT);
    const rows = result.rows;
    return rows;
}

module.exports = {addMemberRequest, getMemberRequest};