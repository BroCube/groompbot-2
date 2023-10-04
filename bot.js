//YouTube-to-Reddit bot v3? - Simple Library Edition
//Re-written by Bob Hannent - reddit.com/u/bobdvb
//Inspired by Dan Barbier - reddit.com/u/brocube
//originally for use with reddit.com/u/groompbot

//node
//get video post history
//video_history.txt is a stored JSON array of youtube video IDs
var videoHistory = new Array();
var history_file = './video_history.json';
var fs = require("fs");

function fetchHistory () {
        if(!fs.existsSync(history_file)) {
         console.log("File not found: " + history_file);
        }
        var receivedChunks = "";
        try {
                receivedChunks = fs.readFileSync(history_file);
        } catch (err) {
                console.log("File read failed");
        }

        console.log("Chunk size is: " + receivedChunks.length);
        if (receivedChunks.length <= 0) {
                console.log("No received chunks");
        } else {
                videoHistory = JSON.parse(receivedChunks); //receivedChunks.split(",");
                console.log("Found: " + videoHistory);
        }
        if (!Array.isArray(videoHistory)) {
                return new Error("videoHistory isn't an array");
        }
        if (videoHistory.length < 1) {
                return new Error("videoHistory is empty");
        }
        console.log(history_file + " loaded with " + videoHistory.length + " items");
};

// Reddit credentials
var credentials = { //removed from public code. Make sure to put your own info here
        "username": "",
        "password": ""
};

var oAuth2 = { //removed from public code. Make sure to put your own info here if you clone this!
        "id": "",
        "secret": "",
        "redir": ""
};

// Reddit Code
const snoowrap = require('snoowrap');

const otherRequester = new snoowrap({
        userAgent: 'dtlbot/1.0 by bobdvb',
        clientId: oAuth2.id,
        clientSecret: oAuth2.secret,
        username: credentials.username,
        password: credentials.password
});

function postToReddit (url, title) {
        console.log("posting");
        // Submitting a link to a subreddit without the /r/, just the name
        otherRequester.getSubreddit('DextersTechLab').submitLink({
                title: title,
                url: url
        });
};

// Fetch YouTube channels, save to list and post to Reddit
const youtube = require('scrape-youtube');
const nodeCron = require('node-cron');

function startHTMLPull () {
        // Searching for the current keyword and within a month, sorted by newest.
        // Might consider reducing the filter to the last week or day for busy channels
        youtube.search('DextersTechLab', {sp: 'EgIIBA%253D%253D'}).then((results) => {
                // Unless you specify a custom type you will only receive 'video' results
//              console.log("Youtube results: " + results.videos); //debug
                for (var i in results.videos) {
                // Narrow down by channel name because that's what we're tracking.
                if (results.videos[i].channel.name === 'DextersTechLab') {
                        // Is the video NOT already in the previously spotted videos
                        if (videoHistory.indexOf(results.videos[i].id) === -1){
                                //Add the new video to the history
                                videoHistory.push(results.videos[i].id);
                                //Update the history file
                                fs.writeFile(history_file, JSON.stringify(videoHistory, null, 2), function (err) {
                                        if (err) {
                                                console.log("writeFile for video_history.txt failed: " + err);
                                        }
                                });
                                //Make the post to Reddit
                                postToReddit(results.videos[i].link, results.videos[i].title);
                        } else {
                                // Don't bother logging if there are loads of videos
                                if (results.videos.length <= 20) {
                                //The found video already exists, logged for debugging
                                console.log("Exists: " + results.videos[i].title); //TODO: Comment out for busy channels?
                                }
                        }
                } else {
                // Not target channel
                }
                };
        });

};

// Start by fetching the history
fetchHistory();
// Then fetch the latest since last time
startHTMLPull();
// Check every 5min past the hour
nodeCron.schedule('5,35 * * * *', () => {
        console.log("Cron triggered...");
        startHTMLPull();
});

//console.log("\nFinished the Youtube-To-Reddit Scraper Bot\n");
