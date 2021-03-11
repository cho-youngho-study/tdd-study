const index = require('../app');
const supertest = require('supertest');

describe('GET /users', () => {
    it('...', (done) => {
        supertest(index)
            .get('/users')
            .end((err, res) => {
                if (err) throw err
                console.log(res.body);
                done();
            })
    })
})