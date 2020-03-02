'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readJoinedProjects = function(req, res) {
    connection.query('SELECT * FROM JoinedProjects', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createJoinedProjects = function(req, res) {
    
    var name = req.body.name;
    var description = req.body.description;
    var due_date = req.body.due_date;
    var num_req_collaborator = req.body.num_req_collaborator;
    var thumbnail = req.body.thumbnail;
    var status = req.body.status;
    var parent_id = req.body.parent_id;
    var child_id = req.body.child_id;

    connection.query('INSERT INTO JoinedProjects (name, description, due_date, num_req_collaborator, thumbnail, status, parent_id, child_id) values (?,?,?,?,?,?,?,?)',
    [ name, description, due_date, num_req_collaborator, thumbnail, status, parent_id, child_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan user!", res)
        }
    });
};


exports.updateJoinedProjects = function(req, res) {
    
    var name = req.body.name;
    var description = req.body.description;
    var due_date = req.body.due_date;
    var num_req_collaborator = req.body.num_req_collaborator;
    var thumbnail = req.body.thumbnail;
    var status = req.body.status;
    var parent_id = req.body.parent_id;
    var child_id = req.body.child_id;
    var id = req.body.id;

    connection.query('UPDATE JoinedProjects SET name = ?, description = ?, due_date = ?, num_req_collaborator = ?, thumbnail = ?, status = ?, parent_id = ?, child_id = ? WHERE id = ?',
    [ name, description, due_date, num_req_collaborator, thumbnail, status, parent_id, child_id, id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.deleteJoinedProjects = function(req, res) {
    
    var id = req.body.id;

    connection.query('DELETE FROM JoinedProjects WHERE id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};