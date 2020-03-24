'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readCollaborators = function(req, res) {
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
};

exports.createCollaborators = function(req, res) {
    
    var status = req.body.status;
    var project_id = req.params.id;
    var user_id = req.body.user_id;

    try{
        connection.query('INSERT INTO Collaborators (status, project_id, user_id) values (?,?,?)',
        [ status, project_id, user_id ], 
        function (error, rows, fields){
            if(error){
                response.internalError(error.code);
            } else{
                response.ok("Berhasil menambahkan user!", res);
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
};


exports.updateCollaborators = function(req, res) {
    
    var status = req.body.status;
    var id = req.params.id;

    try{
        connection.query('UPDATE Collaborators SET status = ? WHERE id = ?',
        [ status, id ], 
        function (error, rows, fields){
            if(error){
                response.internalError(error.code);
            } else{
                response.ok("Berhasil merubah user!", res);
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
};

exports.deleteCollaborators = function(req, res) {
    
    var id = req.params.id;

    try{
        connection.query('DELETE FROM Collaborators WHERE id = ?',
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
};