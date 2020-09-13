const instaObj = require('instagram-basic-data-scraper-with-username');
const request = require('request');
require('dotenv').config();

const user = process.env.instagram_user;

var instagram_followers = []

console.log('Running!')

function instagram_check() {
    instaObj.specificField(user, 'followers').then(count => {
        var follower_count = Number(count.data);
        if (follower_count > instagram_followers[instagram_followers - 2]) {
            console.log('New Followers!');
            request_url();
        } else {
            console.log('No New Followers!');
        }
        instagram_followers.push(follower_count);
        console.log(follower_count);
        console.log('Updated Array', instagram_followers);
    });
};

function request_url() {
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

setInterval(instagram_check, 5 * 1000);