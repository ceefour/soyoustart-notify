soyoustart-notify
=================

Notify when a SoYouStart server is available

## Building

    npm install

## Usage: Real from Server

Get the product reference from http://www.soyoustart.com/us/essential-servers.xml page, `data-ref=` attribute.

    ./soyoustart-notify.js 139caeg2 bhs

To silent output (usable in cron):

    NODE_SILENT=true ./soyoustart-notify.js 139caeg2 bhs

## Usage: Testing

Get the product reference from http://www.soyoustart.com/us/essential-servers.xml page, `data-ref=` attribute.

    ./soyoustart-notify-test.js 139caeg2 bhs

To silent output (usable in cron):

    NODE_SILENT=true ./soyoustart-notify-test.js 139caeg2 bhs
