// app.routes.js

var serveStatic = require('serve-static');
var blogController = require('./controllers/blog_controller');

module.exports = function(app) {

    // Allow static HTML and CSS pages to be rendered =================================================================/
    app.use(serveStatic('public'));

    // Home Page ======================================================================================================/
    app.get('/', function(req, res) {
        res.sendfile('./public/index.html');
    });

    app.get('/contact', function(req, res) {
        res.sendfile('./public/contact.html');
    });

    app.get('/our-mission', function(req, res) {
        res.sendfile('./public/mission.html');
    });


    // Shop Demo ======================================================================================================/
    app.get('/shop-demo', function(req, res) {
        res.sendfile('./public/Shop-UI/index.html');
    });


    // Blog ===========================================================================================================/
    app.get('/blog', function(req, res) {
        res.sendfile('./public/blog/blog_home.html');
    });

    app.get('/blog/:name', function(req, res) {
        var name = req.params.name;

        if (blogController.checkFileExists(name)) {
            res.sendfile('./public/blog/blog_posts/' + name + '.html');
        }
        else {
            res.redirect('/blog');
        }

    });

    app.get('/api/blog/set-of-posts', function(req, res) {
        blogController.getSetOfPosts(req, res);
    });

    app.get('/api/blog/latest-post', function(req, res) {
        blogController.getLatestPost(req, res);
    });
// Provesoft Pages =================================================================================================/
    app.get('/process-management', function(req, res) {
        res.sendfile('./public/process-management.html');
    });

    app.get('/process-viewer', function(req, res) {
        res.sendfile('./public/process-viewer.html');
    });

    app.get('/improvement-collaboration', function(req, res) {
        res.sendfile('./public/improvement-collaboration.html');
    });

    // Send to home page if no route found ============================================================================/
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};

