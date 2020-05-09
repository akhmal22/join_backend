'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readSkills = function(req, res) {
    try{
        connection.query('SELECT * FROM Skills', function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok(rows, res)
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
};

exports.readUserSkills = function(req, res) {
    var user_id = req.params.user_id;

    try{
        connection.query('SELECT * FROM Skills WHERE user_id = ?', [user_id]
        ,function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok(rows, res)
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
};

exports.createSkills = function(req, res) {

    var name = req.body.name;
    var familiarity = req.body.familiarity;
    var user_id = req.body.user_id;

    try{
        connection.query('INSERT INTO Skills (name, familiarity, user_id) values (?,?,?)',
        [ name, familiarity, user_id ],
        function (error, rows, fields){
            if(error){
                response.internalError(error.code, res);
            } else{
                response.ok("Operation Success!", res)
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
};


exports.updateSkills = function(req, res) {

    var name = req.body.name;
    var familiarity = req.body.familiarity;
    var id = req.params.id;

    try{
        connection.query('UPDATE Skills SET name = ?, familiarity = ? WHERE id = ?',
        [ name, familiarity, id ],
        function (error, rows, fields){
            if(error){
                response.internalError(error.code,res);
            } else{
                response.ok("Operation Success!", res)
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
};

exports.deleteSkills = function(req, res) {

    var id = req.params.id;

    connection.query('DELETE FROM Skills WHERE id = ?',
    [ id ],
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Operation Success!", res)
        }
    });
};
