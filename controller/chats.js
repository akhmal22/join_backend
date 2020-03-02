'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readChats = function(req, res) {
    connection.query('SELECT * FROM Chats', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createChats = function(req, res) {
    
    var message = req.body.message;
    var recipient_id = req.body.recipient_id;
    var sender_id = req.body.sender_id;

    connection.query('INSERT INTO Chats (message, recipient_id, sender_id) values (?,?,?)',
    [ message, recipient_id, sender_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan user!", res)
        }
    });
};


exports.updateChats = function(req, res) {
    
    var message = req.body.message;
    var recipient_id = req.body.recipient_id;
    var sender_id = req.body.sender_id;
    var id = req.body.id;

    connection.query('UPDATE Chats SET message = ?, recipient_id = ?, sender_id = ? WHERE id = ?',
    [ message, recipient_id, sender_id, id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.deleteChats = function(req, res) {
    
    var id = req.body.id;

    connection.query('DELETE FROM Chats WHERE id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};