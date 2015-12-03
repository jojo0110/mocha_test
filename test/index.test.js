"use strict";
var assert=require('assert'),
    request=require('supertest'),
    app=require('../app'),
    util=require('../util'),
    agent = request.agent(app);


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
    let testCookie;
    let postRes;
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

    describe('if login failed',function(){

        beforeEach(function(done) {
            request
                .post('/login')
                .set('Accept', 'application/json')
                .type('urlencoded')
                .send(_nonValidObj)
                .end(function (err, res) {
                    postRes=res;
                    if(res.headers['set-cookie'])
                        testCookie=res.headers['set-cookie'].pop().split(';')[0];
                    else
                        testCookie=null;
                    if (err)
                        return done(err)
                    done();
                })
        });

        describe('after POST /login',function(done){
            it('it should have no cookie', function (done) {
                assert(!postRes.header['set-cookie']);
                done();

            })

            it('location should be in /login', function (done) {
                assert.equal('/login', postRes.header['location']);
                done();
            })
        })

        describe('when GET /login', function () {

            it('it should have no cookie', function (done) {
                assert(!testCookie);
                done();
            })
            it('location should be /login', function (done) {
                var req=request.get('/login')
                req.set( 'Cookie', testCookie)
                req.end(function (err, res) {
                    assert.equal('/login',res.header['location']);

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
            it('it should have no cookie',function(done){
                assert(!testCookie);
                done();
            });
            it('location should be /login',function(done){
                assert.equal('/login',evenIdRes.header['location']);
                done();
            });
        });

    })

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








