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

exports.readJoinedProjectsChild = function(req, res){
    var child_id = req.params.child_id;
    try{
        connection.query('SELECT JoinedProjects.*, Projects.proj_id, Projects.name AS parent_name FROM JoinedProjects JOIN Projects ON JoinedProjects.parent_id = Projects.proj_id WHERE child_id = ? and JoinedProjects.status = 0',
        [child_id],
        function(error, rows, fields){
            if(error){
                response.internalError(error, res);
            }else{
                response.ok(rows, res)
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
}

exports.updateStatus = function(req, res){
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var join_id = req.params.join_id;
        var child_use_id = req.body.child_use_id;
        try{
            connection.query('UPDATE JoinedProjects SET status = 1 WHERE join_id = ?',
            [join_id],
            function(error, rows, fields){
                if(error){
                    response.internalError(error, res);
                }else{
                    connection.query("INSERT INTO Projects (name, description, type, duration, num_req_collaborator, user_id) values ((SELECT name FROM JoinedProjects WHERE join_id = ?),'joinedProject','type',1,1,?)",
                    [ join_id, child_use_id ],
                    function (error, rows, fields){
                        if(error){
                            response.internalError(error, res);
                        } else{
                            connection.query('INSERT INTO Collaborators (status, project_id, user_id) values (1,(SELECT proj_id FROM Projects WHERE name = (SELECT name FROM JoinedProjects WHERE join_id = ?)),(SELECT user_id FROM Projects WHERE proj_id = (SELECT parent_id FROM JoinedProjects WHERE join_id = ?)))',
                            [join_id, join_id],
                            function(error, rows, fields){
                                if(error){
                                    response.internalError(error, res);
                                }else{
                                    connection.query("UPDATE Projects SET status = 1 WHERE proj_id = (SELECT child_id FROM JoinedProjects WHERE join_id = ?)",
                                    [ join_id ],
                                    function (error, rows, fields){
                                        if(error){
                                            response.internalError(error, res);
                                        } else{
                                            connection.query("UPDATE Projects SET status = 1 WHERE proj_id = (SELECT parent_id FROM JoinedProjects WHERE join_id = ?)",
                                            [ join_id ],
                                            function (error, rows, fields){
                                                if(error){
                                                    response.internalError(error, res);
                                                } else{
                                                    response.ok("Operation Success!", res)
                                                }
                                            });
                                        }
                                    });
                                }
                            })
                        }
                    });
                }
            })
        }catch(err){
            response.clientError("Bad Request",res);
        }
    }
}

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
        var join_id = req.params.join_id;

        try{
            connection.query('DELETE FROM JoinedProjects WHERE id = ?',
            [ join_id ],
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
