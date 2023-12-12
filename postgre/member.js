const { pgPool } = require('./connection');

const sql = {
    INSERT_MEMBER: 'INSERT INTO member (account_accountid, group_groupid) VALUES ($1, $2)',
    GET_MEMBER: 'SELECT account_id, group_id FROM member JOIN account ON account_accountid = account.account_id JOIN moviegroup ON group_groupid = moviegroup.group_id',
    GET_MEMBER_BY_ACCOUNT:'SELECT * FROM member WHERE account_accountid = $1',
    DELETE_MEMBER: 'DELETE FROM member WHERE member_id=$1'
}

//addMember('1', '1');                                                                      //testing
//getMember();

async function addMember(account_accountid, group_groupid) {                                //adding a member to the member-table in database
    await pgPool.query(sql.INSERT_MEMBER, [account_accountid, group_groupid])
}

async function getMember(){
    const result = await pgPool.query(sql.GET_MEMBER);
    const rows = result.rows;
    //console.log(rows);
    return rows;
}

async function getMemberByAccount(account_accountid){
    console.log("getMemberByAccount");
    if (!account_accountid) {
        // If movieId is not provided, return an empty array (or handle it as per your requirement)
        return [];
      }
    const result = await pgPool.query(sql.GET_MEMBER_BY_ACCOUNT, [account_accountid]);
    const rows = result.rows;
    return rows;
}

async function deleteMember(member_id) {
    await pgPool.query(sql.DELETE_MEMBER, [member_id]);
}

module.exports = {addMember, getMember, deleteMember, getMemberByAccount};