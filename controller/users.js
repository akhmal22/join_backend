'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readUsers = function(req, res) {
    connection.query('SELECT * FROM Users', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createUsers = function(req, res) {
    
    var full_name = req.body.full_name;
    var phone = req.body.phone;
    var email = req.body.email;
    var password = req.body.password;
    var organization = req.body.organization;
    var position = req.body.position;
    var username = req.body.username;

    // INSERT INTO query
    connection.query('INSERT INTO Users (full_name, phone, email, password, organization, position, username) values (?,?,?,?,?,?,?)',
    [ full_name, phone, email, password, organization, position, username ], 
    function (error, rows, fields){
        if(error){
            // error to the log
            console.log(error)
        } else{
            // success message
            response.ok("Berhasil menambahkan user!", res)
        }
    });
};


exports.updateUsers = function(req, res) {
    
    var full_name = req.body.full_name;
    var phone = req.body.phone;
    var email = req.body.email;
    var password = req.body.password;
    var avatar = req.body.avatar;
    var status = req.body.status;
    var organization = req.body.organization;
    var position = req.body.position;
    var username = req.body.username;
    var id = req.body.id;

    connection.query('UPDATE Users SET full_name = ?, phone = ?, email = ?, password = ?, avatar = ?, status = ?, organization = ?, position = ?, username = ? WHERE id = ?',
    [ full_name, phone, email, password, avatar, status, organization, position, username, id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.deleteUsers = function(req, res) {
    
    var id = req.body.id;

    connection.query('DELETE FROM Users WHERE id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};

exports.loginUsers = function(req, res) {
    // requests username and password
    var username = req.body.username;
    var password = req.body.password;

    // SELECT password query
    connection.query('SELECT password FROM Users WHERE username = ?',
    [ username ],
    function(error, rows, fields){
        // puts query result rows to const
        const pw = rows;

        // checks if password requested match
        const match = pw.find(p => {
            return p.password === password
        });

        // success message or fail message
        if(match){
            response.ok("loggedin",res);
        }else{
            response.ok("notmatch",res);
        }
    });
}