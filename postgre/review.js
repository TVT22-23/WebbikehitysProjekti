const pgPool = require('./connection');

const sql = {
    INSERT_REVIEW: 'INSERT INTO review (text_review, rating, recommend, movie_id) VALUES ($1, $2, $3, $4)',
    GET_REVIEW: 'SELECT * FROM review'
}

//addReview('katsomattaHuono', '3', 'false');
getReview();



async function addReview(text_review, rating, recommend, movie_id) {
    await pgPool.query(sql.INSERT_REVIEW, [text_review, rating, recommend, movie_id])
}

async function getReview(){
    const result = await pgPool.query(sql.GET_REVIEW);
    const rows = result.rows;
    return rows;
}

module.exports = {addReview, getReview};