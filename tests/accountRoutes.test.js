const supertest = require('supertest');
const { expect } = require('chai');
const { pgPool } = require('../postgre/connection');
const app = require('../index');
const { before } = require('mocha');
const accountTest = require('../postgre/account');


describe('Creating an account', () => {
   beforeEach(async function () {
        await pgPool.query('BEGIN');
    }); 

    afterEach(async function () {
        await pgPool.query('ROLLBACK');
    }); 

    it('should create a new account successfully', async () => {
        const accountData = {
            user_name: 'chaiUser3',
            password: 'chaiPass3',
            email: 'chai@email.com3'
        };

        await supertest(app)
            .post('/account/create')
            .send(accountData)
            .expect(200); // Await for the request and check the response status
        
        // Perform additional assertions if needed

        // Call done if you prefer to keep it, though it's not mandatory for async/await
        // done();
    });
});
/*

describe('Creating an account', function() {
    it('should work', async function() {
        const res = await supertest(app)
            .post('/account')
            .send({
                user_name: 'chaiUser3',
                password: 'chaiPass3',
                email: 'chai@email.com3'
            });
        expect(res.status).to.equal(200);
    });
}); */