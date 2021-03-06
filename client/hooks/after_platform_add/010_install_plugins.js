#!/usr/bin/env node
 
//this hook installs all your plugins
 
// add your plugins to this list--either 
// the identifier, the filesystem location 
// or the URL
var pluginlist = [
    "self-plugins/org.apache.cordova.deviceEx",
    "org.apache.cordova.console",
    "org.apache.cordova.statusbar",
    "org.apache.cordova.splashscreen",
    "com.ionic.keyboard",
    "org.apache.cordova.file",
    "org.apache.cordova.file-transfer",
    "org.chromium.zip",
    "org.apache.cordova.inappbrowser",
    "technology.kulak.cordova.appopen",
    "https://github.com/ohh2ahh/AppAvailability.git",
    // "https://github.com/EddyVerbruggen/LaunchMyApp-PhoneGap-Plugin.git --variable URL_SCHEME=gaeago",
    "self-plugins/pushPluginEx",
    "self-plugins/Custom-URL-scheme-master --variable URL_SCHEME=gaeago",
    "self-plugins/SetIntentPlugin",
];

// no need to configure below
 
var fs = require('fs');
var path = require('path');
var sys = require('sys')
var exec = require('child_process').exec;
var async = require('async');
 
function puts(error, stdout, stderr) {
    
}

async.eachSeries(pluginlist, function(plugin, callback){
    exec("cordova plugins add " + plugin, function(error, stdout, stderr){
        if (error){
            console.log(error);
            sys.puts(stdout);
            callback(error);
        }
        sys.puts(stdout);
        callback();
    })
}, function(error){
    return false;
})

//exec("cordova plugins add ", puts);
