'use strict';

var blogServices = angular.module('blogServices', ['ngResource']);

blogServices.factory('mainService', function ($resource) {
    return {

        setOfPosts: $resource('/api/blog/set-of-posts',
            {},
            {
                query: {
                    method: 'GET',
                    params: {
                        setNumber: '@setNumber'
                    },
                    isArray: true
                }
            }
        )
    }
});
