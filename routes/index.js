var express = require('express');
var router = express.Router();
var util=require('../util');

/* GET home page. */
router.route('/')
    .get(function(req, res, next) {
        res.render('index', { title: 'Express',result:''});
    });

router.route('/login')
    .all(function(req,res,next){
        next();
    })
    .get(function(req,res,next){
        if(req.signedCookies['cuser'])
            res.render('index',{'title':req.signedCookies['cuser'].userName,result:'you already log in'})
        else
            res.render('login',{userInfo:{}, result:''});
    })
    .post(util.bodyParserUrlencoded,function(req,res,next){

        if(util.validateUser(req.body))
        {
            //give a cookie
            res.cookie('cuser', {userName:req.body.name}, { expires:0 ,signed: true});

            res.render('index',{'title':req.body.name,result:''})
        }
        else
            res.render('login',{userInfo:{}, result:'not valid'});
    })

router.route('/logout')
    .get(function(req,res,next){
                res.clearCookie('cuser', {signed: true});
        res.redirect('/');
    });

router.route('/userArea/:id')
    .all(function(req,res,next){
        if(req.signedCookies['cuser'])
            next();
        else
            res.render('login',{userInfo:{}, result:''});

    })
    .get(function(req,res,next){
        if(util.validateId(req.params.id))
        res.render('userArea',{title:'article'+req.params.id})
        else
        {
           next();
        }
    });


router.route('/error')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
        var err=new Error('error happen');
        err.statusCode=500;
        next(err);
    })
    .post();

var validateID=function(id){}

module.exports = router;
