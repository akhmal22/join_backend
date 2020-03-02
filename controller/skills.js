'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readSkills = function(req, res) {
    connection.query('SELECT * FROM Skills', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createSkills = function(req, res) {
    
    var name = req.body.name;
    var familiarity = req.body.familiarity;
    var user_id = req.body.user_id;

    connection.query('INSERT INTO Skills (name, familiarity, user_id) values (?,?,?)',
    [ name, familiarity, user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan user!", res)
        }
    });
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