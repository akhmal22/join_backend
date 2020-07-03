'use strict';

var response = require('../res');
var connection = require('../conn');
var header = require('../header');

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
                connection.query('SELECT * FROM Chats WHERE recipient_id = ?',
                [ id ],
                function (error, rows, fields){
                    if(error){
                        response.internalError(error, res);
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
        var recipient_username = req.body.recipient_username;
        var sender_id = req.body.sender_id;
        var sender_username = req.body.sender_username;

        var now = new Date();

        var token = req.headers.authorization;
        var decoded = header.jwt.decode(String(token).slice(String(token).lastIndexOf(' ') + 1), {complete: true});

        try{
            if(now.getTime()/1000>decoded.payload.exp){
                response.credErr('Token Expired', res);
            }else{
                connection.query('SELECT use_id FROM Users WHERE username = ?',
                [recipient_username],
                function(error, rows, fields){
                    if(error){
                        response.internalError(error, res);
                    }else{
                        var recipient_id = String(rows[0].use_id);
                        connection.query('INSERT INTO Chats (message, recipient_id, sender_id, sender_username) values (?,?,?,?)',
                        [ message, recipient_id, sender_id, sender_username ],
                        function (error, rows, fields){
                            if(error){
                                response.internalError(error, res);
                            } else{
                                response.ok("Operation Success", res);
                            }
                        });
                    }
                })
            }
        }catch(err){
            response.clientError("Bad Request", res)
        }
    }
};
