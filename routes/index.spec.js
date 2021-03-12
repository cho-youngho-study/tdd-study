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

describe('GET /users/:id', () => {
    describe('성공시', () => {
        it('id가 1인 유저 객체를 반환', (done) => {
            supertest(index)
                .get('/users/1')
                .end((err, res) => {
                    if (err) throw err;
                    res.body.should.have.property('id', 1);
                    done();
                })
        })
    });
    describe('실패시', () => {
        it('id가 숫자가 아닐경우 400 응답', (done) => {
            supertest(index)
                .get('/users/one')
                .expect(400)
                .end(done)
        });
        it('id로 유저를 찾을 수 없을 경우 404 응답', (done) => {
            supertest(index)
                .get('/users/4')
                .expect(404)
                .end(done)
        })
    })

});

describe('DELETE /users/:id', () => {
    describe('성공시', () => {
        it('204 응답', (done) => {
            supertest(index)
                .delete('/users/3')
                .expect(204)
                .end(done)
        });
    })
    describe('실패시', () => {
        it('id가 숫자가 아닐경우 400 응답', (done) => {
            supertest(index)
                .delete('/users/one')
                .expect(400)
                .end(done)
        })
    })
})

describe('POST /users', () => {
    describe('성공시', () => {
        let name = 'onetwo',
            body;
        before(done => {
            supertest(index)
                .post('/users')
                .send({
                    name
                })
                .expect(201)
                .end((err, res) => {
                    if (err) throw err;
                    body = res.body;
                    done();
                })
        })
        it('생성된 유저 객체 반환', () => {
            body.should.have.property('id');
        });
        it('입력한 name 반환', () => {
            body.should.have.property('name', name);
        });
    });
    describe('실패시', () => {
        it('name 누락시 400 반환', done => {
            supertest(index)
                .post('/users')
                .send({})
                .expect(400)
                .end(done)
        });
        it('name 중복일 때 409 반환', done => {
            supertest(index)
                .post('/users')
                .send({
                    name: 'hello'
                })
                .expect(409)
                .end(done)
        })
    })
})