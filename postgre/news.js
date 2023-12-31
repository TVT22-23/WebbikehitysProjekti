const { pgPool }= require('./connection');
const {getArticle} = require("../react/src/finnkino")                                           

const sql = {
    INSERT_NEWS: 'INSERT INTO news (title, publishdate, article, account_id, group_id) VALUES ($1, $2, $3, $4, $5)',
    GET_NEWS: 'SELECT * FROM news',
    DELETE_NEWS: 'DELETE FROM news WHERE news_id=$1'
}

//addNews('katsomattaHuono', '3', 'false');                                                     //testing
//getNews();



async function addNews(title, publishdate, article, account_id, group_id) {                     //adding news to the news-table in database
    await pgPool.query(sql.INSERT_NEWS, [title, publishdate, article, account_id, group_id])
}

async function getNews(){
    const result = await pgPool.query(sql.GET_NEWS);
    const rows = result.rows;
    return rows;
}

async function deleteNews(news_id) {
    await pgPool.query(sql.DELETE_NEWS, [news_id]);
}

//get information from finnkino.js
async function fetchAndAddNews() {
        const newsData = await getArticle('https://www.finnkino.fi/xml/News/');
        if (newsData) {
            const { title, publishDate, article } = newsData;
            await addNews(title, publishDate, article, 1, 1);//1.1 should be replaced with actual acccount_id and group_id
        } else {
            console.error('No news data fetched.');
        }
    
}
//fetchAndAddNews();

module.exports = {addNews, getNews, deleteNews};