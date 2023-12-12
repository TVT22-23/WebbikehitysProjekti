const { pgPool } = require('./connection');

const sql = {
    INSERT_FAVORITE: 'INSERT INTO favoritemovie (fav_account_id, movie_id) VALUES ($1, $2)',
    GET_FAVORITE: 'SELECT movie_id FROM favoritemovie WHERE fav_account_id = $1',
    DELETE_FAVORITE: 'DELETE FROM favoritemovie WHERE fav_id=$1',
    DELETE_SPECIFIC: 'DELETE FROM favoritemovie WHERE fav_account_id=$1 AND movie_id=$2'
}

//getFavorite();                                                                                    //testing
//addFavorite(2,37);
//deleteFavorite(1);

async function addFavorite(fav_account_id, movie_id) {                                              //adding a favorite movie to the favoritemovie-table in database
    await pgPool.query(sql.INSERT_FAVORITE, [fav_account_id, movie_id])
}

async function getFavorite(fav_account_id){
    const result = await pgPool.query(sql.GET_FAVORITE, [fav_account_id]);
    const rows = result.rows;
    return rows;
}

async function deleteFavorite(fav_id) {
    await pgPool.query(sql.DELETE_FAVORITE, [fav_id]);
}

async function deleteSpecific(fav_account_id, movie_id) {
    await pgPool.query(sql.DELETE_SPECIFIC, [fav_account_id, movie_id]);
}
    
module.exports = {addFavorite, getFavorite, deleteFavorite, deleteSpecific};