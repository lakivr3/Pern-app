import arcjet, {tokenBucket,shield,detectBot} from "@arcjet/node";
import "dotenv/config"

//init arcjet
console.log(process.env.ARCJET_KEY)

export const aj = arcjet({
    key:process.env.ARCJET_KEY,
    characteristics:["ip.src"],
    rules:[
        // Shield protects your app from common attacks e.g. SQL injection, XSS, CSRF attacks
        shield({mode:"LIVE"}),
        detectBot({
            mode:"LIVE",
            //block all bots except serach engines
            allow:[
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
                // Uncomment to allow these other common bot categories
                // See the full list at https://arcjet.com/bot-list
                //"CATEGORY:MONITOR", // Uptime monitoring services
                //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
            ]
        }),
        //rate limiting
        tokenBucket({
            mode:"LIVE",
            refillRate:5, 
            interval:10,
            capacity:10
        })
        
    ]
})

