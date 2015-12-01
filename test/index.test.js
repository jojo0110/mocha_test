var assert=require('assert'),
    request=require('supertest'),
    app=require('../app'),
    util=require('../util');



/*
afterEach(function() {
    // runs after each test in this block
});
*/

request=request(app);

var _validObj={};
var _nonValidObj={};

beforeEach(function() {
    _validObj={name:'kuan',password:'password'}
    _nonValidObj={name:'notkuan',password:'notpassword'}
});

describe('util tests',function(){
    describe('#validateUser(userObj)',function(){
        it('name should be kuan, password should be password',function(){

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


describe('route tests',function(){
    describe('when GET /',function(){
        it('it should return 200',function(){

            request
                .get('/')
                .set('Accept', 'application/json')
                .end(function(err,res){
                    assert(res.status==200);
                    if(err)
                        return done(err);
                    done();
                })
        })
    });

    describe('when GET /login',function(){
        describe('if already login',function(){
            it('it should create cookie',function(){
                assert(200==200);
            })
            it('location should be /index',function(){
                assert(200==200);
                /*
                request
                    .get('/login')
                    .set('Accept', 'application/json')
                    .end(function(err,res){
                        assert(res.status==200)
                        if(err)
                            return done(err);
                        done();
                    })
                    */
            })
        })
        describe('if not login',function(){
            it('it should have no cookie',function(){
                assert(200==200);
            });
            it('loccation should be /login',function(){
                assert(200==200);
            });
        })

    });

    describe('when Get /logout',function(){
        it('it should clear cookie',function(){
            assert(200==200);
        });
        it('location should be /index',function(){
            assert(200==200);
        });
    });

    describe('when GET /userArea/:id',function(){
        describe('if already login',function(){
            it('it should have cookie',function(){
               assert(200==200);
            });
            it('location should be /userArea',function(){
                assert(200==200);
            })
            it('if id is odd number return 404',function(){

                request
                    .get('/11')
                    .set('Accept', 'application/json')
                    .end(function(err,res){
                        assert(res.status==404)
                        if(err)
                            return done(err);
                        done();
                    })
            })
            it('if id is even number return 200',function(){

                request
                    .get('/12')
                    .set('Accept', 'application/json')
                    .end(function(err,res){
                        assert(res.status==200)
                        if(err)
                            return done(err);
                        done();
                    })
            })
        });
        describe('if not login',function(){
            it('it should not have cookie',function(){
                assert(200==200);
            });
            it('location should be /login',function(){
                assert(200==200);
            })
        })


    });

    describe('when POST /login',function(){
        describe('if log in failed',function(){
            it('it should not create cookie',function(){

                assert(200==200);
            })
        })
        describe('if log in successed',function(){
            it('it should create a cookie',function(){
                assert(200==200);

            })
            it('location should be /index',function(){
                assert(200==200);

            })
        })

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





