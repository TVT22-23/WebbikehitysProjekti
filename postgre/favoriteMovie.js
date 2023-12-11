const { pgPool } = require('./connection');

const sql = {
    INSERT_FAVORITE: 'INSERT INTO favoritemovie (fav_account_id, movie_id) VALUES ($1, $2)',
    GET_FAVORITE: 'SELECT * FROM favoritemovie',
    DELETE_FAVORITE: 'DELETE FROM favoritemovie WHERE fav_id=$1'
}

//getFavorite();
//addFavorite(2,37);
//deleteFavorite(1);

async function addFavorite(fav_account_id, movie_id) {
    await pgPool.query(sql.INSERT_FAVORITE, [fav_account_id, movie_id])
}

async function getFavorite(){
    const result = await pgPool.query(sql.GET_FAVORITE);
    const rows = result.rows;
    return rows;
}

async function deleteFavorite(fav_id) {
    await pgPool.query(sql.DELETE_FAVORITE, [fav_id]);
}
    
module.exports = {addFavorite, getFavorite, deleteFavorite};