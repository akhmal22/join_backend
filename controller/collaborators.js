'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readCollaborators = function(req, res) {
     var project_id = req.body.project_id;

    connection.query('SELECT * FROM Collaborators WHERE project_id = ?', [ project_id ], function (error, rows, fields){
        if(error){
            response.internalError(error.code);
        } else{
            response.ok(rows, res);
        }
    });
};

exports.createCollaborators = function(req, res) {
    
    var status = req.body.status;
    var project_id = req.body.project_id;
    var user_id = req.body.user_id;

    connection.query('INSERT INTO Collaborators (status, project_id, user_id) values (?,?,?)',
    [ status, project_id, user_id ], 
    function (error, rows, fields){
        if(error){
            response.internalError(error.code);
        } else{
            response.ok("Berhasil menambahkan user!", res);
        }
    });
};


exports.updateCollaborators = function(req, res) {
    
    var status = req.body.status;
    var project_id = req.body.project_id;
    var user_id = req.body.user_id;
    var id = req.body.id;

    connection.query('UPDATE Collaborators SET status = ?, project_id = ?, user_id = ? WHERE id = ?',
    [ status, project_id, user_id, id ], 
    function (error, rows, fields){
        if(error){
            response.internalError(error.code);
        } else{
            response.ok("Berhasil merubah user!", res);
        }
    });
};

exports.deleteCollaborators = function(req, res) {
    
    var id = req.body.id;

    connection.query('DELETE FROM Collaborators WHERE id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            response.internalError(error.code);
        } else{
            response.ok("Berhasil menghapus user!", res);
        }
    });
};