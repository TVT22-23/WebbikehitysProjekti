const { pgPool } = require('./connection');

const sql = {
    INSERT_GROUP: 'INSERT INTO moviegroup (group_name, description, owner) VALUES ($1, $2, $3)',
    GET_GROUP: 'SELECT group_id, group_name, description, owner FROM moviegroup',
    DELETE_GROUP: 'DELETE FROM movieGroup WHERE group_id=$1',
    CHANGE_OWNER: 'UPDATE moviegroup SET owner = $1 WHERE group_id=$2'
}

async function addGroup(group_name, description, owner) {                           //adding a group to the moviegroup-table in database
    await pgPool.query(sql.INSERT_GROUP, [group_name, description, owner])
}

//addGroup('testGroup', 'testDescription', '1');                                    //testing
//getGroup();
//changeOwner(75, 3);

async function getGroup(){
    const result = await pgPool.query(sql.GET_GROUP);
    const rows = result.rows;
    return rows;
}

async function deleteGroup(group_id) {
    await pgPool.query(sql.DELETE_GROUP, [group_id]);
}

async function changeOwner(owner, group_id) {                                       //changing the group owner in moviegroup table based on group_id
    await pgPool.query(sql.CHANGE_OWNER, [owner, group_id]);
}

module.exports = {addGroup, getGroup, deleteGroup, changeOwner};