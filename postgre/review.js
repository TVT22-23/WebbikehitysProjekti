const { pgPool } = require('./connection');

const sql = {

    INSERT_REVIEW: 'INSERT INTO review (text_review, rating, recommend, movie_id, user_name, groupid) VALUES ($1, $2, $3, $4, $5, $6)',
    GET_REVIEW: 'SELECT * FROM review',
    GET_REVIEWS_BY_GROUP_ID: 'SELECT * FROM review WHERE groupid = $1',
    GET_REVIEWS_BY_MOVIE_ID: 'SELECT * FROM review WHERE movie_id = $1',
    DELETE_REVIEW: 'DELETE FROM review WHERE review_id=$1'
    

}

//addReview('katsomattaHuono', '3', 'false');
getReview();

async function addReview(text_review, rating, recommend, movie_id, user_name, groupid) {
    await pgPool.query(sql.INSERT_REVIEW, [text_review, rating, recommend, movie_id, user_name, groupid])
}

async function getReview(){
    const result = await pgPool.query(sql.GET_REVIEW);
    const rows = result.rows;
    return rows;
}

async function getReviewsByMovieId(movie_id) {
    console.log('Movie ID:', movie_id);
    if (!movie_id) {
        // If movieId is not provided, return an empty array (or handle it as per your requirement)
        return [];
      }
    const result = await pgPool.query(sql.GET_REVIEWS_BY_MOVIE_ID, [movie_id]);
    const rows = result.rows;
    return rows;
}

async function getReviewsByGoupId(group_id) {
    if (!group_id) {
        // If movieId is not provided, return an empty array (or handle it as per your requirement)
        return [];
      }
    const result = await pgPool.query(sql.GET_REVIEWS_BY_GROUP_ID, [group_id]);
    const rows = result.rows;
    return rows;
}

async function deleteReview(review_id) {
    await pgPool.query(sql.DELETE_REVIEW, [review_id]);
}

module.exports = { addReview, getReview, deleteReview, getReviewsByMovieId, getReviewsByGoupId };