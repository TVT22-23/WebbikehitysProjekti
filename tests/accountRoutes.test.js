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
        this.timeout(5000);
        await pgPool.query('BEGIN');
    }); 

    //Runs after each test and rolls back any changes made in the test by using 'ROLLBACK'.
    // This should protect inserts to the database from testing.
    after(async function () {
        console.log("after function rollback");
        await pgPool.query('ROLLBACK');
        console.log("after function rollback");
    }); 

    // it represents a test case. This test aims to create a new account by sending a POST request
    // to create-endpoint with provided 'accountData'
    it('should create a new account successfully', async () => {
        const accountData = {
            user_name: 'chaiUser4',
            password: 'chaiPass4',
            email: 'chai@email.com4'
        };

        await supertest(app)
            .post('/account/create') // make a POST request to the exact endpoint which has been set in the route.
            .timeout(5000)
            .send(accountData)  // send the provided data 
            .expect(200); // Await for the request and check the response status
        
    });

    it('should delete the user successfully', async () => {
        const accountData2 = {
            user_name: 'chaiUser3'
        }
        await supertest(app)
            .delete('/account/delete/'+accountData2.user_name)
            .expect(200);
    });

    it('should not allow deletion of an user that does not exist', async () => {
        const accountData2 = {
            user_name: 'chaiUser6'
        }
        await supertest(app)
            .delete('/account/delete/'+accountData2.user_name)
            .expect(200);
    });
});

describe('Testing login functionality', () => {

    beforeEach(async function () {
        await pgPool.query('BEGIN');
    }); 

    afterEach(async function () {
        await pgPool.query('ROLLBACK');
    }); 

    it('should allow the user to login with the correct credentials', async () => {
        
        const loginData = {
            user_name: 'user4',
            password: 'pass4'            
        };
        
        await supertest(app)
            
            .post('/account/login') // make a POST request to the exact endpoint which has been set in the route.
            .send(loginData)  // send the provided data 
            .expect(200);
    });

    it('should not allow the user to login with the incorrect credentials', async () => {
        const loginData2 = {
            user_name: 'testAccount',
            password: 'test'
        };

        await supertest(app)
            .post('/account/login') // make a POST request to the exact endpoint which has been set in the route.
            .send(loginData2)  // send the provided data 
            .expect(401);
    });
});

