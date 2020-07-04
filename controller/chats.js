'use strict';

var response = require('../res');
var connection = require('../conn');
var header = require('../header');

exports.readChats = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var id = req.params.id;
        try{
            connection.query('SELECT * FROM Chats WHERE recipient_id = ?',
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
    }
};

exports.readAllChats = function(req, res){
    try{
        connection.query('SELECT * FROM Chats',
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
}

exports.postChats = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var message = req.body.message;
        var recipient_username = req.body.recipient_username;
        var sender_id = req.body.sender_id;
        var sender_username = req.body.sender_username;

        try{
            connection.query('INSERT INTO Chats (message, recipient_id, sender_id, sender_username) values (?,?,?,?)',
            [ message, recipient_id, sender_id, sender_username ],
            function (error, rows, fields){
                if(error){
                    response.internalError(error.code, res);
                } else{
                    response.ok("Operation Success", res)
                }
            });
        }catch(err){
            response.clientError("Bad Request", res)
        }
    }
};
