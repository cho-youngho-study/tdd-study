const supertest = require('supertest');
const should = require('should');
const index = require('../app');

describe('GET /users', () => {
    describe('성공시', () => {
        it('유저 객체를 담은 배열 응답', (done) => {
            supertest(index)
                .get('/users')
                .end((err, res) => {
                    if (err) throw err
                    res.body.should.be.instanceOf(Array);
                    done();
                })
        });
        it('최대 limit 갯수만큼 응답', (done) => {
            supertest(index)
                .get('/users?limit=2')
                .end((err, res) => {
                    if (err) throw err
                    res.body.should.have.lengthOf(2);
                    done();
                })
        });
    })
    describe('실패시', () => {
        it('limit이 숫자형이 아니면 400을 응답', (done) => {
            supertest(index)
                .get('/users?limit=two')
                .expect(400)
                .end(done)
        });
    });

})