let utils = require('./capitialize');
const should = require('should');

// 테스트 수트(테스트 환경 만들기)
describe('capitialize 모듈의 함수는', () => {
    // 테스트 케이스 (실제 테스트)
    it('문자열의 첫번째 문자를 대문자로 변환한다', () => {
        const result = utils.capitialize('hello');
        result.should.be.eql('Hello');
    });
});