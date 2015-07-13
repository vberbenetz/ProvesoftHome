var config = require('../../config');
var db = require('../utils/database');
var fs = require('fs');

var blogController = function() {};

blogController.prototype = {

    // Get Paginated Blogs
    getSetOfPosts : function (req, res) {

        var setNumber = req.query.setNumber;
        var postsPerSet = config.postsPerSet;

        var setOffset = 0;

        // Check if integer
        if ( typeof setNumber==='undefined' || (Number(setNumber)===setNumber && setNumber%1!==0) ) {
            res.send(400,'Bad Request');
        }
        else {
            setOffset = postsPerSet * setNumber;
        }

        db.getSetOfPosts(setOffset, postsPerSet, function(err, results) {
            if (err) {
                res.send(500, 'Server Error');
                return;
            }

            res.send(results);
        });

    },

    // Get the latest post
    getLatestPost : function (req, res) {

        db.getLatestPost(function(err, results) {
            if(err) {
                res.send(500, 'Server Error');
                return;
            }

            res.send(results);
        });
    },

    // Check performed to see if requested blog URL extension exists
    checkFileExists : function (name) {

        var fileName = name + '.html';
        var listOfFiles = fs.readdirSync('./public/blog/blog_posts/');

        for (var i = 0; i < listOfFiles.length; i++) {

            // Exists
            if (listOfFiles[i].localeCompare(fileName) == 0) {
                return true;
            }
        }

        return false;
    }

};

module.exports = new blogController();
