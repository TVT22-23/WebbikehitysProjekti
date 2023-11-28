const { pgPool }= require('./connection');

const sql = {
    INSERT_MEMBERREQUEST: 'INSERT INTO memberrequest (account_accountid, group_groupid, member) VALUES ($1, $2, $3)',
    GET_MEMBERREQUEST: 'SELECT * FROM memberrequest JOIN moviegroup ON group_groupid = moviegroup.group_id WHERE group_id = ($1)',
    DELETE_MEMBERREQUEST: 'DELETE FROM memberrequest WHERE request_id=$1'
    
    // tänne accept ja rejectit vielä!!!

}

//addMemberRequest('', '', '');
getMemberRequest();


async function addMemberRequest(account_accountid, group_groupid, member) {
    await pgPool.query(sql.INSERT_MEMBERREQUEST, [account_accountid,group_groupid,member])
}

async function getMemberRequest(group_id){
    const result = await pgPool.query(sql.GET_MEMBERREQUEST, [group_id]);
    const rows = result.rows;
    return rows;
}

async function deleteMemberRequest(request_id) {
    await pgPool.query(sql.DELETE_MEMBERREQUEST, [request_id]);
}

module.exports = {addMemberRequest, getMemberRequest, deleteMemberRequest};