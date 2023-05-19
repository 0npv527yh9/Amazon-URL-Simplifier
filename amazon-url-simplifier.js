(() => {
    const amazonHost = 'www.amazon.co.jp';
    const dp = '/dp/';


    main();

    function main() {
        const url = getCanonicalUrl();

        if (url === null) {
            alert("This is not a amazon product page.");
            return;
        }

        const newUrl = simplifyUrl(url);

        // Write newUrl in the address bar
        window.history.pushState({}, '', newUrl);

        // Copy newUrl to the clipboard
        copy(newUrl);
    }
    

    // () -> string | null
    function getCanonicalUrl() {
        if (location.host != amazonHost) {
            return null;
        }

        const link = document.querySelector('link[rel="canonical"]');
        if (link !== null) {
            const url = link.getAttribute('href');
            if (url !== null && isAmazonProductPage(url)) {
                return url;
            }
        }

        return null;
    }


    // string -> boolean
    function isAmazonProductPage(url) {
        return url.includes(dp);
    }


    // string -> string
    function simplifyUrl(url) {
        const asinLength = 10;

        const asinBegin = url.indexOf(dp) + dp.length;
        const asinEnd = asinBegin + asinLength;
        const asin = url.substring(asinBegin, asinEnd);

        const newUrl = location.origin + dp + asin;
        return newUrl;
    }


    // string -> void
    function copy(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied: " + text);
        }, () => {
            alert('Address bar: ' + text);
        });
    }
})()
