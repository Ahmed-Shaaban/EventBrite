// Finds link elements with class 'js-update-referrer-url' and updates the href tag with the
// referrer. Replacement for generating this url in the backend, since with esi caching, the
// request url may not actually be the top level url of the page. window.location is most
// dependable in this case.
// Note: May need to eventually be moved to a place usable by other places (like dorsal)
(function() {
    document.addEventListener("DOMContentLoaded", function(event) {
        var currentPageUrl = window.location.pathname + window.location.search,
            urlElementsToUpdate = document.getElementsByClassName('js-update-referrer-url'),
            originalUrl,
            hasQueryParams,
            updatedUrl;

        for (var i = 0, originalElement; originalElement = urlElementsToUpdate[i]; i++) {
            originalUrl = urlElementsToUpdate[i].href;
            hasQueryParams = !!originalUrl.split('?')[1];
            updatedUrl = originalUrl + (hasQueryParams ? '&' : '?') + 'referrer=' + currentPageUrl;
            urlElementsToUpdate[i].href = updatedUrl;
        }
    });
})();