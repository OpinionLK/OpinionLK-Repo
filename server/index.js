import express from 'express'
const app = express()
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import swaggerJSDoc from 'swagger-jsdoc';
import swagger from 'swagger-ui-express';

dotenv.config()

app.get('/', function (req, res) {
    res.json({
        message: 'Welcome to the OpinionLK API'
    })
})
app.use('/auth', authRoutes)

// Swagger

const options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "OpinionLK API Documentation",
            version: "0.0.1",
            description: "This is a simple CRUD API application made with Express and documented with Swagger",
        },
        servers: [
            {
                url: "http://localhost:3002",
            },
        ],
    },
    apis: ["./routes/*.js"],
}

const spacs = swaggerJSDoc(options)
app.use(
    "/api-docs",
    swagger.serve,
    swagger.setup(spacs)
)

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`))
        // ADD DATA ONE TIME
        // User.insertMany(users)
        // Post.insertMany(posts)
    })
    .catch((error) => console.log(error.message));