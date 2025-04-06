import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import productRoutes from "./routes/productRoutes.js"
import { sql } from "./config/db.js"
import { aj } from "./lib/arcjet.js"

dotenv.config()


const app = express() 
const PORT = process.env.PORT || 5000


//
app.use(express.json())//for json data => req.body
app.use(cors()) //enables communication with frontend
app.use(helmet())// helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev")) // log the requests

//apply arcjet rate limit to all routes

app.use(async(req,res,next)=>{
    try {
        const decision = await aj.protect(req,{
            requested:1 //specifies that each request consumes 1 token
        })
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(429).json({error:"Too many requests"})
            }else if(decision.reason.isBot()){
                res.status(403).json({error:"Bot access denied"})
            }else {
                res.status(403).json({error:"Forbiden"})
            }
            return

        }
        //check for spoofed bots
        if(decision.results.some((result)=> result.reason.isBot() && result.reason.isSpoofed())){
            res.status(403).json({error:"Spoofed bot detected"})
            return
        }
        next()
        
    } catch (error) {
        console.log(error)
        next(error)
    }
})

app.use("/api/products",productRoutes)

app.get("/api/products",(req,res)=>{
    console.log(res.getHeaders())
    res.send("Hello")
})
async function initDB(){
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL, 
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `
    console.log("Database initialized successfully")
    } catch (error) {
        console.log(error)
    }
}
initDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is runnign on port ${PORT}`)
    })
})
