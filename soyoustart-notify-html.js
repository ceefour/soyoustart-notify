/**
 * DEPRECATED way using HTML to check availability
 */
var fs = require('fs'),
    cheerio = require('cheerio');

var buf = fs.readFileSync('view-source_www.soyoustart.com_us_essential-servers.xml.html');//.toString();
var $ = cheerio.load(buf);

var rows = $('table.offers-table tr');
console.info('Rows:', rows.length);
rows.each(function(idx, row) {
    var productName = $(row).find('.product-name').text();
    if (productName) {
        var lastDelivery = $(row).find('.elapsed-time-since-last-delivery').text();
        console.info('Product:', productName, 'Unavailable:', lastDelivery);
    }
});
