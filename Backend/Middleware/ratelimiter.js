const ratelimit = require('express-rate-limit');


const rateLimit = ratelimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: {
        message: 'Too many login attempts, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,

});

module.exports = rateLimit