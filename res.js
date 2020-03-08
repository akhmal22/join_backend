'use strict';

exports.ok = function(values, res) {
  var data = {
      'status': 200,
      'values': values
  };
  res.json(data);
  res.end();
};

exports.token = function(values, res){
  var data = {
    'status': 200,
    'token': values
  };
  res.json(data);
  res.end();
}

exports.internalError = function(values, res) {
  var data = {
    'status': 500,
    'values': values
  };
  res.json(data);
  res.end();
}

exports.clientError = function(values, res) {
  var data = {
    'status': 400,
    'values': values
  };
  res.json(data);
  res.end();
}