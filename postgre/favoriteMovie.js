const pgPool = require('./connection');

const sql = {
    INSERT_FAVORITE: 'INSERT INTO favoritemovie (fav_account_id, movie_id) VALUES ($1, $2)',
    GET_FAVORITE: 'SELECT * FROM favoritemovie'
}

getFavorite();



async function addFavorite(fav_account_id, movie_id) {
    await pgPool.query(sql.INSERT_FAVORITE, [fav_account_id, movie_id])
}

async function getFavorite(){
    const result = await pgPool.query(sql.GET_FAVORITE);
    const rows = result.rows;
    return rows;
}

module.exports = {addFavorite, getFavorite};