const supertest = require('supertest');
const { expect } = require('chai');
const { pgPool } = require('../postgre/connection');
const app = require('../index');
const { before } = require('mocha');
const memberRequestTest = require('../postgre/memberRequest');


describe('Testing member request endpoints', () => {

    before(async function () {
        await pgPool.query('BEGIN');
    });

    after(async function () {
        await pgPool.query('ROLLBACK');
    }); 
    
    it('should create a new request successfully', async () => {

        const memberRequestData = {
            account_accountid: '1',
            group_groupid:'3',
            member: 'true'
        };
        
        await supertest(app)
            .post('/memberRequest/create')
            .send(memberRequestData)
            .expect(200); // Await for the request and check the response status

    }); 

    it('should get all join requests', async () => {

        await supertest(app)
            .get('/memberRequest/')
            .expect(200);
    });

    it('should delete the request', async () => {

        await supertest(app)
            .delete('/memberRequest/delete/3')
            .expect(200);

    }); 
});
