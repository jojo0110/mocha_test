"use strict";
var assert=require('assert'),
    request=require('supertest'),
    app=require('../app'),
    util=require('../util'),
    agent = request.agent(app);



/*
afterEach(function() {
    // runs after each test in this block
});
*/
request=request(app);

var _validObj={};
var _nonValidObj={};





beforeEach(function() {
    _validObj={name:'joe',password:'password'}
    _nonValidObj={name:'notjoe',password:'notpassword'}
});

describe('util tests',function(){
    describe('#validateUser(userObj)',function(){
        it('name should be "joe", password should be "password"',function(){

            assert(util.validateUser(_validObj));
            assert(!util.validateUser(_nonValidObj));
        })
    })
    describe('#validateId(id)',function(){
        it('id is odd return false,else true',function(){

            assert(util.validateId(12));
            assert(!util.validateId(13));
        })
    })
})


describe('route tests',function() {

    describe('when GET /', function () {

        it('it should return 200', function (done) {
            request
                .get('/')
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    assert.equal(res.statusCode, 200);
                    if (err)
                        return done(err);
                    done();
                });
        })
    })

    describe('if login success', function () {

        let testCookie;
        let postRes;
        beforeEach(function(done) {
            request
                .post('/login')
                .set('Accept', 'application/json')
                .type('urlencoded')
                .send(_validObj)
                .end(function (err, res) {
                    postRes=res;
                    testCookie=res.headers['set-cookie'].pop().split(';')[0];
                    if (err)
                        return done(err)
                    done();
                })
        });

        describe('after POST /login', function () {


            it('it should create a cookie', function (done) {
                assert(postRes.header['set-cookie']);
                done();

            })
            it('location should be redirect to /index', function (done) {
                assert.equal('/', postRes.header['location']);
                done();
            })
        })

        describe('when GET /login', function () {

            it('it should have cookie', function (done) {
                assert(testCookie);
                done();
            })
            it('location should be /index', function (done) {
                var req=request.get('/login')
                req.set( 'Cookie', testCookie)
                req.end(function (err, res) {
                    assert.equal('/',res.header['location']);

                     if (err)
                     return done(err)
                     done();

                })


            })
        })

        describe('when GET /userArea/:id',function(){
            let evenIdRes;
            beforeEach(function(done){
                let req=request.get('/userArea/12')
                req.set( 'Cookie', testCookie)
                req.end(function(err,res){
                    evenIdRes=res;

                        if(err)
                            return done(err);
                        done();
                    })

            })
            it('it should have cookie',function(done){
                assert(testCookie);
                done();
            });
            it('location should be /userArea',function(done){
                assert.equal('/userArea',evenIdRes.header['location']);
                done();
            });

            it('if id is even number return 200',function(done){

                assert.equal(evenIdRes.status,'200')
                done();
            });


            it('if id is odd number return 404',function(done){

                 let req=request.get('/userArea/11')
                 req.set( 'Cookie', testCookie)
                 req.end(function(err,res){
                 assert.equal(res.status,'404')
                 if(err)
                 return done(err);
                 done();
                 })
             });

        });

    })
})


/*To be continued.......
        describe('when Get /logout',function(){
            it('it should clear cookie',function(){
                assert(200==200);
            });
            it('location should be /index',function(){
                assert(200==200);
            });
        });
    });

    describe('if login failed',function(){

        describe('when POST /login',function(){
            it('it should not create a cookie',function(){

                assert(200==200);

            })
            it('it should show not valid info',function(){
                assert(200==200);

            })
        })

        describe('when GET /login',function(){
            it('it should have no cookie',function(){
                request
                    .get('/login')
                    .set('Accept','application/json')
                    .end(function(err,res){

                        assert(!res.cookie[cuser]);
                        if(err)
                            return done(err);
                        done();
                    });

            })
            it('location should be /login',function(){
                assert(200==200);

        });

        describe('when GET /userArea/:id',function(){
            it('it should have no cookie',function(){
                assert(200==200);
            });
            it('location should be /login',function(){
                assert(200==200);
            });
        });

        describe('when Get /logout',function(){
            it('it should clear cookie',function(){
                assert(200==200);
            });
            it('location should be /index',function(){
                assert(200==200);
            });
        });
    });

})

describe('other tests',function(){

    describe('when error happen ',function(){
        it('it should return the 500 code ',function(done){
            request
                .get('/error')
                .end(function(err,res){
                    assert(res.error.status==500);
                    if(err)
                        return done(err);
                    done();
                });

        });
    })

})
*/





