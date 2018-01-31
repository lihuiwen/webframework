const supertest = require('supertest');

function request(){
    return supertest('http://localhost:3000');
}

describe('GET /getJson',function(){
    it('respond with json', function(done){
        request()
            .get('/users')
            .expect(200)
            .end(function(err, res){
                console.log(res.body)
                if (err) throw err;
                done();
            })
    });
});