'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readReportP = function(req, res) {
    try{
        connection.query('SELECT * FROM Report_Project', function (error, rows, fields){
            if(error){
                response.internalError(error, res);
            } else{
                response.ok(rows, res);
            }
        });
    }catch(err){
        response.clientError("Bad Request", res);
    }
};

exports.readOneReportP = function(req, res) {
    var id = req.params.id;
    try{
        connection.query('SELECT * FROM Report_Project WHERE id = ?', [id]
        ,function (error, rows, fields){
            if(error){
                response.internalError(error, res);
            } else{
                response.ok(rows, res);
            }
        });
    }catch(err){
        response.clientError("Bad Request", res);
    }
}

exports.createReportP = function(req, res) {

    var name = req.body.name;
    var description = req.body.description;
    var reported_project = req.body.reported_project;
    var reporting_user = req.body.reporting_user;
    var status = req.body.status;

    try{
        connection.query('INSERT INTO Report_Project (name, description, reported_project, reporting_user) values (?,?,?,?)',
        [ name, description, reported_project, reporting_user],
        function (error, rows, fields){
            if(error){
                response.internalError(error, res);
            } else{
                response.ok("Operation Success!", res)
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
};

exports.deleteReportP = function(req, res) {

    var id = req.params.id;

    try{
        connection.query('DELETE FROM Report_Project WHERE id = ?',
        [ id ],
        function (error, rows, fields){
            if(error){
                response.internalError(error, res);
            } else{
                response.ok("Operation Success!", res)
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
};
