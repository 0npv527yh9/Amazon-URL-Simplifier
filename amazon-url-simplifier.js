(() => {
    main();
    

    function main() {
        const url = location.href;

        if (isAmazonProductPage(url)) {
            const newUrl = simplifyUrl(url);

            // Write newUrl in the address bar
            window.history.pushState({}, '', newUrl);

            // Copy newUrl to the clipboard
            copy(newUrl);
        } else {
            alert("This is not a amazon product page.");
        }
    }


    // string -> boolean
    function isAmazonProductPage(url) {
        const amazonHost = 'www.amazon.co.jp';
        const isAmazonPage = new URL(url).host == amazonHost;
        const isProductPage = url.includes('/dp/');
        return isAmazonPage && isProductPage;
    }


    // string -> string
    function simplifyUrl(url) {
        const dp = '/dp/';
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
