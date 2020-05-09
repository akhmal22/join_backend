'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readChats = function(req, res) {
    var id = req.params.id;
    try{
        connection.query('SELECT * FROM Chats WHERE recipient_id = ? OR sender_id = ?',
        [ id, id],
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

exports.postChats = function(req, res) {

    var message = req.body.message;
    var recipient_id = req.params.recipient_id;
    var sender_id = req.body.sender_id;

    try{
        connection.query('INSERT INTO Chats (message, recipient_id, sender_id) values (?,?,?)',
        [ message, recipient_id, sender_id ],
        function (error, rows, fields){
            if(error){
                response.internalError(error.code, res);
            } else{
                response.ok("Berhasil menambahkan user!", res)
            }
        });
    }catch(err){
        response.clientError("Bad Request", res)
    }
};
