'use strict';

var response = require('../res');
var connection = require('../conn');
var header = require('../header');

exports.readExperiences = function(req, res) {
    try{
        connection.query('SELECT * FROM Experiences'
        , function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok(rows, res)
            }
        });
    }catch(err){
        response.clientError("Bad Request", res)
    }
};

exports.readUserExperiences = function(req, res) {
    try{
        var user_id = req.params.user_id;
        connection.query('SELECT * FROM Experiences WHERE user_id = ?',
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


exports.createExperiences = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var name = req.body.name;
        var company = req.body.company;
        var start_date = req.body.start_date;
        var end_date = req.body.end_date;
        var description = req.body.description;
        var user_id = req.body.user_id;

        try{
            connection.query('INSERT INTO Experiences (name, company, start_date, end_date, description, user_id) values (?,?,?,?,?,?)',
            [ name, company, start_date, end_date, description, user_id ],
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

exports.deleteExperiences = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var id = req.params.id;

        try{
            connection.query('DELETE FROM Experiences WHERE exp_id = ?',
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
