const TikTok = require('tiktok-status-api')
const request = require('request');
require('dotenv').config();
const tiktok = new TikTok();

var tiktok_followers = []

console.log('Running')

function tiktok_follow() {
    const current = tiktok.getFollowers(process.env.tiktok_username)
    if (current > tiktok_followers[tiktok_followers.length - 1]) {
        console.log('New Follower!')
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
    } else {
        console.log('No New Follower!')
    }
    tiktok_followers.push(current)
    console.log('Updated Array', tiktok_followers)
}

setInterval(tiktok_follow, 30 * 1000);