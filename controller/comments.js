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

    var comment = req.body.comment;
    var user_id = req.body.user_id;
    var project_id = req.body.project_id;

    try{
        connection.query('INSERT INTO Comments (comment, user_id, project_id) values (?,?,?)',
        [ comment, user_id, project_id ],
        function (error, rows, fields){
            if(error){
                response.internalError(error.code, res);
            } else{
                response.ok("Berhasil menambahkan user!", res);
            }
        });
    }catch(err){
        response.clientError("Bad Request", res);
    }
};

exports.deleteComments = function(req, res) {

    var id = req.params.id;

    connection.query('DELETE FROM Comments WHERE id = ?',
    [ id ],
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};
