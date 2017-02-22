module.exports = function(io){
const userList = {};
const playing = {};
io.sockets.on('connection', (socket) => {
    socket.on('sendchat', (data) => {
        io.sockets.emit('updatechat', socket.username, data);
    });

    socket.on('joinuser', (username) => {
        if (!playing[socket.username]) {
            playing[socket.username] = username;
            playing[username] = socket.username;
            [socket.username, username].forEach(function (user) {
                io.sockets.connected[userList[user]].emit('matchstart', {status: 1});
            })
        }
        else {
            io.sockets.connected[userList[socket.username]].emit('matchstart', {
                status: 0,
                "reason": "Already connected to other user."
            });
        }
    });

    socket.on('adduser', (username) => {
        socket.username = username;

        userList[username] = socket.id;

        socket.emit(
            'servernotification', {
                connected: true,
                toSelf: true,
                username: username
            });

        socket.broadcast.emit('servernotification', {connected: true, username: username});

        io.sockets.emit('updateusers', userList);
    });

    socket.on('disconnect', () => {
        delete userList[socket.username];

        io.sockets.emit('updateusers', userList);

        socket.broadcast.emit('servernotification', {username: socket.username});
    });
});
}