'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readChats = function(req, res) {
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
            }else if(decoded.payload.user_id!=id){
                response.credErr('Access Denied', res);
            }else{
                connection.query('SELECT * FROM Chats WHERE recipient_id = ? OR sender_id = ?',
                [ id, id ],
                function (error, rows, fields){
                    if(error){
                        response.internalError(error.code, res);
                    } else{
                        response.ok(rows, res)
                    }
                });
            }
        }catch(err){
            response.clientError("Bad Request", res)
        }
    }
};

exports.postChats = function(req, res) {
    if(!req.headers.authorization){
        response.credErr('Unauthorized', res);
    }else{
        var message = req.body.message;
        var recipient_id = req.params.recipient_id;
        var sender_id = req.body.sender_id;

        var now = new Date();

        var token = req.headers.authorization;
        var decoded = header.jwt.decode(String(token).slice(String(token).lastIndexOf(' ') + 1), {complete: true});

        try{
            if(now.getTime()/1000>decoded.payload.exp){
                response.credErr('Token Expired', res);
            }else{
                connection.query('INSERT INTO Chats (message, recipient_id, sender_id) values (?,?,?)',
                [ message, recipient_id, sender_id ],
                function (error, rows, fields){
                    if(error){
                        response.internalError(error.code, res);
                    } else{
                        response.ok("Operation Success", res)
                    }
                });
            }
        }catch(err){
            response.clientError("Bad Request", res)
        }
    }
};
