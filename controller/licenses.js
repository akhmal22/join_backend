'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readLicenses = function(req, res) {
    try{
        connection.query('SELECT * FROM Licenses', function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok(rows, res)
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
};

exports.createLicenses = function(req, res) {
    
    var name = req.body.name;
    var issue_date = req.body.issue_date;
    var exp_date = req.body.exp_date;
    var organization = req.body.organization;
    var description = req.body.description;
    var credential = req.body.credential;
    var user_id = req.body.user_id;

    try{
        connection.query('INSERT INTO Licenses (name, issue_date, exp_date, organization, description, credential, user_id) values (?,?,?,?,?,?,?)',
        [ name, issue_date, exp_date, organization, description, credential, user_id ], 
        function (error, rows, fields){
            if(error){
                response.internalError(error.code, res);
            } else{
                response.ok("Operation Success!", res)
            }
        });
    }catch(err){
        response.clientError("Bad Request",res);
    }
};


exports.updateLicenses = function(req, res) {
    
    var name = req.body.name;
    var issue_date = req.body.issue_date;
    var exp_date = req.body.exp_date;
    var organization = req.body.organization;
    var description = req.body.description;
    var credential = req.body.credential;
    var user_id = req.body.user_id;
    var id = req.body.id;

    connection.query('UPDATE Licenses SET name = ?, issue_date = ?, exp_date = ?, organization = ?, description = ?, credential = ?, user_id = ? WHERE id = ?',
    [ name, issue_date, exp_date, organization, description, credential, user_id, id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.deleteLicenses = function(req, res) {
    
    var id = req.body.id;

    connection.query('DELETE FROM Licenses WHERE id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};