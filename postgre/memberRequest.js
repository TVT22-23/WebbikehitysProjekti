const { pgPool }= require('./connection');

const sql = {
    INSERT_MEMBERREQUEST: 'INSERT INTO memberrequest (account_accountid, group_groupid, member) VALUES ($1, $2, $3)',
    GET_MEMBERREQUEST: 'SELECT * FROM memberrequest WHERE group_groupid = ($1)',
    DELETE_MEMBERREQUEST: 'DELETE FROM memberrequest WHERE request_id=$1',
    ACCEPT_MEMBERREQUEST: 'INSERT INTO member(account_accountid, group_groupid) SELECT account_accountid, group_groupid FROM memberrequest WHERE request_id=$1'
}

//addMemberRequest('', '', '');                                                                     //testing
//getMemberRequest();
//deleteMemberRequest('3');
//handleMemberRequest('6', 'rejct');


async function addMemberRequest(account_accountid, group_groupid, member) {                         //adding a request to the memberrequest-table in database
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

async function handleMemberRequest(request_id, text) {                                              //accept/reject function to handle member requests
    if (text === 'accept') {                                                                        //accept adds memberrequest to member-table and deletes the request, reject just deletes request
        await pgPool.query(sql.ACCEPT_MEMBERREQUEST, [request_id]);
        deleteMemberRequest(request_id);
    } else if (text === 'reject') {
        deleteMemberRequest(request_id);
    } else {
        console.log('failed');
    }
}

module.exports = {addMemberRequest, getMemberRequest, deleteMemberRequest, handleMemberRequest};