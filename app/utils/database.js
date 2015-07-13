var mysql = require('mysql');
var config = require('../../config.js');

var pool = mysql.createPool({
    connectionLimit : 50,
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPass,
    database: config.database
});

exports.getSetOfPosts = function(setOffset, postsPerSet, callback) {

    var sqlQuery =
        'SELECT Posts.*, Authors.name, Authors.profileimgpath ' +
        'FROM Posts ' +
        'LEFT JOIN Authors ' +
        'ON Posts.authorId=Authors.id ' +
        'ORDER BY Posts.id ' +
        'DESC LIMIT ?,?';

    pool.getConnection(function(err, connection) {

        if (err) {
            console.log(err);
            callback(true);
            return;
        }

        connection.query(sqlQuery, [setOffset, postsPerSet],
            function (err, results) {

                // Release connection
                connection.release();

                if (err) {
                    console.log(err);
                    callback(true);
                    return;
                }

                callback(false, results);
            });
    });

};

exports.getLatestPost = function(callback) {

    var sqlQuery =
        'SELECT title, datetime ' +
        'FROM Posts ' +
        'ORDER BY datetime DESC ' +
        'LIMIT 3';

    pool.getConnection(function(err, connection) {

        if (err) {
            console.log(err);
            callback(true);
            return;
        }

        connection.query(sqlQuery, function (err, results) {

                // Release connection
                connection.release();

                if (err) {
                    console.log(err);
                    callback(true);
                    return;
                }

                callback(false, results);
            });
    });

};
