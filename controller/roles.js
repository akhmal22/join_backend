'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readRoles = function(req, res) {
    connection.query('SELECT * FROM Roles', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createRoles = function(req, res) {
    
    var name = req.body.name;
    var description = req.body.description;
    var project_id = req.body.project_id;
    var collaborator_id = req.body.collaborator_id;

    connection.query('INSERT INTO Roles (name, description, project_id, collaborator_id) values (?,?,?,?)',
    [ name, description, project_id, collaborator_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan user!", res)
        }
    });
};


exports.updateRoles = function(req, res) {
    
    var name = req.body.name;
    var description = req.body.description;
    var project_id = req.body.project_id;
    var collaborator_id = req.body.collaborator_id;
    var id = req.body.id;

    connection.query('UPDATE Roles SET name = ?, description = ?, project_id = ?, collaborator_id = ? WHERE id = ?',
    [ name, description, project_id, collaborator_id, id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.deleteRoles = function(req, res) {
    
    var id = req.body.id;

    connection.query('DELETE FROM Roles WHERE id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};