const supertest = require('supertest');
const { expect } = require('chai');
const { pgPool } = require('../postgre/connection');
const app = require('../index');
/*
describe('Creating a new movie as a favourite', () => {
    beforeEach(async function () {
        this.timeout(5000);
        await pgPool.query('BEGIN');
    });

    afterEach(async function () {
        await pgPool.query('ROLLBACK');
    }); 

    it('should add a new movie as a favourite for the corresponding account successfully', async () => {
        const favData = {
            fav_account_id: '93',
            movie_id: '726209'
        };

        await supertest(app)
            .post('/favoriteMovie/addFavorite')
            .send(favData)
            .expect(200); // Await for the request and check the response status

    });
});
*/
describe('Get favorite movie from account', () => {
    beforeEach(async function () {

        await pgPool.query('BEGIN');
    });

    afterEach(async function () {
        await pgPool.query('ROLLBACK');
    }); 

    it('should be able to get favourite movies from the account', async () => {
        
        const response = await supertest(app)
            .get('/favoriteMovie/get')
            .query({ fav_account_id: 102 })
            .expect(200);
        
        console.log(response.body);
    });
});