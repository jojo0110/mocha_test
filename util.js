/**
 * Created by kuan on 28/11/15.
 */
var bodyParser = require('body-parser');

function Util(){

}


/*
 *Those functions are simple examples for test purpose only.....
 */
Util.prototype.validateId=function(id){
    if(id%2==0)
    return true
    else
    return false;
}

Util.prototype.validateUser=function(userObj){

    if(userObj['name']=='joe')
        if(userObj['password']=='password')
            return true;
    else
        return false;

}

Util.prototype.bodyParserJson=bodyParser.json();
Util.prototype.bodyParserUrlencoded=bodyParser.urlencoded({ extended: true });


module.exports=new  Util();
module.exports.util=Util;