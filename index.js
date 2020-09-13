// Requried Libs
const TikTok = require('tiktok-status-api');
const instaObj = require('instagram-basic-data-scraper-with-username');
const request = require('request');
require('dotenv').config();

// Setup for Apis
const tiktok = new TikTok();

// Arrays for storing follower count
var tiktok_followers = []
var instagram_followers = []




// .env verification 
if (process.env.tiktok == 'YES') {
    if (process.env.tiktok_username == undefined) {
        console.log('Missing Tiktok Username')
        return;
    } else if (process.env.tiktok_url == undefined) {
        console.log('Missing Tiktok Url')
        return;
    } else {
        console.log('Running Tiktok!')
        // Restarting follower counts every 30 seconds
        // Tiktok
        setInterval(tiktok_follow, 5 * 1000);
    }
} else {
    console.log('No Tikok');
}
if (process.env.instagram == 'YES') {
    if (process.env.instagram_username == undefined) {
        console.log('Missing Instagram Username')
        return;
    } else if (process.env.instagram_url == undefined) {
        console.log('Missing Instagram Url')
        return;
    } else {
        console.log('Running Instagram!')
        // Restarting follower counts every 30 seconds
        // Instagram
        setInterval(instagram_follow, 5 * 1000);
    }
} else {
    console.log('No Instagram');
}




//Functions
// Titkok Followers
function tiktok_follow() {
    console.log('----------')
    const current = tiktok.getFollowers(process.env.tiktok_username);
    if (current > tiktok_followers[tiktok_followers.length - 1]) {
        console.log('New Tiktok Follower!', current);
        request_tiktok();
    } else {
        console.log('No New Tiktok Follower!', current);
    }
    tiktok_followers.push(current);
    console.log('Updated Tiktok Array');
};

// Request Url Function Tiktok
function request_tiktok() {
    var url = process.env.tiktok_url
    request.get({
        url: url,
        json: true,
        headers: {
            'User-Agent': 'request'
        }
    }, (err, res) => {
        if (err) {
            console.log('Error:', err)
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            console.log(res.body);
        }
    })
}



// Instagram Followers
function instagram_follow() {
    console.log('----------')
    const user = process.env.instagram_username;
    instaObj.specificField(user, 'followers').then(count => {
        var follower_count = Number(count.data);
        if (follower_count > instagram_followers[instagram_followers.length-1]) {
            console.log('New Instagram Followers!', follower_count);
            request_instagram();
        } else {
            console.log('No New Instagram Followers!', follower_count);
        }
        console.log('Updated Insagram Array');

    });


};
function request_instagram() {
    var url = process.env.instagram_url
    request.get({
        url: url,
        json: true,
        headers: {
            'User-Agent': 'request'
        }
    }, (err, res) => {
        if (err) {
            console.log('Error:', err)
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            console.log(res.body);
        }
    })
}