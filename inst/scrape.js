var webPage = require('webpage');
var page = webPage.create();

var fs = require('fs');
var system = require('system');
var from_page = parseInt(system.args[1]);
var to_page = parseInt(system.args[2]);
var outdir = system.args[3];

var download_page = function(current_page) {
    if(current_page <= to_page) {
        var query = '_query=C_FONCTION:A+OR+C_FONCTION:AO+OR+C_FONCTION:AU+OR+C_FONCTION:AE+OR+C_FONCTION:AS+OR+C_FONCTION:C&_no_escape=1&_page=' + current_page;
        var url = 'http://ge.ch/justice/donnees/avocats/search?' + query;

        console.log('downloading page ', url);
        page.open(url, function (status) {
            var content = page.content;
            var path = outdir + '/' + query + '.html';
            fs.write(path, content, 'w');
            console.log('\twritten to ' + path);
            download_page(current_page + 1);
        });

    } else {
        console.log('done');
        phantom.exit();
    }
};

download_page(from_page);