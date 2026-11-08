// imports
const connectToDB = require('./config/db.js')
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const morgan = require('morgan')
const cors = require('cors')

// Routes Import
const authRoutes = require('./routes/auth.routes')
const submarineRoutes = require('./routes/submarine.routes')
const missionRoutes = require('./routes/mission.routes')
const locationRoutes = require('./routes/location.routes.js')
const userRoutes = require('./routes/user.routes.js')
const equipmentRoutes = require('./routes/equipment.routes.js')
const discoveryRoutes = require('./routes/discoveryRoutes.js')
const speciesRoutes = require ('./routes/speciesRoutes.js')



// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
    })
);
app.use(express.json())
app.use(morgan('dev'))



// Routes
app.use('/auth',authRoutes)
app.use('/submarine', submarineRoutes)
app.use('/mission', missionRoutes)
app.use('/location', locationRoutes)
app.use('/user', userRoutes)
app.use('/equipment', equipmentRoutes)
app.use('/discovery',discoveryRoutes)
app.use('/species',speciesRoutes)



// connect to database and listen on Port 3000
async function startServer() {
    const PORT = process.env.PORT || 3000;
    await connectToDB();

    app.listen(PORT, () => {
        console.log(`App is running on port ${PORT}`);
    });
}
startServer();