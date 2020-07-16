'use strict';

var response = require('../res');
var connection = require('../conn');
var header = require('../header');

exports.readPortfolios = function(req, res) {
    try{
        connection.query('SELECT * FROM Portfolios'
        ,function (error, rows, fields){
            if(error){
                response.internalError(error, res);
            } else{
                response.ok(rows, res);
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
};

exports.readUserPortfolios = function(req, res) {
    var user_id = req.params.user_id;

    try{
        connection.query('SELECT * FROM Portfolios WHERE user_id = ?',
        [user_id],
        function (error, rows, fields){
            if(error){
                response.internalError(error, res);
            } else{
                response.ok(rows, res);
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
};


exports.createPortfolios = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var name = req.body.name;
        var description = req.body.description;
        var start_date = req.body.start_date;
        var end_date = req.body.end_date;
        var url = req.body.url;
        var user_id = req.body.user_id;

        try{
            connection.query('INSERT INTO Portfolios (name, description, start_date, end_date, url, user_id) values (?,?,?,?,?,?)',
            [ name, description, start_date, end_date, url, user_id ],
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

exports.deletePortfolios = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var id = req.params.id;

        try{
            connection.query('DELETE FROM Portfolios WHERE port_id = ?',
            [ id ],
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
    }
};
