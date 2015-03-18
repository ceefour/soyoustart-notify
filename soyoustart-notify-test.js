#!/usr/bin/env node
var fs = require('fs');

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

var buf = fs.readFileSync('sample-availability.js').toString();
eval(buf);
