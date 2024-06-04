Hello! Welcome to our tabletop simulator! This is our 35L final project. 

Made by Bill Su, Patrick Zhou, Keelan Hu, Kainani Dowell, Siddaarth Prasanna

Instructions to switch from dev to production:

========== SERVER ==========

    FOR DEV
        change .env variables
            ORIGIN = "http://localhost:3000"

        change index.js

        require('dotenv').config({path:".env.dev"})

        app.use(session({
            secret: 'this is a really good secret',
            resave: false,
            saveUninitialized: true,
            proxy: true,
            cookie: {
                secure: false,
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 24
            }
        }))



    FOR PRODUCTION
        change .env variables
        ORIGIN = "https://tabletop-simulator.netlify.app"


        change index.js
        require('dotenv').config()

        app.use(session({
            secret: 'this is a really good secret',
            resave: false,
            saveUninitialized: true,
            proxy: true,
            cookie: {
                secure: true,
                sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24
            }
        }))

        


========== CLIENT ==========

    FOR DEV
        change .env variables
        REACT_APP_CLIENT_URL = http://localhost:3000
        REACT_APP_SERVER_URL = http://localhost:4000

        change package.json
        "options": {
            "proxy": ["http://localhost:4000", "https://tabletop-simulator-server.onrender.com"],
            "allowedHosts": [
            "localhost",
            ".localhost",
            "tabletop-simulator-server.onrender.com",
            "tabletop-simulator-server.onrender"
            ]
        }

    FOR PRODUCTION
        change .env variables
        REACT_APP_CLIENT_URL = https://tabletop-simulator.netlify.app
        REACT_APP_SERVER_URL = https://tabletop-simulator-server.onrender.com

        change package.json
        "options": {
            "proxy": ["https://tabletop-simulator-server.onrender.com"],
            "allowedHosts": [
            "tabletop-simulator-server.onrender.com",
            "tabletop-simulator-server.onrender"
            ]
        }