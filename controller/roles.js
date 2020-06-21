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
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var project_id = req.params.project_id;

        var now = new Date();

        var token = req.headers.authorization;
        var decoded = header.jwt.decode(String(token).slice(String(token).lastIndexOf(' ') + 1), {complete: true});

        try{
            if(now.getTime()/1000>decoded.payload.exp){
                response.credErr('Token Expired', res);
            }else{
                if(decoded.payload.user_id!=id){
                    response.credErr('Access Denied',res);
                }else{
                    connection.query('SELECT * FROM Roles WHERE project_id = ?', [project_id]
                    ,function (error, rows, fields){
                        if(error){
                            response.internalError(error, res);
                        } else{
                            response.ok(rows, res);
                        }
                    });
                }
            }
        }catch(err){
            response.clientError("Bad Request",res);
        }
    }
};

exports.createRoles = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var name = req.body.name;
        var description = req.body.description;
        var project_id = req.body.project_id;
        var collaborator_id = req.body.collaborator_id;

        var now = new Date();

        var token = req.headers.authorization;
        var decoded = header.jwt.decode(String(token).slice(String(token).lastIndexOf(' ') + 1), {complete: true});

        try{
            if(now.getTime()/1000>decoded.payload.exp){
                response.credErr('Token Expired', res);
            }else{
                if(decoded.payload.user_id!=id){
                    response.forbidden('forbidden',res);
                }else{
                    connection.query('INSERT INTO Roles (name, description, project_id, collaborator_id) values (?,?,?,?)',
                    [ name, description, project_id, collaborator_id ],
                    function (error, rows, fields){
                        if(error){
                            response.internalError(error, res);
                        } else{
                            response.ok("Operation Success!", res);
                        }
                    });
                }
            }
        }catch(err){
            response.clientError("Bad Request",res);
        }
    }
};

exports.deleteRoles = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var id = req.params.id;

        var now = new Date();

        var token = req.headers.authorization;
        var decoded = header.jwt.decode(String(token).slice(String(token).lastIndexOf(' ') + 1), {complete: true});

        try{
            if(now.getTime()/1000>decoded.payload.exp){
                response.credErr('Token Expired', res);
            }else{
                connection.query('SELECT project_id FROM Roles WHERE role_id = ?',
                [ id ],
                function(error, rows, field){
                    if(error){
                        next();
                    }else{
                        var project_id = String(rows[0].project_id);

                        connection.query('SELECT user_id FROM Projects WHERE proj_id = ?',
                        [ project_id ],
                        function(error, rows, fields){
                            if(error){
                                next();
                            }else{
                                var owner_id = String(rows[0].user_id);
                                if(decoded.payload.user_id!=owner_id){
                                    response.credErr('Access Denied', res);
                                }else{
                                    connection.query('DELETE FROM Roles WHERE role_id = ?',
                                    [ id ],
                                    function (error, rows, fields){
                                        if(error){
                                            response.internalError(error, res)
                                        } else{
                                            response.ok("Operation Success", res)
                                        }
                                    });
                                }
                            }
                        })
                    }
                });
            }
        }catch(err){
            response.clientError('Bad Request', res);
        }
    }
};
