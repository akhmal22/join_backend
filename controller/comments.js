'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readComments = function(req, res) {
    var project_id = req.params.project_id;
    try{
        connection.query('SELECT * FROM Comments WHERE project_id = ?',
        [project_id],
        function (error, rows, fields){
            if(error){
                response.internalError(error.code, res);
            } else{
                response.ok(rows, res)
            }
        });
    }catch(err){
        response.clientError("Bad Request", res)
    }
};

exports.createComments = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var comment = req.body.comment;
        var user_id = req.body.user_id;
        var project_id = req.body.project_id;

        var now = new Date();

        var token = req.headers.authorization;
        var decoded = header.jwt.decode(String(token).slice(String(token).lastIndexOf(' ') + 1), {complete: true});

        try{
            if(now.getTime()/1000>decoded.payload.exp){
                response.credErr('Token Expired', res);
            }else{
                connection.query('INSERT INTO Comments (comment, user_id, project_id) values (?,?,?)',
                [ comment, user_id, project_id ],
                function (error, rows, fields){
                    if(error){
                        response.internalError(error.code, res);
                    } else{
                        response.ok("Operation Success", res);
                    }
                });
            }
        }catch(err){
            response.clientError("Bad Request", res);
        }
    }
};

exports.deleteComments = function(req, res) {
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
                connection.query('SELECT user_id FROM Comments WHERE comm_id = ?',
                [ id ],
                function (error, rows, fields){
                    if(error){
                        next();
                    } else{
                        var user_id = rows[0].user_id;
                        if(decoded.payload.user_id!=user_id){
                            response.forbidden('Forbidden', res);
                        }else{
                            connection.query('DELETE FROM Comments WHERE id = ?',
                            [ id ],
                            function (error, rows, fields){
                                if(error){
                                    response.internalError(error.code, res);
                                } else{
                                    response.ok("Operation Success", res);
                                }
                            });
                        }
                    }
                });
            }
        }catch(err){
            response.clientError("Bad Request",res);
        }
    }
};
