const { pgPool } = require('./connection');

const sql = {

    INSERT_REVIEW: 'INSERT INTO review (text_review, rating, recommend, movie_id, user_name) VALUES ($1, $2, $3, $4, $5)',
    GET_REVIEW: 'SELECT * FROM review',
    DELETE_REVIEW: 'DELETE FROM review WHERE review_id=$1'

}

//addReview('katsomattaHuono', '3', 'false');
getReview();



async function addReview(text_review, rating, recommend, movie_id, user_name) {
    await pgPool.query(sql.INSERT_REVIEW, [text_review, rating, recommend, movie_id, user_name])
}

async function getReview(){
    const result = await pgPool.query(sql.GET_REVIEW);
    const rows = result.rows;
    return rows;
}

async function deleteReview(review_id) {
    await pgPool.query(sql.DELETE_REVIEW, [review_id]);
}

module.exports = {addReview, getReview, deleteReview};