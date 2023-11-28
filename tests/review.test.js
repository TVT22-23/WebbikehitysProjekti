const supertest = require('supertest');
const { expect } = require('chai');
const { pgPool } = require('../postgre/connection');
const app = require('../index');
const { before } = require('mocha');
const reviewTest = require('../postgre/review');


describe('Creating a new review', () => {
    beforeEach(async function () {
        await pgPool.query('BEGIN');
    });

    afterEach(async function () {
        await pgPool.query('ROLLBACK');
    }); 

    it('should create a new review successfully', async () => {
        const reviewData = {
            text_review: 'It was pretty cool but would have been cooler if the main characters would have had more of that BigDickEnergy and in general were more capable of caring about each other as people. The acting was top notch except in the ending part, which one could argue being the most important, and the acting started feeling very lackluster. The supporting cast was quite interesting and personally I would have had the movie be more about them than the main cast, who resembled more like a wet toilet paper. All in all the movies was alright but it had some faults like the main motivation behind the antagonist etc etc',
            rating: '2.5',
            recommend: 'true',
            movie_id: '130'
        };

        await supertest(app)
            .post('/review/addReview')
            .send(reviewData)
            .expect(200); // Await for the request and check the response status

        // Perform additional assertions if needed

        // Call done if you prefer to keep it, though it's not mandatory for async/await
        // done();
    });
});