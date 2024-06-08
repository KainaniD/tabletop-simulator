Hello! Welcome to our tabletop simulator! This is our 35L final project. 

Made by 
Bill Su - billbsu <48847251+billbsu@users.noreply.github.com>
Patrick Zhou - patrickxc.zhou@gmail.com
Keelan Hu - keelanhu01@g.ucla.edu
Kainani Dowell - kainanime2@gmail.com
Siddaarth Prasanna - siddaarth04@gmail.com

Instructions to switch from dev to production:

========== SERVER ==========

    > FOR DEV

        CHANGE FILE
            .env
            MODE = "dev"

        ADD FILE
            .env.dev
            ORIGIN = "http://localhost:3000"
            ALSO ADD KEYS

    > FOR PRODUCTION

        CHANGE FILE
            .env
            MODE = "production"

        


========== CLIENT ==========

    > FOR DEV

        CHANGE FILE
            .env
            REACT_APP_CLIENT_URL = http://localhost:3000
            REACT_APP_SERVER_URL = http://localhost:4000

        CHANGE FILE 
            package.json
            "options": {
                "proxy": ["http://localhost:4000", "https://tabletop-simulator-server.onrender.com"],
                "allowedHosts": [
                "localhost",
                ".localhost",
                "tabletop-simulator-server.onrender.com",
                "tabletop-simulator-server.onrender"
                ]
            }

    > FOR PRODUCTION

        CHANGE FILE
            .env
            REACT_APP_CLIENT_URL = https://tabletop-simulator.netlify.app
            REACT_APP_SERVER_URL = https://tabletop-simulator-server.onrender.com

        CHANGE FILE 
            package.json
            "options": {
                "proxy": ["https://tabletop-simulator-server.onrender.com"],
                "allowedHosts": [
                "tabletop-simulator-server.onrender.com",
                "tabletop-simulator-server.onrender"
                ]
            }
