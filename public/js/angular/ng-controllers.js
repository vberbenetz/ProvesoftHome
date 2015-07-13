'use strict';

var blogControllers = angular.module('blogControllers', ['ngSanitize']);


blogControllers.controller('mainController', ['$scope', 'mainService',
    function ($scope, mainService) {

        $scope.posts = [];
        $scope.setNumber = 0;
        $scope.noMorePosts = false;
        $scope.loadingPosts = false; // Disable multiple post retrievals from the DB at the same time (concurrency)

        $scope.getPostSet = function() {

            $scope.loadingPosts = true;

            mainService.setOfPosts.query({setNumber: $scope.setNumber}, function(data) {

                if (data.length == 0) {
                    $scope.noMorePosts = true;
                    return;
                }

                // Format link to post
                for (var i = 0; i < data.length; i++) {
                    data[i].postUrl = data[i].title.replace(/\s+/g, '-');
                    data[i].postTitleUrlEncoded = data[i].title.replace(/\s+/g, '%20');

                    // Set sharing links
                    data[i].shareTwitter = 'https://twitter.com/intent/tweet?url=http://www.cantangosolutions.com/blog/' + data[i].postUrl;
                    data[i].shareLinkedin = 'https://www.linkedin.com/shareArticle?mini=true&url=http://www.cantangosolutions.com/blog/' +
                                            data[i].postTitle +
                                            '&title=' +
                                            data[i].postTitleUrlEncoded +
                                            '&summary=' +
                                            data[i].postTitleUrlEncoded +
                                            '&source=CantangoSolutions';
                    data.shareEmail = 'mailto:?subject=Check out this blog post I found&amp;body=http://www.cantangosolutions.com/blog/' + data[i].postUrl;

                }

                $scope.posts = $scope.posts.concat(data);
                $scope.setNumber++;

                $scope.loadingPosts = false;
            });

        };

        // Get initial set of posts
        $scope.getPostSet();

        // Listen for when almost at the bottom of the page
        document.addEventListener("scroll", function (event) {
            if (getDocHeight() <= getScrollXY()[1] + window.innerHeight) {

                // Get next set of posts
                if (!$scope.noMorePosts && !$scope.loadingPosts) {
                    $scope.getPostSet();
                    $scope.$apply();
                }

            }
        });

    }]);


// Functions used to determine when user reaches bottom of page
function getScrollXY() {
    var scrOfX = 0, scrOfY = 0;
    if( typeof( window.pageYOffset ) == 'number' ) {
        //Netscape compliant
        scrOfY = window.pageYOffset + 400;  // 400px offset from bottom to know when user is almost at the bottom
        scrOfX = window.pageXOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
        //DOM compliant
        scrOfY = document.body.scrollTop + 400;
        scrOfX = document.body.scrollLeft;
    } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop + 400;
        scrOfX = document.documentElement.scrollLeft;
    }
    return [ scrOfX, scrOfY ];
}

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}