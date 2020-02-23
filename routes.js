'use strict';

module.exports = function(app) {
    var todoList = require('./controller');

    app.route('/')
        .get(todoList.index);

    app.route('/users')
        .get(todoList.users);

    app.route('/createUsers')
        .post(todoList.createUsers);

    app.route('/updateUsers')
        .put(todoList.updateUsers);

    app.route('/deleteUsers')
        .delete(todoList.deleteUsers);
};