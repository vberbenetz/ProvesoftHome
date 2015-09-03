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

    app.get('/implementation', function(req, res) {
        res.sendfile('./public/Implementation.html');
    });

    app.get('/signup', function(req, res) {
        res.sendfile('./public/signup.html');
    });

    app.get('/process-control', function(req, res) {
        res.sendfile('./public/process-control.html');
    });

    app.get('/cloud-storage', function(req, res) {
        res.sendfile('./public/cloud-storage.html');
    });

    app.get('/continuous-improvement', function(req, res) {
        res.sendfile('./public/continuous-improvement.html');
    });

    app.get('/training', function(req, res) {
        res.sendfile('./public/training.html');
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

