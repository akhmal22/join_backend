'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readJoinedProjects = function(req, res) {
    try{
        connection.query('SELECT * FROM JoinedProjects', function (error, rows, fields){
            if(error){
                response.internalError(error.code, res);
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
        var parent_idb = req.body.parent_idb;
        var parent_idc = req.body.parent_idc;
        var parent_idd = req.body.parent_idd;
        var child_id = req.body.child_id;

        var now = new Date();

        var token = req.headers.authorization;
        var decoded = header.jwt.decode(String(token).slice(String(token).lastIndexOf(' ') + 1), {complete: true});

        try{
            if(now.getTime()/1000>decoded.payload.exp){
                response.credErr('Token Expired', res);
            }else{
                connection.query('SELECT user_id FROM Projects WHERE proj_id = ? OR proj_id = ? OR proj_id = ? OR proj_id = ?',
                [ parent_id, parent_idb, parent_idc, parent_idd ],
                function (error, rows, fields){
                    if(error){
                        next();
                    } else{
                        var user_id = new Array(rows.user_id);
                        user_id.every(function(element, index){
                            if(decoded.payload.user_id!=element){
                                response.forbidden('Forbidden', res);
                                return true;
                            }else{
                                if(parent_idd && parent_idc){
                                    connection.query('INSERT INTO JoinedProjects (name, description, parent_id, parent_idb, parent_idc, parent_idd, child_id) values (?,?,?,?,?,?,?)',
                                    [ name, description, parent_id, parent_idb, parent_idc, parent_idd, child_id ],
                                    function (error, rows, fields){
                                        if(error){
                                            response.internalError(error.code, res);
                                        } else{
                                            response.ok("Operation Success!", res)
                                        }
                                    });
                                }else if(!parent_idc && parent_idd){
                                    connection.query('INSERT INTO JoinedProjects (name, description, parent_id, parent_idb, parent_idd, child_id) values (?,?,?,?,?,?)',
                                    [ name, description, parent_id, parent_idb, parent_idd, child_id ],
                                    function (error, rows, fields){
                                        if(error){
                                            response.internalError(error.code, res);
                                        } else{
                                            response.ok("Operation Success!", res)
                                        }
                                    });
                                }else if(!parent_idd && parent_idc){
                                    connection.query('INSERT INTO JoinedProjects (name, description, parent_id, parent_idb, parent_idc, child_id) values (?,?,?,?,?,?)',
                                    [ name, description, parent_id, parent_idb, parent_idc, child_id ],
                                    function (error, rows, fields){
                                        if(error){
                                            response.internalError(error.code, res);
                                        } else{
                                            response.ok("Operation Success!", res)
                                        }
                                    });
                                }else{
                                    connection.query('INSERT INTO JoinedProjects (name, description, parent_id, parent_idb, child_id) values (?,?,?,?,?)',
                                    [ name, description, parent_id, parent_idb, child_id ],
                                    function (error, rows, fields){
                                        if(error){
                                            response.internalError(error.code, res);
                                        } else{
                                            response.ok("Operation Success!", res)
                                        }
                                    });
                                }
                                return false;
                            }
                        });
                    }
                });
            }
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

        var now = new Date();

        var token = req.headers.authorization;
        var decoded = header.jwt.decode(String(token).slice(String(token).lastIndexOf(' ') + 1), {complete: true});

        try{
            if(now.getTime()/1000>decoded.payload.exp){
                response.credErr('Token Expired', res);
            }else{
                connection.query('SELECT user_id FROM Projects WHERE proj_id = ? OR proj_id = ? OR proj_id = ? OR proj_id = ?',
                [ parent_id, parent_idb, parent_idc, parent_idd ],
                function (error, rows, fields){
                    if(error){
                        next();
                    }else{
                        var user_id = new Array(rows.user_id);
                        user_id.every(function(element, index){
                            if(decoded.payload.user_id!=element){
                                response.forbidden('Forbidden', res);
                                return true;
                            }else{
                                connection.query('DELETE FROM JoinedProjects WHERE id = ?',
                                [ id ],
                                function (error, rows, fields){
                                    if(error){
                                        response.internalError(error, res);
                                    } else{
                                        response.ok("Operation Success!", res)
                                    }
                                });
                                return false;
                            }
                        });
                    }
                })
            }
        }catch(err){
            response.clientError("Bad Request",res);
        }
    }
}
