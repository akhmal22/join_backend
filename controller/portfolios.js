'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readPortfolios = function(req, res) {
    try{
        connection.query('SELECT * FROM Portfolios', function (error, rows, fields){
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

exports.createPortfolios = function(req, res) {
    
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
                response.internalError(error.code, res);
            } else{
                response.ok("Operation Success!", res)
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
};


exports.updatePortfolios = function(req, res) {
    
    var name = req.body.name;
    var description = req.body.description;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var url = req.body.url;
    var user_id = req.body.user_id;
    var id = req.params.id;

    try {
        connection.query('UPDATE Portfolios SET name = ?, description = ?, start_date = ?, end_date = ?, url = ?, user_id = ? WHERE id = ?',
        [ name, description, start_date, end_date, url, user_id, id ], 
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

exports.deletePortfolios = function(req, res) {
    
    var id = req.params.id;

    try{
        connection.query('DELETE FROM Portfolios WHERE id = ?',
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
};