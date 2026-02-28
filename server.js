const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5500",   // Update Later
        methods: ["GET","POST"]
    }
});

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const updateLogsRoutes = require("./apiRoutes/updateLogs.js");
const imagesRoutes = require("./apiRoutes/imagesRoutes.js");

app.use('/data/updateLogData', updateLogsRoutes);
app.use('/assets/images', imagesRoutes);

app.get('/', function(req, res) { 
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

io.on('connection', function(socket) {
    const now = new Date();
    console.log(`${now.toString()} A User Connected`);
   
    socket.on('disconnect', function ()
    {
        const now = new Date();
        console.log(`${now.toString()} A User Disconnected`);
    });

    socket.on('join', (username) => {
        console.log(username);

        socket.broadcast.emit('user joined', username);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));