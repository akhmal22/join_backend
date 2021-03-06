'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readCollaborators = function(req, res) {
    var project_id = req.params.proj_id;
    try {
        connection.query('SELECT Collaborators.*, Roles.name, Users.username FROM Collaborators LEFT JOIN Roles \
                            ON \
                            Collaborators.coll_id = Roles.collaborator_id \
                            LEFT JOIN Users \
                            ON \
                            Collaborators.user_id = Users.use_id \
                            WHERE Collaborators.project_id = ? AND Collaborators.status = 1;',
        [ project_id ], function (error, rows, fields){
            if(error){
                response.internalError(error, res);
            } else{
                response.ok(rows, res);
            }
        });
    }catch(err){
        response.clientError("Bad Request", res)
    }
};

exports.readUnemployed = function(req, res) {
    var project_id = req.params.proj_id;
    try {
        connection.query('SELECT Collaborators.*, Users.username FROM Collaborators LEFT JOIN Users ON Collaborators.user_id = Users.use_id WHERE project_id = ?',
        [ project_id ], function (error, rows, fields){
            if(error){
                response.internalError(error, res);
            } else{
                response.ok(rows, res);
            }
        });
    }catch(err){
        response.clientError("Bad Request", res)
    }
}

exports.readAllCollaborators = function(req, res) {

    try {
        connection.query('SELECT * FROM Collaborators', function (error, rows, fields){
            if(error){
                response.internalError(error, res);
            } else{
                response.ok(rows, res);
            }
        });
    }catch(err){
        response.clientError("Bad Request", res)
    }
};

exports.readApplication = function(req, res) {
    var proj_id = req.params.proj_id;

    try {
        connection.query('SELECT Collaborators.*, Users.username FROM Collaborators JOIN Users ON Collaborators.user_id = Users.use_id WHERE Collaborators.project_id = ? AND Collaborators.status = 0',
        [proj_id], function (error, rows, fields){
            if(error){
                response.internalError(error, res);
            } else{
                response.ok(rows, res);
            }
        });
    }catch(err){
        response.clientError("Bad Request", res)
    }
};



exports.countActiveCollaborators = function(req, res) {
    var project_id = req.params.id;

    try {
        connection.query('SELECT COUNT(*) FROM Roles WHERE project_id = ?', [ project_id ], function (error, rows, fields){
            if(error){
                response.internalError(error, res);
            } else{
                response.ok(rows, res);
            }
        });
    }catch(err){
        response.clientError("Bad Request", res)
    }
};

exports.createCollaborators = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var status = req.body.status;
        var project_id = req.params.id;
        var user_id = req.body.user_id;

        try{
            connection.query('INSERT INTO Collaborators (status, project_id, user_id) values (?,?,?)',
            [ status, project_id, user_id ],
            function (error, rows, fields){
                if(error){
                    response.internalError(error, res);
                } else{
                    response.ok("Berhasil menambahkan user!", res);
                }
            });
        }catch(err){
            response.clientError("Bad Request",res);
        }
    }
};


exports.updateCollaboratorsStatus = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var status = req.body.status;
        var id = req.params.id;

        try{
            connection.query('UPDATE Collaborators SET status = ? WHERE coll_id = ?',
            [ status, id ],
            function (error, rows, fields){
                if(error){
                    response.internalError(error.code);
                } else{
                    response.ok("Operation Success", res);
                }
            });
        }catch(err){
            response.clientError("Bad Request",res);
        }
    }
};

exports.deleteCollaborators = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var id = req.params.id;

        try{
            connection.query('DELETE FROM Collaborators WHERE coll_id = ?',
            [ id ],
            function (error, rows, fields){
                if(error){
                    response.internalError(error.code,res);
                } else{
                    response.ok("Berhasil menghapus user!", res);
                }
            });
        }catch(err){
            response.clientError("Bad Request",res);
        }
    }
};
