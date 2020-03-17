'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readProjects = function(req, res) {
    connection.query('SELECT * FROM Projects', function (error, rows, fields){
        if(error){
            response.internalError(error.code, res);
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createProjects = function(req, res) {
    
    var name = req.body.name;
    var description = req.body.description;
    var type = req.body.type;
    var app_due_date = req.body.app_due_date;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var num_req_collaborator = req.body.num_req_collaborator;
    var user_id = req.body.user_id;

    connection.query('INSERT INTO Projects (name, description, type, app_due_date, start_date, end_date, num_req_collaborator, user_id) values (?,?,?,?,?,?,?,?)',
    [ name, description, type, app_due_date, start_date, end_date, num_req_collaborator, user_id ], 
    function (error, rows, fields){
        if(error){
            response.internalError(error.code, res)
            console.log(error)
        } else{
            response.ok("Operation Success", res)
        }
    });
};


exports.updateProjects = function(req, res) {
    
    var description = req.body.description;
    var due_date = req.body.due_date;
    var num_req_collaborator = req.body.num_req_collaborator;
    var thumbnail = req.body.thumbnail;
    var status = req.body.status;
    var id = req.body.id;

    connection.query('UPDATE Projects SET description = ?, due_date = ?, num_req_collaborator = ?, thumbnail = ?, status = ? WHERE id = ?',
    [ description, due_date, num_req_collaborator, thumbnail, status, id ], 
    function (error, rows, fields){
        if(error){
            response.internalError(error, res)
            console.log(error)
        } else{
            response.ok("Operation Success", res)
        }
    });
};

exports.deleteProjects = function(req, res) {
    
    var id = req.body.id;

    connection.query('DELETE FROM Projects WHERE id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            response.internalError(error, res)
        } else{
            response.ok("Operation Success", res)
        }
    });
};