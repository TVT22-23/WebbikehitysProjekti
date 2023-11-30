const supertest = require('supertest');
const { expect } = require('chai');
const { pgPool } = require('../postgre/connection');
const app = require('../index');
const { before } = require('mocha');
const memberTest = require('../postgre/member');


describe('Testing member endpoints', () => {

    before(async function () {
        await pgPool.query('BEGIN');
    });

    after(async function () {
        await pgPool.query('ROLLBACK');
    }); 
    /*
    it('should create a new member successfully', async () => {

        const memberData = {
            account_accountid: '2',
            group_groupid:'1'
        };
        
        await supertest(app)
            .post('/member/create')
            .send(memberData)
            .expect(200); // Await for the request and check the response status

    }); */

    it('should get members of a selected group', async () => {

        await supertest(app)
            .get('/member/')
            .expect(200);
    });

    it('should delete the member', async () => {

        await supertest(app)
            .delete('/member/delete/3')
            .expect(200);

    }); 
});
