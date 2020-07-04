'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readRoles = function(req, res) {
    try{
        connection.query('SELECT * FROM Roles', function (error, rows, fields){
            if(error){
                response.internalError(error.code, res);
            } else{
                response.ok(rows, res)
            }
        });
    }catch(err){
        response.clientError("Bad Request",res)
    }
};

exports.readRolesOnProject = function(req, res) {
    var project_id = req.params.project_id;
    try{
        connection.query('SELECT * FROM Roles WHERE project_id = ?', [project_id]
        ,function (error, rows, fields){
            if(error){
                response.internalError(error.code, res);
            } else{
                response.ok(rows, res)
            }
        });
    }catch(err){
        response.clientError("Bad Request",res)
    }
}

exports.createRoles = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var name = req.body.name;
        var description = req.body.description;
        var project_id = req.body.project_id;
        var collaborator_id = req.body.collaborator_id;

        try {
            connection.query('INSERT INTO Roles (name, description, project_id, collaborator_id) values (?,?,?,?)',
            [ name, description, project_id, collaborator_id ],
            function (error, rows, fields){
                if(error){
                    response.internalError(error.code, res);
                } else{
                    response.ok("Operation Success!", res)
                }
            });
        }catch(err){
            response.clientError("Bad Request",res)
        }
    }
};


exports.updateRoles = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var name = req.body.name;
        var description = req.body.description;
        var id = req.params.id;

        try{
            connection.query('UPDATE Roles SET name = ?, description = ? WHERE id = ?',
            [ name, description, id ],
            function (error, rows, fields){
                if(error){
                    response.internalError(error.code, res);
                } else{
                    response.ok("Operation Success!", res)
                }
            });
        }catch(err){
            response.clientError("Bad Request", res);
        }
    }
};

exports.deleteRoles = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var id = req.params.id;

        try{
            connection.query('DELETE FROM Roles WHERE id = ?',
            [ id ],
            function (error, rows, fields){
                if(error){
                    response.internalError(error.code, res);
                } else{
                    response.ok("Operation Success!", res)
                }
            });
        }catch(err){
            response.clientError("Bad Request", res);
        }
    }
};
