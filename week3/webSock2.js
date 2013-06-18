// "ws" library
var WebSocket = require('ws');
var http = require('http')

// HTTP server is required to "Upgrade" the connection to WebSocket
var httpserver = http.createServer()
httpserver.listen(9999)

var wsserver = new WebSocket.Server({server:httpserver});

var clients = []
var last_id=1

function broadcast(data)
{
    // send only text
    data = JSON.stringify(data)

    for(var i=0; i < clients.length; i++) {
        clients[i].socket.send(data)
    }
}

// 'connection' event is fired every time somebody connects via WebSocket
wsserver.on('connection', function(socket){

    // create object that will represent this client (could be `new Client(…)`)
    var me = {
        id: last_id++, // assign some unique identifier so other clients know who is who
        socket: socket, // remeber socket used by this client
        name: 'Anonymous' // whatever other data
    }

    console.log("connected client", me.id)

    // keep array of all clients
    clients.push(me)

    // send previous state of all clients to the new client
    for(var i=0; i < clients.length-1; i++) {
        var c = clients[i]
        if (c.name) {
            socket.send(JSON.stringify({
                id:c.id,
                name:c.name,
            }))
            socket.send(JSON.stringify({
                id:c.id,
                x:c.x,
                y:c.y
            }))
        }
    }

    // 'close' event is called when this connection terminates
    socket.on('close', function(){
        // remove disconnected client from the clients array
        clients.splice(clients.indexOf(me), 1)

        console.log("lost client", me.id)
        broadcast({id:me.id, bye:true})
    })

    socket.on('message', function(data_json){
        data = JSON.parse(data_json)

        if (data.name) {
            console.log("client", me.id, " is ", data.name)
            me.name = data.name;
            broadcast({id:me.id, name:me.name})

        } else if (data.x) {
            // remember last position for new clients
            me.x = data.x
            me.y = data.y

            // send this data to everybody else now
            broadcast({
                x:data.x,
                y:data.y,
                id:me.id,
            })
        }
    })
});
