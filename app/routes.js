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


    // What We Do =====================================================================================================/
    app.get('/process-control', function(req, res) {
        res.sendfile('./public/process-control.html');
    });

    app.get('/cloud-storage', function(req, res) {
        res.sendfile('./public/cloud-storage.html');
    });

    app.get('/continuous-improvement', function(req, res) {
        res.sendfile('./public/continuous-improvement.html');
    });


    // Services =======================================================================================================/

    app.get('/implementation', function(req, res) {
        res.sendfile('./public/implementation.html');
    });

    app.get('/consulting', function(req, res) {
        res.sendfile('./public/index');
    });

    app.get('/training', function(req, res) {
        res.sendfile('./public/training.html');
    });


    // Resources ======================================================================================================/

    app.get('/faq', function(req, res) {
        res.sendfile('./public/faq.html');
    });

    app.get('/white-papers', function(req, res) {
        res.sendfile('./public/index.html');
    });

    app.get('/guides', function(req, res) {
        res.sendfile('./public/guides.html');
    });

    app.get('/contact', function(req, res) {
        res.sendfile('./public/contact.html');
    });

    app.get('/blog', function(req, res) {
        res.sendfile('./public/blog/blog_home.html');
    });


    // Provesoft App ==================================================================================================/

    app.get('/pricing', function(req, res) {
        res.sendfile('./public/index.html');
    });

    app.get('/signup', function(req, res) {
        res.sendfile('./public/index.html');
    });

    app.get('/login', function(req, res) {
        res.sendfile('./public/signup.html');
    });


    // Blog ===========================================================================================================/

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


    // Provesoft Pages ================================================================================================/

    app.get('/process-management', function(req, res) {
        res.sendfile('./public/process-management.html');
    });

    app.get('/process-viewer', function(req, res) {
        res.sendfile('./public/process-viewer.html');
    });

    app.get('/improvement-collaboration', function(req, res) {
        res.sendfile('./public/improvement-collaboration.html');
    });


    // TODO: ADD 404 PAGE
    // Send to home page if no route found ============================================================================/
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};

