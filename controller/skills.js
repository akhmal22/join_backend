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
    var user_id = req.body.user_id;
    var id = req.body.id;

    connection.query('UPDATE Skills SET name = ?, familiarity = ?, user_id = ? WHERE id = ?',
    [ name, familiarity, user_id, id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.deleteSkills = function(req, res) {
    
    var id = req.body.id;

    connection.query('DELETE FROM Skills WHERE id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};