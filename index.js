// Requried Libs
const TikTok = require('tiktok-status-api');
const instaObj = require('instagram-basic-data-scraper-with-username');
const request = require('request');
const getTwitterFollowers = require('get-twitter-followers');
require('dotenv').config();



// Setup for Apis
// Tiktok
const tiktok = new TikTok();
// Twitter https://developer.twitter.com/en/portal/dashboard
const tokens = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};


// Arrays for storing follower count
var tiktok_followers = []
var instagram_followers = []
var twitter_followers = []




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
        setInterval(tiktok_follow, 30 * 1000);
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
        setInterval(instagram_follow, 30 * 1000);
    }
} else {
    console.log('No Instagram');
}
if (process.env.twitter == 'YES') {
    if (process.env.tw_username == undefined) {
        console.log('Missing Twitter Username')
        return;
    } else if (process.env.tw_url == undefined) {
        console.log('Missing Twitter Url')
        return;
    } else {
        console.log('Running Twitter!')
        // Restarting follower counts every 60 seconds
        // Twitter
        // We check this every minute because of the twitter rate limit https://developer.twitter.com/en/docs/twitter-api/v1/rate-limits
        setInterval(twitter_follow, 60 * 1000);
    }
} else {
    console.log('No Twitter');
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
        if (follower_count > instagram_followers[instagram_followers.length - 1]) {
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

// Twtter
function twitter_follow() {
    console.log('----------');
    getTwitterFollowers(tokens, process.env.tw_username).then(followers => {
        if (followers > twitter_followers[twitter_followers.length - 1]) {
            console.log('New Twitter Followers!', followers.length);
            request_twitter();
        } else {
            console.log('No New Twitter Followers!', followers.length);
        }
        twitter_followers.push(followers.length)
        console.log('Updated Twitter Array', twitter_followers);
    }).catch(err => console.log(err));
}

function request_twitter() {
    var url = process.env.tw_url
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