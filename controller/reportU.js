'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readReportU = function(req, res) {
    try{
        connection.query('SELECT * FROM Report_User', function (error, rows, fields){
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

exports.readOneReportU = function(req, res) {
    var id = req.params.id;
    try{
        connection.query('SELECT * FROM Report_User WHERE id = ?', [id]
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

exports.createReportU = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var name = req.body.name;
        var description = req.body.description;
        var reported_user = req.body.reported_user;
        var reporting_user = req.body.reporting_user;

        try{
            connection.query('INSERT INTO Report_User (name, description, reported_user, reporting_user) VALUES(?, ?, ?, ?)',
            [ name, description, reported_user, reporting_user ],
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
    }
};

exports.deleteReportU = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var id = req.params.id;

        try{
            connection.query('DELETE FROM Report_User WHERE id = ?',
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
    }
};
