'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readCollaborators = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var project_id = req.params.id;
        try {
            connection.query('SELECT * FROM Collaborators WHERE project_id = ?', [ project_id ], function (error, rows, fields){
                if(error){
                    response.internalError(error.code);
                } else{
                    response.ok(rows, res);
                }
            });
        }catch(err){
            response.clientError("Bad Request", res)
        }
    }
};

exports.readAllCollaborators = function(req, res) {

    try {
        connection.query('SELECT * FROM Collaborators', function (error, rows, fields){
            if(error){
                response.internalError(error.code);
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
        connection.query('SELECT * FROM Collaborators WHERE project_id = ? AND status = 0',
        [proj_id], function (error, rows, fields){
            if(error){
                response.internalError(error.code);
            } else{
                response.ok(rows, res);
            }
        });
    }catch(err){
        response.clientError("Bad Request", res)
    }
};



exports.countCollaborators = function(req, res) {
    var project_id = req.params.id;

    try {
        connection.query('SELECT COUNT(*) FROM Collaborators WHERE project_id = ?', [ project_id ], function (error, rows, fields){
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
            connection.query('UPDATE Collaborators SET status = ? WHERE collab_id = ?',
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
            connection.query('DELETE FROM Collaborators WHERE collab_id = ?',
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
