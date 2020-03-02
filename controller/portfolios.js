'use strict';

var response = require('../res');
var connection = require('../conn');

exports.readPortfolios = function(req, res) {
    connection.query('SELECT * FROM Portfolios', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createPortfolios = function(req, res) {
    
    var name = req.body.name;
    var description = req.body.description;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var url = req.body.url;
    var user_id = req.body.user_id;

    connection.query('INSERT INTO Portfolios (name, description, start_date, end_date, url, user_id) values (?,?,?,?,?,?)',
    [ name, description, start_date, end_date, url, user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan user!", res)
        }
    });
};


exports.updatePortfolios = function(req, res) {
    
    var name = req.body.name;
    var description = req.body.description;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var url = req.body.url;
    var user_id = req.body.user_id;
    var id = req.body.id;

    connection.query('UPDATE Portfolios SET name = ?, description = ?, start_date = ?, end_date = ?, url = ?, user_id = ? WHERE id = ?',
    [ name, description, start_date, end_date, url, user_id, id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.deletePortfolios = function(req, res) {
    
    var id = req.body.id;

    connection.query('DELETE FROM Portfolios WHERE id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};