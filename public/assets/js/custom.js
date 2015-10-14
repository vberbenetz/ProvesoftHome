
// Retrieve latest post to populate the footer
jQuery(document).ready(function() {

    jQuery.ajax({
        url: '/api/blog/latest-post',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',

        success : function(results) {
            jQuery('#latestBlogPostTitle_1').text(results[0].title);
            jQuery('#latestBlogPostDate_1').text(results[0].datetime);

            if (results.length > 1) {
                jQuery('#latestBlogPostTitle_2').text(results[1].title);
                jQuery('#latestBlogPostDate_2').text(results[1].datetime);
            }

            if (results.length > 2) {
                jQuery('#latestBlogPostTitle_3').text(results[2].title);
                jQuery('#latestBlogPostDate_3').text(results[2].datetime);
            }
        },

        error : function(jqXHR, textStatus, errorThrown) {
        },

        timeout: 120000
    });

});

// Update footer copyright with latest year
jQuery(document).ready(function() {

    var currentYear = new Date().getFullYear();

    jQuery('#copyrightDate').text(currentYear + ' \u00A9 All Rights Reserved.')
});

