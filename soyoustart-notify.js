#!/usr/bin/env node
var request = require('request');

if (process.env.NODE_SILENT) {
    console.log = function() {};
}

var wantedProduct = process.argv[2];
var wantedZone = process.argv[3];
console.log('Wanting', wantedProduct, wantedZone);

var Request = {JSONP: {request_map: {request_0: function(data) {
    data.answer.availability.forEach(function(it) {
        if (wantedProduct == it.reference) {
            it.zones.forEach(function(zone) {
                if (wantedZone == zone.zone) {
                    if (zone.availability == 'unavailable' || zone.availability == 'unknown') {
                        console.log('Product', it.reference, 'Zone', zone.zone, 'unavailable:', zone.availability);
                    } else {
                        console.info('Product', it.reference, 'Zone', zone.zone, 'available!', zone.availability);
                    }
                } else {
                    console.log('ignoring', it.reference, 'unwanted zone', zone.zone, 'availability', zone.availability);
                }
            });
        } else {
            console.log('ignoring unwanted', it.reference);
        }
    });
}}}};

var url = 'http://ws.ovh.ca/dedicated/r2/ws.dispatcher/getAvailability2?callback=Request.JSONP.request_map.request_0';
console.log('GET', url, '...');
request({
    url: url
}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        eval(body);
    } else {
        console.error('Cannot GET', url, error, response, body);
    }
});
