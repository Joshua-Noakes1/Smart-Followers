// Requried Libs
const TikTok = require('tiktok-status-api')
const request = require('request');
require('dotenv').config();

// Setup for Apis
const tiktok = new TikTok();

// Arrays for storing follower count
var tiktok_followers = []

console.log('Running')

// Titkok Followers
function tiktok_follow() {
    const current = tiktok.getFollowers(process.env.tiktok_username);
    if (current > tiktok_followers[tiktok_followers.length - 1]) {
        console.log('New Follower!');
        request_url();
    } else {
        console.log('No New Follower!');
    }
    tiktok_followers.push(current);
    console.log('Updated Array', tiktok_followers);
};


// Request Url Function
function request_url() {
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

// Restarting follower counts every 30 seconds
// Tiktok
setInterval(tiktok_follow, 30 * 1000);