'use strict';

var response = require('../res');
var connection = require('../conn');
var header = require('../header');

exports.readJoinedProjects = function(req, res) {
    try{
        connection.query('SELECT * FROM JoinedProjects', function (error, rows, fields){
            if(error){
                response.internalError(error, res);
            } else{
                response.ok(rows, res)
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
};

exports.createJoinedProjects = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var name = req.body.name;
        var description = req.body.description;
        var parent_id = req.body.parent_id;
        var child_id = req.body.child_id;

        try{
            connection.query('INSERT INTO JoinedProjects (name, description, parent_id, child_id) values (?,?,?,?)',
            [ name, description, parent_id, child_id ],
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

exports.deleteJoinedProjects = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var id = req.params.id;

        try{
            connection.query('DELETE FROM JoinedProjects WHERE id = ?',
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
