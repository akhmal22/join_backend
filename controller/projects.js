'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readProjects = function(req, res) {
    connection.query('SELECT * FROM Projects', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createProjects = function(req, res) {
    
    var name = req.body.name;
    var description = req.body.description;
    var type = req.body.type;
    var due_date = req.body.due_date;
    var num_req_collaborator = req.body.num_req_collaborator;
    var thumbnail = req.body.thumbnail;
    var status = req.body.status;
    var user_id = req.body.user_id;

    connection.query('INSERT INTO Projects (name, description, type, due_date, num_req_collaborator, thumbnail, status, user_id) values (?,?,?,?,?,?,?,?)',
    [ name, description, type, due_date, num_req_collaborator, thumbnail, status, user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan user!", res)
        }
    });
};


exports.updateProjects = function(req, res) {
    
    var name = req.body.name;
    var description = req.body.description;
    var type = req.body.type;
    var due_date = req.body.due_date;
    var num_req_collaborator = req.body.num_req_collaborator;
    var thumbnail = req.body.thumbnail;
    var status = req.body.status;
    var user_id = req.body.user_id;
    var id = req.body.id;

    connection.query('UPDATE Projects SET name = ?, description = ?, type = ?, due_date = ?, num_req_collaborator = ?, thumbnail = ?, status = ?, user_id = ? WHERE id = ?',
    [ name, description, type, due_date, num_req_collaborator, thumbnail, status, user_id, id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.deleteProjects = function(req, res) {
    
    var id = req.body.id;

    connection.query('DELETE FROM Projects WHERE id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};