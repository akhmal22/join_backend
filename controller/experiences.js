'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readExperiences = function(req, res) {
    connection.query('SELECT * FROM Experiences', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createExperiences = function(req, res) {
    
    var name = req.body.name;
    var company = req.body.company;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var description = req.body.description;
    var user_id = req.body.user_id;

    connection.query('INSERT INTO Experiences (name, company, start_date, end_date, description, user_id) values (?,?,?,?,?,?)',
    [ name, company, start_date, end_date, description, user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan user!", res)
        }
    });
};


exports.updateExperiences = function(req, res) {
    
    var name = req.body.name;
    var company = req.body.company;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var description = req.body.description;
    var user_id = req.body.user_id;
    var id = req.body.id;

    connection.query('UPDATE Experiences SET name = ?, company = ?, start_date = ?, end_date = ?, description = ?, user_id = ? WHERE id = ?',
    [ name, company, start_date, end_date, description, user_id, id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.deleteExperiences = function(req, res) {
    
    var id = req.body.id;

    connection.query('DELETE FROM Experiences WHERE id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};