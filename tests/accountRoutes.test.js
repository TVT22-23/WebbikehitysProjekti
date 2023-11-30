const supertest = require('supertest'); // Library for making HTTP assertions
const { expect } = require('chai'); // this is an assertion library for setting expectations in tests
const { pgPool } = require('../postgre/connection'); // connection pool
const app = require('../index');    // Refers to the application server
const { before } = require('mocha');
const accountTest = require('../postgre/account');

// describes the test suite
describe('Creating an account', () => {
    //runs before each test and initiates PostgreSQL transaction using 'BEGIN'
   beforeEach(async function () {
        await pgPool.query('BEGIN');
    }); 

    //Runs after each test and rolls back any changes made in the test by using 'ROLLBACK'.
    // This should protect inserts to the database from testing.
    afterEach(async function () {
        await pgPool.query('ROLLBACK');
    }); 

    // it represents a test case. This test aims to create a new account by sending a POST request
    // to create-endpoint with provided 'accountData'
    it('should create a new account successfully', async () => {
        const accountData = {
            user_name: 'chaiUser3',
            password: 'chaiPass3',
            email: 'chai@email.com3'
        };

        await supertest(app)
            .post('/account/create') // make a POST request to the exact endpoint which has been set in the route.
            .send(accountData)  // send the provided data 
            .expect(200); // Await for the request and check the response status
        
        // Perform additional assertions if needed

        
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